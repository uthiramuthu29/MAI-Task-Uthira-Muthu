const carousel = document.getElementById("carousel");
const slides = carousel.children;
const dots = document.querySelectorAll(".dot");
const preview = document.getElementById("preview");

let index = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active-dot"));
  dots[index].classList.add("active-dot");

  const nextIndex = (index + 1) % slides.length;
  preview.src = slides[nextIndex].src;
}

setInterval(() => {
  index = (index + 1) % slides.length;
  updateCarousel();
}, 3000);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    index = parseInt(dot.dataset.index);
    updateCarousel();
  });
});

updateCarousel();

const sliderTrack = document.querySelector(".slider-track");
const cards = Array.from(document.querySelectorAll(".slider-card"));

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let rotated = false; 

function applyOrder(orderArray) {
  sliderTrack.innerHTML = "";
  orderArray.forEach((card, index) => {
    card.classList.remove("pos-1", "pos-2", "pos-3", "pos-4", "pos-5");
    card.classList.add(`pos-${index + 1}`);
    sliderTrack.appendChild(card);
  });
}

nextBtn.addEventListener("click", () => {
  if (rotated) return; 

  const newOrder = [...cards.slice(1), cards[0]];

  applyOrder(newOrder);

  rotated = true;
  nextBtn.disabled = true;
  prevBtn.disabled = false;
});

prevBtn.addEventListener("click", () => {
  if (!rotated) return;

  applyOrder(cards);

  rotated = false;
  prevBtn.disabled = true;
  nextBtn.disabled = false;
});

prevBtn.disabled = true;
applyOrder(cards);

const realStats = document.querySelector(".real-stats");
const eImgs = document.querySelectorAll(".e-img");
const rImgs = document.querySelectorAll(".r-img");

let lastScrollY = window.scrollY;

window.addEventListener("load", () => {
  eImgs.forEach((img, index) => {
    setTimeout(() => img.classList.add("loaded"), index * 80);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const scrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;

    if (entry.isIntersecting && scrollingDown) {

      eImgs.forEach((img, index) => {
        setTimeout(() => img.classList.add("exit"), index * 50);
      });

      rImgs.forEach((img, index) => {
        setTimeout(() => img.classList.add("enter"), 250 + index * 120);
      });
    }

    if (scrollingDown === false && window.scrollY < entry.target.offsetTop) {

      eImgs.forEach(img => {
        img.classList.remove("exit");
      });

      rImgs.forEach(img => {
        img.classList.remove("enter");
        img.classList.add("reset");

        setTimeout(() => img.classList.remove("reset"), 600);
      });
    }

  });
}, { threshold: 0.4 });

observer.observe(realStats);

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.hover-item');

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});