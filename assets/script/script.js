const triggers = document.querySelectorAll('.open-details');
const header = document.getElementById('mainHeader');
let currentOffcanvas = null; 
  // عناصر القائمة
  const categoryLinks = document.querySelectorAll(".category-link");
  const categoryTitle = document.getElementById("categoryTitle");
  const categoryContent = document.getElementById("categoryContent");
 const categories = {
    laptop: {
      title: "Laptop & Computer",
      items: [
        "Desktop PC",
        "Gaming Laptop",
        "Ultrabook",
        "Computer Accessories"
      ]
    },
    fashion: {
      title: "Fashion",
      items: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories"
      ]
    },
    phone: {
      title: "Phone & Tablet",
      items: [
        "Smartphones",
        "Tablets",
        "Phone Cases",
        "Chargers"
      ]
    },
    camera: {
      title: "Camera",
      items: [
        "DSLR",
        "Mirrorless",
        "Action Camera",
        "Lenses"
      ]
    }
  };

  categoryLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const id = this.getAttribute("data-id");
      const category = categories[id];

      if (category) {
        categoryTitle.textContent = category.title;
        categoryContent.innerHTML = `
          <ul class="list-group">
            ${category.items.map(item => `<li class="list-group-item">${item}</li>`).join("")}
          </ul>
        `;

        // فتح Offcanvas التفاصيل
        const detailsOffcanvas = new bootstrap.Offcanvas(document.getElementById('categoryDetails'));
        detailsOffcanvas.show();
      }
    });
  });

function openSubOffcanvas(targetSelector) {
  if (currentOffcanvas) {
    currentOffcanvas.hide();
    currentOffcanvas = null;
  }

  const targetElement = document.querySelector(targetSelector);
  if (targetElement) {
    const offcanvas = new bootstrap.Offcanvas(targetElement);
    offcanvas.show();
    currentOffcanvas = offcanvas;
  }
}

triggers.forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('data-target');
    openSubOffcanvas(target);
  });

  trigger.addEventListener('mouseenter', function () {
    const target = this.getAttribute('data-target');
    openSubOffcanvas(target);
  });
});
  const scrollPoint = 150;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollPoint) {
      if (!header.classList.contains('fixed-header')) {
        header.classList.add('fixed-header');
        setTimeout(() => header.classList.add('show'), 10);
      }
    } else {
      header.classList.remove('show');
      setTimeout(() => header.classList.remove('fixed-header'), 300); 
    }
  });

   // Flash Deals Countdown
let hours = 2;
let minutes = 42;
let seconds = 18;

let hElem = document.getElementById("hours");
let mElem = document.getElementById("minutes");
let sElem = document.getElementById("seconds");

function updateCountdown() {
  let h = hours.toString().padStart(2, "0");
  let m = minutes.toString().padStart(2, "0");
  let s = seconds.toString().padStart(2, "0");

  hElem.textContent = h;
  mElem.textContent = m;
  sElem.textContent = s;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(timer);
    hElem.textContent = "00";
    mElem.textContent = "00";
    sElem.textContent = "00";
    return;
  }

  if (seconds > 0) {
    seconds--;
  } else {
    seconds = 59;
    if (minutes > 0) {
      minutes--;
    } else {
      minutes = 59;
      if (hours > 0) {
        hours--;
      }
    }
  }
}

updateCountdown();
let timer = setInterval(updateCountdown, 1000);

  // Hover actions for product cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.hover-actions').style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.hover-actions').style.opacity = '0';
    });
  });

  // Activate Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

const sliderWrapper = document.querySelector('.slider-wrapper');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let cardWidth = document.querySelector('.card').offsetWidth;
let isMoving = false;

// حركة لليمين
nextBtn.addEventListener('click', () => {
  if (isMoving) return;
  isMoving = true;

  sliderWrapper.style.transition = 'transform 0.5s ease';
  sliderWrapper.style.transform = `translateX(-${cardWidth}px)`;

  sliderWrapper.addEventListener('transitionend', () => {
    sliderWrapper.style.transition = 'none';
    sliderWrapper.appendChild(sliderWrapper.firstElementChild);
    sliderWrapper.style.transform = 'translateX(0)';
    isMoving = false;
  }, { once: true });
});

// حركة للشمال
prevBtn.addEventListener('click', () => {
  if (isMoving) return;
  isMoving = true;

  sliderWrapper.style.transition = 'none';
  sliderWrapper.insertBefore(sliderWrapper.lastElementChild, sliderWrapper.firstElementChild);
  sliderWrapper.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    sliderWrapper.style.transition = 'transform 0.5s ease';
    sliderWrapper.style.transform = 'translateX(0)';
    sliderWrapper.addEventListener('transitionend', () => {
      isMoving = false;
    }, { once: true });
  }, 10);
});

//------------------image filter
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumb');

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', function () {
    let bg = this.style.backgroundImage;
    mainImage.style.backgroundImage = bg;
    thumbnails.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

var swiper = new Swiper(".productSwiper", {
  slidesPerView: 3,
  spaceBetween: 5,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: { slidesPerView: 3 },
    768: { slidesPerView: 5 },
    992: { slidesPerView: 6 },
    1200: { slidesPerView: 8 }
  }
});

var blogSwiper = new Swiper(".blogSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".blogSwiper .swiper-button-next",
    prevEl: ".blogSwiper .swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
});
    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollBtn.classList.remove("d-none");
      } else {
        scrollBtn.classList.add("d-none");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
