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
