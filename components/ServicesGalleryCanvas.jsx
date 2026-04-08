"use client";

import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { easing } from "maath";
import { galleryState } from "./servicesGalleryState";

const GALLERY_SETTINGS = {
  focusRadius: 1.2,
  focusWidthBoost: 5,
  focusHeightBoost: 2.5,
  baseWidth: 1.2,
  baseHeight: 5,
  gap: 0.2,
  cameraZoom: 75,
  backgroundColor: "#000000",
};

function Strip({ item, index, total }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;

    const scrollIndex = galleryState.progress * (total - 1);

    // Accumulate total X path based on dynamic widths to guarantee NO overlap
    let myX = 0;
    for (let i = 0; i < index; i++) {
      const d = Math.abs(i - scrollIndex);
      const f = Math.max(0, 1 - d / GALLERY_SETTINGS.focusRadius);
      const w = GALLERY_SETTINGS.baseWidth + f * GALLERY_SETTINGS.focusWidthBoost;
      myX += w + GALLERY_SETTINGS.gap;
    }

    const myDistance = Math.abs(index - scrollIndex);
    const myFocus = Math.max(0, 1 - myDistance / GALLERY_SETTINGS.focusRadius);
    const myWidth = GALLERY_SETTINGS.baseWidth + myFocus * GALLERY_SETTINGS.focusWidthBoost;
    const myHeight = GALLERY_SETTINGS.baseHeight + myFocus * GALLERY_SETTINGS.focusHeightBoost;
    myX += myWidth / 2;

    // Track center exactly follows the focused active item
    let centerItemX = 0;
    const baseIndex = Math.floor(scrollIndex);
    for (let i = 0; i < baseIndex; i++) {
      const d = Math.abs(i - scrollIndex);
      const f = Math.max(0, 1 - d / GALLERY_SETTINGS.focusRadius);
      const w = GALLERY_SETTINGS.baseWidth + f * GALLERY_SETTINGS.focusWidthBoost;
      centerItemX += w + GALLERY_SETTINGS.gap;
    }

    const dBase = Math.abs(baseIndex - scrollIndex);
    const fBase = Math.max(0, 1 - dBase / GALLERY_SETTINGS.focusRadius);
    const wBase = GALLERY_SETTINGS.baseWidth + fBase * GALLERY_SETTINGS.focusWidthBoost;
    let trackCenter = centerItemX + wBase / 2;

    if (baseIndex < total - 1) {
      const dNext = Math.abs(baseIndex + 1 - scrollIndex);
      const fNext = Math.max(0, 1 - dNext / GALLERY_SETTINGS.focusRadius);
      const wNext = GALLERY_SETTINGS.baseWidth + fNext * GALLERY_SETTINGS.focusWidthBoost;
      const nextX = centerItemX + wBase + GALLERY_SETTINGS.gap + wNext / 2;
      trackCenter = THREE.MathUtils.lerp(trackCenter, nextX, scrollIndex - baseIndex);
    }

    const targetX = myX - trackCenter;

    // Same base height across all images, dynamic width and focused height
    easing.damp3(ref.current.scale, [myWidth, myHeight, 1], 0.15, delta);
    easing.damp3(ref.current.position, [targetX, 0, 0], 0.15, delta);

    // Drei specific fix for image material stretch scaling
    if (ref.current.material.scale) {
      if (typeof ref.current.material.scale.set === "function") {
        ref.current.material.scale.set(ref.current.scale.x, ref.current.scale.y);
      } else {
        ref.current.material.scale[0] = ref.current.scale.x;
        ref.current.material.scale[1] = ref.current.scale.y;
      }
    }

    easing.damp(
      ref.current.material,
      "grayscale",
      // Hovering reveals color cleanly
      hovered ? 0 : Math.max(0.12, item.grayscale - myFocus * 0.8),
      0.15,
      delta
    );

    easing.dampC(
      ref.current.material.color,
      hovered ? "#ffffff" : item.color,
      hovered ? 0.25 : 0.15,
      delta
    );
  });

  return (
    <Image
      ref={ref}
      url={item.image}
      alt=""
      position={[index * 2, 0, 0]}
      scale={[GALLERY_SETTINGS.baseWidth, GALLERY_SETTINGS.baseHeight, 1]}
      transparent
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

function Track({ items }) {
  const processedItems = useMemo(() => {
    return items.map((image, index) => ({
      key: `${image}-${index}`,
      image,
      grayscale: index % 3 === 1 ? 0.95 : 0.62,
      color: index % 4 === 0 ? new THREE.Color("#d6d6d6") : new THREE.Color("#9a9a9a"),
    }));
  }, [items]);

  return (
    <group>
      {processedItems.map((item, index) => (
        <Strip key={item.key} item={item} index={index} total={processedItems.length} />
      ))}
    </group>
  );
}

export default function ServicesGalleryCanvas({ items }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      orthographic
      camera={{ position: [0, 0, 10], zoom: GALLERY_SETTINGS.cameraZoom }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#000000" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 1);
      }}
    >
      <Track items={items} />
    </Canvas>
  );
}
