// Shared reactive state for the site-wide image lightbox.
export const lightbox = $state({ src: '', alt: '' });

export function openLightbox(src, alt = '') {
	lightbox.src = src;
	lightbox.alt = alt;
}

export function closeLightbox() {
	lightbox.src = '';
}
