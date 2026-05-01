import { render } from "solid-js/web";
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { projects as serviceProjects } from "../components/servicesData.js";
import { workCategories } from "../components/workData.js";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const selectedWork = [
  {
    title: "Industrial Manufacturing Designs",
    category: "Mechanical Drawings",
    image: "/quantum.jpg",
    color: "#000000ff",
    slug: "industrial-manufacturing-designs",
  },
  {
    title: "Blender Studio",
    category: "Rendering and Animation",
    image: "/aether.jpg",
    color: "#ffffffff",
    slug: "blender-studio",
  },
  {
    title: "Prototype Designs",
    category: "3D printing + Assembly",
    image: "/nexus.jpg",
    color: "#491d1dff",
    slug: "prototype-designs",
  },
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Industry Awards" },
  { value: "24/7", label: "Innovation Mindset" },
];

const testimonials = [
  {
    quote:
      "Working with Industrial Ideation transformed our digital presence completely. They didn't just build a website; they built a brand experience.",
    author: "Elena M.",
    role: "CMO, Quantum Fintech",
  },
  {
    quote:
      "The level of polish and attention to detail they bring to the table is unmatched. Our conversion rates doubled within the first month of launch.",
    author: "David R.",
    role: "Founder, Aether Lifecycle",
  },
  {
    quote:
      "Their technical architecture is as beautiful as their design. The seamless 3D experiences they built for us perform flawlessly on all devices.",
    author: "Sarah K.",
    role: "Product Director, Nexus",
  },
  {
    quote:
      "A rare breed of agency that truly understands both the creative and the highly technical. They delivered beyond our highest expectations.",
    author: "Michael T.",
    role: "CEO, Vertex Systems",
  },
];

const contactEmail = "hello@industrialideation.com";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ name, size = 20, class: className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.8",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: className,
  };

  return (
    <svg {...common}>
      <Show when={name === "menu"}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </Show>
      <Show when={name === "x"}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </Show>
      <Show when={name === "arrow-left"}>
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </Show>
      <Show when={name === "arrow-right"}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </Show>
      <Show when={name === "arrow-up"}>
        <path d="m18 15-6-6-6 6" />
      </Show>
      <Show when={name === "arrow-up-right"}>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </Show>
      <Show when={name === "move-down"}>
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </Show>
    </svg>
  );
}

