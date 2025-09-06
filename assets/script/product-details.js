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
  function setMainImage(url){
    const viewer = document.getElementById('productViewer');
    viewer.style.backgroundImage = `url('${url}')`;
  }
  document.querySelectorAll('.thumb').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.thumb').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      setMainImage(btn.dataset.image);
    });
  });

  (function(){
    const viewer = document.getElementById('productViewer');
    let zoomed = false;

    viewer.addEventListener('mouseenter', ()=>{ zoomed = true; viewer.classList.add('zoomed'); });
    viewer.addEventListener('mouseleave', ()=>{
      zoomed = false; viewer.classList.remove('zoomed');
      viewer.style.backgroundPosition = 'center center';
    });

    viewer.addEventListener('mousemove', (e)=>{
      if(!zoomed) return;
      const rect = viewer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      viewer.style.backgroundPosition = `${x}% ${y}%`;
    });
  })();

  function syncQty(val){
    document.querySelectorAll('.qty-input').forEach(inp=>{
      inp.value = Math.max(1, parseInt(val||1,10));
    });
  }
  document.querySelectorAll('.qty-minus').forEach(b=>{
    b.addEventListener('click', ()=>{
      const any = document.querySelector('.qty-input');
      const v = Math.max(1, parseInt(any.value,10) - 1);
      syncQty(v);
    });
  });
  document.querySelectorAll('.qty-plus').forEach(b=>{
    b.addEventListener('click', ()=>{
      const any = document.querySelector('.qty-input');
      const v = Math.max(1, parseInt(any.value,10) + 1);
      syncQty(v);
    });
  });
  document.querySelectorAll('.qty-input').forEach(inp=>{
    inp.addEventListener('input', ()=> syncQty(inp.value));
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
