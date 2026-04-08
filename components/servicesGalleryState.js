"use client";

import { proxy } from "valtio";

const galleryState = proxy({
  progress: 0,
  trackX: 0,
});

export function setServicesGalleryProgress(progress) {
  galleryState.progress = progress;
}

export function resetServicesGalleryState() {
  galleryState.progress = 0;
  galleryState.trackX = 0;
}

export { galleryState };
