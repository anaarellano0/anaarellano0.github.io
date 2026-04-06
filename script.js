document.addEventListener("DOMContentLoaded", () => {

  console.log("JS is working!");

  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");
  const caption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".close");

  // --- OPEN LIGHTBOX / HANDLE CLICKS ---
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {

      const linkURL = item.dataset.link;   // ⭐ ADD THIS
      const videoURL = item.dataset.video;
      const img = item.querySelector("img");

      const titleEl = item.querySelector(".overlay h3");
      const descEl = item.querySelector(".overlay p");

      const title = titleEl ? titleEl.innerText : "";
      const desc = descEl ? descEl.innerHTML : "";

      // --- WEBSITE LINK (CHECK FIRST) ---
      if (linkURL) {
        window.open(linkURL, "_blank");
        return; // stop everything else
      }

      // --- OPEN LIGHTBOX ---
      lightbox.style.display = "flex";

      // --- VIDEO ---
      if (videoURL) {
        lightboxVideo.style.display = "block";
        lightboxVideo.src = videoURL;

        lightboxImg.style.display = "none";
        lightboxImg.src = "";
      }

      // --- IMAGE ---
      else if (img) {
        lightboxImg.style.display = "block";
        lightboxImg.src = img.src;

        lightboxVideo.style.display = "none";
        lightboxVideo.src = "";
      }

      // --- CAPTION ---
      caption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    });
  });

  // --- CLOSE BUTTON ---
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxVideo.src = "";
  });

  // --- CLICK OUTSIDE TO CLOSE ---
  lightbox.addEventListener("click", (e) => {
    if (
      e.target !== lightboxImg &&
      e.target !== lightboxVideo &&
      !caption.contains(e.target)
    ) {
      lightbox.style.display = "none";
      lightboxVideo.src = "";
    }
  });

});
