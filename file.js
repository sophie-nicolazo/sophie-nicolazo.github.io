document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".grid .item img, .grid-4 .item img, .item.large img, .project-intro img"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const arrowLeft = document.querySelector(".lightbox-arrow.left");
  const arrowRight = document.querySelector(".lightbox-arrow.right");

  if (!lightbox || !lightboxImg || images.length === 0) return;

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.style.display = "flex";
    lightbox.setAttribute("tabindex", "-1");
    lightbox.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(index));
  });

  if (arrowRight) arrowRight.addEventListener("click", e => { e.stopPropagation(); showNext(); });
  if (arrowLeft) arrowLeft.addEventListener("click", e => { e.stopPropagation(); showPrev(); });
  if (closeBtn) closeBtn.addEventListener("click", e => { e.stopPropagation(); closeLightbox(); });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});
