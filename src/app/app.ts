import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'nonprofit';

  // modal state
  modalOpen = false;
  modalSrc = '';
  modalAlt = '';

  constructor(private renderer: Renderer2) {}

  openModal(event: Event) {
    const img = (event.target as HTMLImageElement);
    if (!img || !img.src) return;
    this.modalSrc = img.src;
    this.modalAlt = img.alt || '';
    this.modalOpen = true;

    // Attempt Fullscreen API on the modal element after the DOM updates
    setTimeout(() => {
      const modalEl = document.getElementById('image-modal');
      if (modalEl && (modalEl as any).requestFullscreen) {
        (modalEl as any).requestFullscreen().catch(() => {});
      }
    }, 50);
  }

  closeModal() {
    this.modalOpen = false;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }
}
