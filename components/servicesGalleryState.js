"use client";

import { proxy } from "valtio";

const galleryState = proxy({
  progress: 0,
  trackX: 0,
  selectedProject: null,
});

export function setServicesGalleryProgress(progress) {
  galleryState.progress = progress;
}

export function setSelectedProject(project) {
  galleryState.selectedProject = project;
}

export function resetServicesGalleryState() {
  galleryState.progress = 0;
  galleryState.trackX = 0;
  galleryState.selectedProject = null;
}

export { galleryState };