function goTo(url) {
  const next = new URL(url, window.location.origin);
  if (next.origin !== window.location.origin) {
    window.location.href = url;
    return;
  }

  window.history.pushState({}, "", `${next.pathname}${next.search}${next.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));

  if (next.hash) {
    requestAnimationFrame(() => {
      document.querySelector(next.hash)?.scrollIntoView({ behavior: "smooth" });
    });
  } else {
    window.scrollTo(0, 0);
  }
}

function replaceUrl(url) {
  const next = new URL(url, window.location.origin);
  if (next.origin !== window.location.origin) {
    window.location.replace(url);
    return;
  }

  window.history.replaceState({}, "", `${next.pathname}${next.search}${next.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function buildModalUrl(projectId) {
  const url = new URL(window.location.href);
  if (projectId) {
    url.searchParams.set("project", projectId);
  } else {
    url.searchParams.delete("project");
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

function currentProjectFromSearch(items, search = window.location.search) {
  const projectId = new URLSearchParams(search).get("project");
  if (!projectId) return null;
  return items.find((item) => item.id === projectId) ?? null;
}

function backOrFallback(fallbackUrl) {
  const hasSameOriginReferrer =
    !!document.referrer && new URL(document.referrer).origin === window.location.origin;

  if (window.history.length > 1 && hasSameOriginReferrer) {
    window.history.back();
    return;
  }

  goTo(fallbackUrl);
}

function App() {
  const [location, setLocation] = createSignal({
    path: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search,
  });

  const categorySlug = createMemo(() => {
    const match = location().path.match(/^\/work\/([^/]+)/);
    return match?.[1] ? decodeURIComponent(match[1]) : null;
  });
  const serviceSlug = createMemo(() => {
    const match = location().path.match(/^\/services\/([^/]+)/);
    return match?.[1] ? decodeURIComponent(match[1]) : null;
  });

  onMount(() => {
    const updateRoute = () =>
      setLocation({
        path: window.location.pathname,
        hash: window.location.hash,
        search: window.location.search,
      });
    window.addEventListener("popstate", updateRoute);
    window.addEventListener("hashchange", updateRoute);
    onCleanup(() => {
      window.removeEventListener("popstate", updateRoute);
      window.removeEventListener("hashchange", updateRoute);
    });
  });

  return (
    <Show
      when={serviceSlug()}
      fallback={
        <Show
          when={categorySlug()}
          fallback={
            <SmoothScroll>
              <Home location={location} />
            </SmoothScroll>
          }
        >
          {(slug) => (
            <SmoothScroll>
              <WorkCategoryPage slug={slug()} location={location} />
            </SmoothScroll>
          )}
        </Show>
      }
    >
      {(slug) => (
        <SmoothScroll>
          <ServiceProjectPage slug={slug()} />
        </SmoothScroll>
      )}
    </Show>
  );
}

function SmoothScroll(props) {
  let lenis;
  let frame = 0;

  onMount(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    if (window.location.hash) {
      setTimeout(() => {
        document
          .querySelector(window.location.hash)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }

    onCleanup(() => {
      document.body.style.overflow = "";
      document.body.style.cursor = "auto";
      cancelAnimationFrame(frame);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  });

  return props.children;
}

function Home(props) {
  const [loading, setLoading] = createSignal(true);

  return (
    <>
      <Show when={loading()}>
        <Preloader onComplete={() => setLoading(false)} />
      </Show>
      <main
        class={cx(
          "min-h-screen bg-[var(--background)] transition-opacity duration-1000",
          loading() ? "h-screen overflow-hidden opacity-0" : "opacity-100",
        )}
      >
        <Navbar />
        <Hero />
        <Services location={props.location} />
        <Work />
        <About />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}

function Preloader(props) {
  const [progress, setProgress] = createSignal(0);
  let containerRef;
  let percentRef;
  let barRef;

  onMount(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        gsap
          .timeline({ onComplete: props.onComplete })
          .to(percentRef, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          })
          .to(
            barRef,
            {
              scaleX: 0,
              transformOrigin: "right",
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.3",
          )
          .to(containerRef, {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
          });
      }

      setProgress(currentProgress);
    }, 90);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div
      ref={containerRef}
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      <div class="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div class="mb-8 overflow-hidden">
          <div
            ref={percentRef}
            class="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
          >
            Industrial Ideation - {progress()}%
          </div>
        </div>
        <div class="relative h-[1px] w-64 overflow-hidden bg-white/20">
          <div
            ref={barRef}
            class="absolute left-0 top-0 h-full origin-left bg-[var(--accent)]"
            style={{
              width: `${progress()}%`,
              transition: "width 0.2s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = createSignal(false);
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
  ];

  onMount(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    gsap.fromTo(
      ".site-nav",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  const handleNav = (event, href) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    goTo(href);
  };

  return (
    <>
      <nav class="site-nav fixed inset-x-0 top-0 z-50 flex w-full justify-center px-[var(--section-pad-x)] pt-6 opacity-0 md:pt-8">
        <div
          class={cx(
            "flex w-full max-w-[var(--page-max-width)] items-center justify-between rounded-full border transition-all duration-500 ease-out",
            scrolled()
              ? "border-white/10 bg-black/40 px-6 py-3 shadow-2xl backdrop-blur-md"
              : "border-transparent bg-transparent px-4 py-4 md:px-6 md:py-4",
          )}
        >
          <a
            href="/"
            onClick={(event) => handleNav(event, "/")}
            class="relative z-50 flex-shrink-0"
          >
            <h1 class="text-xl font-medium tracking-tight text-white transition-all duration-500 md:text-2xl">
              Ind.<span class="text-gray-400">Ideation</span>
            </h1>
          </a>

          <div class="hidden items-center gap-8 md:flex lg:gap-12">
            <For each={navLinks}>
              {(link) => (
                <a
                  href={link.href}
                  onClick={(event) => handleNav(event, link.href)}
                  class="text-sm font-medium text-black transition-colors duration-300 hover:text-white"
                >
                  {link.name}
                </a>
              )}
            </For>
          </div>

          <div class="hidden md:block">
            <a
              href={`mailto:${contactEmail}`}
              class={cx(
                "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300",
                scrolled()
                  ? "bg-white text-black hover:bg-black"
                  : "border border-white/20 bg-black text-white backdrop-blur-sm hover:bg-white hover:text-black",
              )}
            >
              Start Project
            </a>
          </div>

          <div class="relative z-50 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
              class="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen() ? "x" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </nav>

      <Show when={mobileMenuOpen()}>
        <div class="fixed inset-0 z-40 bg-black/60 px-[var(--section-pad-x)] pt-32 backdrop-blur-2xl md:hidden">
          <div class="flex flex-col items-center gap-8 text-2xl font-light">
            <For each={navLinks}>
              {(link, index) => (
                <a
                  href={link.href}
                  onClick={(event) => handleNav(event, link.href)}
                  class="mobile-link block text-white/70 transition-colors hover:text-white"
                  style={{ "animation-delay": `${0.1 + index() * 0.1}s` }}
                >
                  {link.name}
                </a>
              )}
            </For>
            <a
              href={`mailto:${contactEmail}`}
              class="mobile-link mt-6 inline-block rounded-full bg-white px-8 py-3 text-lg font-medium text-black transition-transform active:scale-95"
              style={{ "animation-delay": "0.5s" }}
            >
              Start Project
            </a>
          </div>
        </div>
      </Show>
    </>
  );
}

function TextReveal(props) {
  let containerRef;
  const text = createMemo(() =>
    typeof props.children === "string" ? props.children : "",
  );

  onMount(() => {
    const target = text()
      ? containerRef.querySelectorAll(".reveal-char")
      : containerRef;

    gsap.fromTo(
      target,
      text() ? { y: 100, opacity: 0 } : { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: text() ? 0.02 : 0,
        duration: text() ? 0.8 : 1,
        ease: text() ? "back.out(1.7)" : "power3.out",
        delay: props.delay ?? 0,
        scrollTrigger: {
          trigger: containerRef,
          start: "top 85%",
        },
      },
    );
  });

  return (
    <div
      ref={containerRef}
      class={cx(text() && "overflow-hidden", props.class ?? "")}
    >
      <Show when={text()} fallback={props.children}>
        <For each={text().split("")}>
          {(char) => (
            <span
              class="reveal-char inline-block"
              style={{ "white-space": char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          )}
        </For>
      </Show>
    </div>
  );
}

function Hero() {
  let containerRef;
  let textRef;

  onMount(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    timeline.to(textRef, {
      y: 150,
      opacity: 0,
      ease: "none",
    });

    onCleanup(() => timeline.kill());
  });

  return (
    <section
      ref={containerRef}
      class="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-32 md:py-40"
    >
      <HeroScene />
      <div class="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />
      <div class="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[var(--background)]/50 to-[var(--background)]" />

      <div
        ref={textRef}
        class="section-shell relative z-10 flex flex-col items-center justify-center pt-16 md:pt-20"
      >
        <div class="section-inner flex flex-col items-center text-center">
          <TextReveal
            delay={0.2}
            class="max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
          >
            We Build Ideas That  Move Industries.
          </TextReveal>

          <TextReveal
            delay={0.8}
            class="mt-8 max-w-2xl text-lg text-gray-400 md:mt-10 md:text-xl"
          >
            A design and development agency accelerating digital
            transformation through innovative strategy and cinematic web
            experiences.
          </TextReveal>

          <div class="mt-12 flex animate-[fadeIn_1s_ease-out_1.5s_forwards] flex-col items-center gap-5 opacity-0 sm:flex-row md:mt-16 md:gap-6">
            <MagneticButton
              onClick={() => goTo("/#work")}
              class="w-full rounded-full bg-white px-8 py-4 font-medium text-black hover:bg-gray-200 sm:w-auto md:px-10 md:py-5"
            >
              View Our Work
            </MagneticButton>
            <MagneticButton
              onClick={() => {
                window.location.href = `mailto:${contactEmail}`;
              }}
              class="glass w-full rounded-full px-8 py-4 font-medium text-white hover:bg-[var(--surface-border)] sm:w-auto md:px-10 md:py-5"
            >
              Start a project
            </MagneticButton>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-[fadeIn_1s_ease-out_2s_forwards] flex-col items-center gap-3 opacity-0 md:bottom-12">
       
        <div class="glass flex h-12 w-8 justify-center rounded-full border border-[var(--surface-border)] p-2">
         
        </div>
      </div>
    </section>
  );
}

function HeroScene() {
  let host;

  onMount(() => {
    let disposed = false;
    let cleanupScene = () => {};

    import("three").then((THREE) => {
      if (disposed || !host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      host.clientWidth / host.clientHeight,
      0.1,
      80,
    );
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.MeshStandardMaterial({
        color: "#e0c591",
        wireframe: true,
        emissive: "#c9a96e",
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8,
      }),
    );
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        roughness: 0.5,
        metalness: 0.8,
      }),
    );

    group.add(wire, core);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(10, 10, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight("#c9a96e", 0.2);
    rim.position.set(-10, -10, -5);
    scene.add(rim);

    let hovered = false;
    let frame = 0;
    const clock = new THREE.Clock();

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hovered = Math.hypot(x, y) < 0.24;
    };
    const onPointerLeave = () => {
      hovered = false;
    };

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const animate = () => {
      const delta = clock.getDelta();
      wire.rotation.x -= delta * 0.15;
      wire.rotation.y += delta * 0.2;
      group.position.y = Math.sin(clock.elapsedTime * 2) * 0.1;
      group.rotation.z = Math.sin(clock.elapsedTime) * 0.08;
      group.scale.lerp(new THREE.Vector3(hovered ? 1.1 : 1, hovered ? 1.1 : 1, 1), 0.08);
      wire.material.color.lerp(new THREE.Color(hovered ? "#c9a96e" : "#e0c591"), 0.08);
      wire.material.emissiveIntensity +=
        ((hovered ? 0.5 : 0.2) - wire.material.emissiveIntensity) * 0.08;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    animate();

      cleanupScene = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", onPointerLeave);
        renderer.dispose();
        host.replaceChildren();
        wire.geometry.dispose();
        core.geometry.dispose();
        wire.material.dispose();
        core.material.dispose();
      };
    });

    onCleanup(() => {
      disposed = true;
      cleanupScene();
    });
  });

  return (
    <div
      ref={host}
      class="pointer-events-auto absolute inset-0 z-0 h-full w-full opacity-60"
    />
  );
}

function MagneticButton(props) {
  let buttonRef;
  const [position, setPosition] = createSignal({ x: 0, y: 0 });

  createEffect(() => {
    const pos = position();
    if (buttonRef) {
      gsap.to(buttonRef, {
        x: pos.x,
        y: pos.y,
        duration: 0.45,
        ease: "elastic.out(1, 0.45)",
      });
    }
  });

  const handleMouse = (event) => {
    const { clientX, clientY } = event;
    const { height, width, left, top } = buttonRef.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onClick={props.onClick}
      class={cx(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors",
        props.class,
      )}
    >
      {props.children}
    </button>
  );
}

function Services(props) {
  const [progress, setProgress] = createSignal(0);
  let sectionRef;
  let trigger;

  onMount(() => {
    trigger = ScrollTrigger.create({
      trigger: sectionRef,
      start: "top top",
      end: `+=${serviceProjects.length * 320}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => setProgress(self.progress),
      onLeaveBack: () => setProgress(0),
      onLeave: () => setProgress(1),
    });

    onCleanup(() => {
      trigger?.kill();
      trigger = null;
    });
  });

  createEffect(() => {
    props.location();
    document.body.style.cursor = "auto";
    if (trigger) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  });

  const openProject = (project) => {
    document.body.style.cursor = "auto";
    goTo(`/services/${encodeURIComponent(project.id)}`);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      class="relative mt-[var(--section-gap)] h-[100svh] w-full overflow-hidden bg-[#000000]"
    >
      <ServicesGallery
        items={serviceProjects}
        progress={progress}
        onSelect={openProject}
      />
    </section>
  );
}

function ServicesGallery(props) {
  const focusRadius = 1.2;
  const focusWidthBoost = 16;
  const baseWidth = 6;
  const gap = 1;

  const strips = createMemo(() => {
    const total = props.items.length;
    const scrollIndex = props.progress() * (total - 1);
    const widths = props.items.map((_, index) => {
      const distance = Math.abs(index - scrollIndex);
      const focus = Math.max(0, 1 - distance / focusRadius);
      return baseWidth + focus * focusWidthBoost;
    });

    let center = 0;
    const baseIndex = Math.floor(scrollIndex);
    for (let i = 0; i < baseIndex; i += 1) {
      center += widths[i] + gap;
    }
    center += widths[baseIndex] / 2;

    if (baseIndex < total - 1) {
      const nextCenter = center + widths[baseIndex] / 2 + gap + widths[baseIndex + 1] / 2;
      center = gsap.utils.interpolate(center, nextCenter, scrollIndex - baseIndex);
    }

    let cursor = 0;
    return props.items.map((item, index) => {
      const width = widths[index];
      const distance = Math.abs(index - scrollIndex);
      const focus = Math.max(0, 1 - distance / focusRadius);
      const x = cursor + width / 2 - center;
      cursor += width + gap;
      return { item, width, x, focus };
    });
  });

  return (
    <div class="relative h-full w-full overflow-hidden bg-black">
      <For each={strips()}>
        {({ item, width, x, focus }, index) => (
          <button
            class="service-strip absolute left-1/2 top-1/2 overflow-hidden bg-zinc-900"
            style={{
              width: `${width}vw`,
              height: `${62 + focus * 16}vh`,
              transform: `translate(calc(-50% + ${x}vw), -50%)`,
              filter: `grayscale(${Math.max(0.12, (index() % 3 === 1 ? 0.95 : 0.62) - focus * 0.8)})`,
            }}
            onClick={() => {
              document.body.style.cursor = "auto";
              props.onSelect(item);
            }}
            onMouseEnter={() => (document.body.style.cursor = "pointer")}
            onMouseLeave={() => (document.body.style.cursor = "auto")}
            aria-label={`View ${item.title}`}
          >
            <img
              src={item.coverImage}
              alt={item.title}
              loading={index() < 2 ? "eager" : "lazy"}
              class="h-full w-full object-cover"
            />
          </button>
        )}
      </For>
    </div>
  );
}

function Work() {
  let sectionRef;

  onMount(() => {
    const triggers = [];
    const images = gsap.utils.toArray(".project-image");
    images.forEach((img) => {
      const tween = gsap.fromTo(
        img,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    onCleanup(() => triggers.forEach((trigger) => trigger.kill()));
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      class="section-shell section-space-lg w-full bg-[var(--background)]"
    >
      <div class="section-inner">
        <div class="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div class="space-y-5">
            <TextReveal class="block text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              Selected Work
            </TextReveal>
            <TextReveal
              delay={0.2}
              class="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
            >
              Proof of Concept.
            </TextReveal>
          </div>
          <a
            href="#"
            class="group flex items-center gap-2 self-start border-b border-[var(--surface-border)] pb-1 text-base transition-colors hover:border-white md:self-auto md:text-lg"
          >
            View Archive
            <Icon
              name="arrow-up-right"
              size={20}
              class="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>

        <div class="flex flex-col gap-20 md:gap-28 xl:gap-32">
          <For each={selectedWork}>
            {(project, index) => (
              <a
                href={`/work/${project.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(`/work/${project.slug}`);
                }}
                class="group relative flex w-full flex-col items-start gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20"
              >
                <div
                  class={cx(
                    "glass relative aspect-[4/3] w-full overflow-hidden rounded-2xl transition-shadow duration-700 group-hover:shadow-[0_0_40px_rgba(201,169,110,0.1)] md:w-3/5",
                    index() % 2 !== 0 && "md:order-2",
                  )}
                >
                  <div
                    class="project-image absolute -top-[20%] inset-x-0 h-[140%] bg-cover bg-center"
                    style={{
                      "background-image": `url(${project.image})`,
                      "background-color": project.color,
                    }}
                  >
                    <div class="h-full w-full bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div class="absolute inset-0 flex scale-90 items-center justify-center opacity-0 transition-opacity duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <div class="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-black/50 font-medium text-white backdrop-blur-md">
                      Explore
                    </div>
                  </div>
                </div>

                <div
                  class={cx(
                    "w-full md:w-2/5",
                    index() % 2 !== 0 && "md:order-1 md:text-right",
                  )}
                >
                  <div class="mb-4 font-mono text-sm text-[var(--accent)]">
                    {String(index() + 1).padStart(2, "0")}
                  </div>
                  <h3 class="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl">
                    {project.title}
                  </h3>
                  <p class="text-lg text-gray-400 md:text-xl">
                    {project.category}
                  </p>
                </div>
              </a>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}

function About() {
  let statsRef;

  onMount(() => {
    gsap.fromTo(
      statsRef.querySelectorAll(".stat-item"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef,
          start: "top 80%",
        },
      },
    );
  });

  return (
    <section
      id="about"
      class="section-shell section-space-lg relative w-full overflow-hidden bg-[#050505]"
    >
      <div class="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[var(--accent)]/5 to-transparent" />

      <div class="section-inner relative z-10">
        <div class="flex flex-col gap-16 lg:flex-row lg:gap-24 xl:gap-28">
          <div class="w-full space-y-8 md:space-y-10 lg:w-1/2">
            <h2 class="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              Our Philosophy
            </h2>

            <div class="space-y-4 text-3xl font-medium leading-tight md:space-y-5 md:text-5xl">
              <TextReveal delay={0.1}>
                Design is not just what it looks like and feels like.
              </TextReveal>
              <TextReveal delay={0.3} class="text-[var(--accent)]">
                Design is how it works.
              </TextReveal>
            </div>

            <TextReveal
              delay={0.5}
              class="reading-width text-lg text-gray-400 md:text-xl"
            >
              We operate at the intersection of aesthetics and engineering. Our
              mission is to help ambitious brands navigate the digital landscape
              by creating platforms that are as robust in their architecture as
              they are beautiful in their execution.
            </TextReveal>
          </div>

          <div
            ref={statsRef}
            class="grid w-full grid-cols-1 content-center gap-8 pt-4 sm:grid-cols-2 lg:w-1/2 lg:gap-10 xl:gap-12"
          >
            <For each={stats}>
              {(stat) => (
                <div class="stat-item border-l border-[var(--surface-border)] py-5 pl-6 md:py-6 md:pl-8">
                  <div class="mb-4 text-4xl font-bold text-white md:text-5xl xl:text-6xl">
                    {stat.value}
                  </div>
                  <div class="text-sm uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  let scrollerRef;

  onMount(() => {
    gsap.fromTo(
      scrollerRef,
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 35,
        repeat: -1,
      },
    );
  });

  return (
    <section class="relative w-full overflow-hidden border-y border-[var(--surface-border)] bg-black py-32 md:py-40">
      <div class="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[120px]" />

      <div class="relative z-10 mx-auto mb-16 flex max-w-7xl flex-col items-center px-6 text-center md:mb-20">
        <h2 class="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
          Client Feedback
        </h2>
        <h3 class="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
          The{" "}
          <span class="bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent)] to-[var(--accent-dark)] bg-clip-text text-transparent">
            Gold Standard.
          </span>
        </h3>
      </div>

      <div class="flex overflow-hidden py-10">
        <div ref={scrollerRef} class="flex w-max gap-6 px-4 md:gap-8">
          <For each={[...testimonials, ...testimonials]}>
            {(item) => (
              <div class="group relative flex w-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[#050505] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_0_40px_rgba(201,169,110,0.15)] md:w-[400px] md:p-10">
                <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div class="absolute -top-4 right-6 text-8xl font-black leading-none text-[var(--accent)]/10 transition-colors duration-500 group-hover:text-[var(--accent)]/30">
                  &quot;
                </div>

                <div class="relative z-10 mb-10">
                  <div class="mb-5 flex gap-1 text-[var(--accent)]">
                    <For each={[0, 1, 2, 3, 4]}>
                      {() => (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      )}
                    </For>
                  </div>
                  <p class="text-base font-medium leading-relaxed text-gray-300 md:text-lg">
                    {item.quote}
                  </p>
                </div>

                <div class="relative z-10 flex items-center gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/50 bg-gradient-to-br from-[var(--accent-dark)] to-black text-lg font-black text-[var(--accent-light)] shadow-[0_0_15px_rgba(201,169,110,0.2)]">
                    {item.author[0]}
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-white transition-colors group-hover:text-[var(--accent-light)]">
                      {item.author}
                    </h4>
                    <p class="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer class="section-shell w-full border-t border-[var(--surface-border)] bg-[#050505] py-12 text-gray-400">
      <div class="section-inner">
        <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div class="flex flex-col items-center gap-2 md:items-start">
            <h2 class="text-2xl font-bold tracking-tighter text-white">
              Ind.<span class="text-[var(--accent)]">Ideation</span>
            </h2>
            <p class="text-sm">Industrial Product Agency</p>
          </div>

          <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
           
          </div>

          <button
            onClick={scrollToTop}
            class="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--surface-border)] transition-colors hover:bg-white hover:text-black"
            aria-label="Scroll to top"
          >
            <Icon name="arrow-up" size={20} />
          </button>
        </div>

        <div class="my-8 h-px w-full bg-[var(--surface-border)]" />

        <div class="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-600 md:flex-row md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Industrial Ideation. All rights
            reserved.
          </p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" class="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WorkCategoryPage(props) {
  const categoryData = createMemo(() => workCategories[props.slug]);
  const selectedProject = createMemo(() =>
    currentProjectFromSearch(categoryData()?.projects ?? [], props.location().search),
  );

  const openProject = (project) => {
    goTo(buildModalUrl(project.id));
  };

  const closeProject = () => {
    document.body.style.cursor = "auto";
    const fallbackUrl = `/work/${props.slug}`;
    if (new URL(window.location.href).searchParams.has("project")) {
      backOrFallback(fallbackUrl);
    } else {
      replaceUrl(fallbackUrl);
    }
  };

  return (
    <Show
      when={categoryData()}
      fallback={
        <div class="flex min-h-screen items-center justify-center bg-[var(--background)] text-white">
          <div class="text-center">
            <h1 class="mb-4 text-4xl font-bold">Category Not Found</h1>
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                goTo("/");
              }}
              class="text-[var(--accent)] hover:underline"
            >
              Return to Home
            </a>
          </div>
        </div>
      }
    >
      {(category) => (
        <main class="min-h-screen bg-[var(--background)] pb-20 pt-32">
          <Navbar />

          <div class="section-shell section-space-lg w-full">
            <div class="section-inner">
              <div class="mb-12 flex flex-col items-start gap-6 md:mb-20">
                <a
                  href="/#work"
                  onClick={(event) => {
                    event.preventDefault();
                    backOrFallback("/#work");
                  }}
                  class="group flex items-center gap-2 border-none bg-transparent text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Icon
                    name="arrow-left"
                    size={16}
                    class="transition-transform group-hover:-translate-x-1"
                  />
                  Back to Projects
                </a>
                <h1 class="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                  {category().title}
                </h1>
                <p class="max-w-2xl text-lg text-gray-400 md:text-xl">
                  {category().description}
                </p>
              </div>

              <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                <For each={category().projects}>
                  {(project, index) => (
                    <button
                      class="project-card group flex cursor-pointer flex-col gap-5 text-left"
                      style={{ "animation-delay": `${index() * 0.1}s` }}
                      onClick={() => openProject(project)}
                    >
                      <div class="glass relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(201,169,110,0.15)]">
                        <div
                          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ "background-image": `url('${project.coverImage}')` }}
                        />
                        <div class="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />

                        <div class="absolute inset-0 flex scale-90 items-center justify-center opacity-0 transition-opacity duration-500 group-hover:scale-100 group-hover:opacity-100">
                          <div class="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/50 font-medium text-white backdrop-blur-md">
                            View
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 class="text-2xl font-semibold text-white">
                          {project.title}
                        </h3>
                        <p class="mt-2 line-clamp-2 text-gray-400">
                          {project.description}
                        </p>
                      </div>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </div>

          <Footer />

          <Show when={selectedProject()}>
            <ProjectDetail
              project={selectedProject()}
              onClose={closeProject}
            />
          </Show>
        </main>
      )}
    </Show>
  );
}

function ProjectDetailContent(props) {
  return (
    <div class="mx-auto max-w-[var(--page-max-width)]">
      <div class="mb-16 max-w-3xl md:mb-24 lg:mb-28">
        <h1 class="detail-enter text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
          {props.project.title}
        </h1>
        <p class="detail-enter mt-8 text-lg font-light leading-relaxed text-zinc-400 md:mt-10 md:text-xl">
          {props.project.description}
        </p>
      </div>

      <Show when={props.project.caseStudy}>
        <div class="detail-enter mb-16 rounded-2xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm md:mb-24 md:p-12 lg:mb-28">
          <h2 class="mb-8 text-2xl font-medium text-white md:mb-10 md:text-3xl">
            Case Study
          </h2>
          <div class="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            <For each={props.project.caseStudy}>
              {(section) => (
                <div class="flex flex-col">
                  <h3 class="mb-3 text-lg font-medium tracking-wide text-[var(--accent)]">
                    {section.title}
                  </h3>
                  <Show when={section.content}>
                    <p class="text-[15px] leading-relaxed text-zinc-300">
                      {section.content}
                    </p>
                  </Show>
                  <Show when={section.list}>
                    <ul class="ml-4 mt-2 list-outside list-disc space-y-2 text-[15px] text-zinc-300">
                      <For each={section.list}>
                        {(item) => <li class="pl-1 leading-relaxed">{item}</li>}
                      </For>
                    </ul>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>

      <div class="columns-1 gap-7 sm:columns-2 md:gap-8 lg:columns-3 lg:gap-10">
        <For each={props.project.images}>
          {(src, index) => {
            const isVideo = src.toLowerCase().endsWith(".mp4");
            return (
              <div
                class="detail-media mb-7 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 md:mb-8 lg:mb-10"
                style={{ "animation-delay": `${0.4 + index() * 0.1}s` }}
              >
                <Show
                  when={isVideo}
                  fallback={
                    <img
                      src={src}
                      alt={`${props.project.title} - Image ${index() + 1}`}
                      loading="lazy"
                      class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  }
                >
                  <video
                    src={src}
                    autoplay
                    loop
                    muted
                    playsinline
                    class="h-auto w-full object-cover"
                  />
                </Show>
              </div>
            );
          }}
        </For>
      </div>

      <Show when={props.project.drawings?.length}>
        <div class="mt-16 md:mt-24">
          <h2 class="mb-8 text-2xl font-medium text-white md:mb-10 md:text-3xl">
            Drawings
          </h2>
          <div class="columns-1 gap-7 sm:columns-2 md:gap-8 lg:columns-3 lg:gap-10">
            <For each={props.project.drawings}>
              {(src, index) => (
                <div
                  class="detail-media mb-7 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 md:mb-8 lg:mb-10"
                  style={{ "animation-delay": `${0.2 + index() * 0.1}s` }}
                >
                  <img
                    src={src}
                    alt={`${props.project.title} - Drawing ${index() + 1}`}
                    loading="lazy"
                    class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}

function ServiceProjectPage(props) {
  const project = createMemo(() =>
    serviceProjects.find((item) => item.id === props.slug),
  );

  return (
    <Show
      when={project()}
      fallback={
        <main class="flex min-h-screen items-center justify-center bg-[var(--background)] px-[var(--section-pad-x)] text-white">
          <div class="text-center">
            <h1 class="mb-4 text-4xl font-bold">Project Not Found</h1>
            <button
              type="button"
              onClick={() => goTo("/#services")}
              class="text-[var(--accent)] hover:underline"
            >
              Back to Services
            </button>
          </div>
        </main>
      }
    >
      {(serviceProject) => (
        <main class="min-h-screen bg-[var(--background)] pb-20 pt-32">
          <Navbar />
          <div class="section-shell pb-20">
            <div class="section-inner mb-12">
              <button
                type="button"
                onClick={() => backOrFallback("/#services")}
                class="group flex items-center gap-2 border-none bg-transparent text-sm text-gray-400 transition-colors hover:text-white"
              >
                <Icon
                  name="arrow-left"
                  size={16}
                  class="transition-transform group-hover:-translate-x-1"
                />
                Back to Services
              </button>
            </div>
            <ProjectDetailContent project={serviceProject()} />
          </div>
          <Footer />
        </main>
      )}
    </Show>
  );
}

function ProjectDetail(props) {
  createEffect(() => {
    if (props.project) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "auto";
    } else {
      document.body.style.overflow = "";
    }
  });

  onMount(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        props.onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    onCleanup(() => {
      document.body.style.overflow = "";
      document.body.style.cursor = "auto";
      window.removeEventListener("keydown", handleKeydown);
    });
  });

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose?.();
    }
  };

  const handleCloseClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.onClose?.();
  };

  return (
    <div
      class="project-detail fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md"
      data-lenis-prevent="true"
      onClick={handleBackdropClick}
    >
      <div class="relative min-h-screen w-full px-[var(--section-pad-x)] py-24 sm:py-28 md:py-36 lg:py-40">
        <button
          type="button"
          onClick={handleCloseClick}
          class="group fixed right-5 top-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-8 sm:top-8 md:right-12 md:top-12"
          aria-label="Close project detail"
        >
          <Icon name="x" size={24} class="pointer-events-none transition-transform group-hover:rotate-90" />
        </button>

        <div class="mx-auto max-w-[var(--page-max-width)]">
          <div class="mb-16 max-w-3xl md:mb-24 lg:mb-28">
            <h1 class="detail-enter text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
              {props.project.title}
            </h1>
            <p class="detail-enter mt-8 text-lg font-light leading-relaxed text-zinc-400 md:mt-10 md:text-xl">
              {props.project.description}
            </p>
          </div>

          <Show when={props.project.caseStudy}>
            <div class="detail-enter mb-16 rounded-2xl border border-white/5 bg-zinc-900/50 p-8 backdrop-blur-sm md:mb-24 md:p-12 lg:mb-28">
              <h2 class="mb-8 text-2xl font-medium text-white md:mb-10 md:text-3xl">
                Case Study
              </h2>
              <div class="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                <For each={props.project.caseStudy}>
                  {(section) => (
                    <div class="flex flex-col">
                      <h3 class="mb-3 text-lg font-medium tracking-wide text-[var(--accent)]">
                        {section.title}
                      </h3>
                      <Show when={section.content}>
                        <p class="text-[15px] leading-relaxed text-zinc-300">
                          {section.content}
                        </p>
                      </Show>
                      <Show when={section.list}>
                        <ul class="ml-4 mt-2 list-outside list-disc space-y-2 text-[15px] text-zinc-300">
                          <For each={section.list}>
                            {(item) => <li class="pl-1 leading-relaxed">{item}</li>}
                          </For>
                        </ul>
                      </Show>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>

          <div class="columns-1 gap-7 sm:columns-2 md:gap-8 lg:columns-3 lg:gap-10">
            <For each={props.project.images}>
              {(src, index) => {
                const isVideo = src.toLowerCase().endsWith(".mp4");
                return (
                  <div
                    class="detail-media mb-7 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 md:mb-8 lg:mb-10"
                    style={{ "animation-delay": `${0.4 + index() * 0.1}s` }}
                  >
                    <Show
                      when={isVideo}
                      fallback={
                        <img
                          src={src}
                          alt={`${props.project.title} - Image ${index() + 1}`}
                          loading="lazy"
                          class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      }
                    >
                      <video
                        src={src}
                        autoplay
                        loop
                        muted
                        playsinline
                        class="h-auto w-full object-cover"
                      />
                    </Show>
                  </div>
                );
              }}
            </For>
          </div>

          <Show when={props.project.drawings?.length}>
            <div class="mt-16 md:mt-24">
              <h2 class="mb-8 text-2xl font-medium text-white md:mb-10 md:text-3xl">
                Drawings
              </h2>
              <div class="columns-1 gap-7 sm:columns-2 md:gap-8 lg:columns-3 lg:gap-10">
                <For each={props.project.drawings}>
                  {(src, index) => (
                    <div
                      class="detail-media mb-7 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 md:mb-8 lg:mb-10"
                      style={{ "animation-delay": `${0.2 + index() * 0.1}s` }}
                    >
                      <img
                        src={src}
                        alt={`${props.project.title} - Drawing ${index() + 1}`}
                        loading="lazy"
                        class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

render(() => <App />, document.getElementById("root"));
