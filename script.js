console.log("JavaScript is connected!");

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}



document.addEventListener('DOMContentLoaded', () => {
  
  const images = document.querySelectorAll('img');
  
    
  const style = document.createElement('style');
  style.textContent = `
    img {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }
    
    img:hover {
      animation: hoverFloat 1.5s ease-in-out infinite;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
    
    @keyframes hoverFloat {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-12px); }
    }
  `;
  document.head.appendChild(style);
  
  console.log(` Hover-float ready on {images.length} images`);
});

document.addEventListener('DOMContentLoaded', () => {


  const style = document.createElement('style');
  style.textContent = `
    img { transition: transform .35s ease, box-shadow .35s ease; }
    img:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 0 15px 30px rgba(0,0,0,.25);
    }
    .scroll-top {
      position: fixed; bottom: 25px; right: 25px;
      width: 45px; height: 45px; border-radius: 50%;
      background: rgb(143,44,14); color: #fff; border: none;
      font-size: 22px; cursor: pointer; display: none;
      box-shadow: 0 4px 12px rgba(0,0,0,.25); z-index: 999;
    }
    .scroll-top:hover { background: rgb(110,30,5); }
    .nav-active { color: rgb(143,44,14) !important; font-weight: bold; }
    .error-input { border: 2px solid red !important; }
    .form-msg { margin-top: 10px; font-weight: bold; }
  `;
  document.head.appendChild(style);


 


  const topBtn = document.createElement('button');
  topBtn.className = 'scroll-top';
  topBtn.innerHTML = '↑';
  topBtn.title = 'Back to top';
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;

      inputs.forEach(i => {
        i.classList.remove('error-input');
        if (!i.value.trim()) { i.classList.add('error-input'); valid = false; }
        if (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)) {
          i.classList.add('error-input'); valid = false;
        }
      });

     
      const old = form.querySelector('.form-msg');
      if (old) old.remove();

      const msg = document.createElement('p');
      msg.className = 'form-msg';
      if (!valid) {
        msg.textContent = 'Please fill in all fields correctly.';
        msg.style.color = 'red';
      } else {
        msg.textContent = 'Thank you! Your message has been sent.';
        msg.style.color = 'green';
        form.reset();
      }
      form.appendChild(msg);
    });
  }


  const feedback = document.querySelector('.feedback-stars');
  if (feedback) {
    feedback.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.style.cssText = 'font-size:32px;cursor:pointer;color:#ccc;margin:0 4px;';
      star.addEventListener('mouseover', () => paintStars(i));
      star.addEventListener('click', () => {
        feedback.dataset.rating = i;
        paintStars(i, true);
      });
      feedback.appendChild(star);
    }
    feedback.addEventListener('mouseleave', () => {
      paintStars(feedback.dataset.rating || 0, true);
    });
    function paintStars(n, locked = false) {
      [...feedback.children].forEach((s, idx) => {
        s.style.color = idx < n ? '#f5b301' : '#ccc';
      });
    }
  }


  const cards = document.querySelectorAll('.card, section');
  if ('IntersectionObserver' in window && cards.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.transition = 'opacity .6s ease, transform .6s ease';
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(c => {
      c.style.opacity = 0;
      c.style.transform = 'translateY(30px)';
      io.observe(c);
    });
  }

});

// === Auto-inject Bootstrap hamburger menu ===
document.addEventListener("DOMContentLoaded", () => {
  // 1. Make sure Bootstrap's JS bundle is loaded (needed for the toggle to work)
  if (!window.bootstrap) {
    const bs = document.createElement("script");
    bs.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bs);
  }

  const navbar = document.querySelector("nav.navbar");
  if (!navbar) return;

  const container = navbar.querySelector(".container") || navbar;
  const navList = container.querySelector("ul.navbar-nav");
  if (!navList) return;

  // 2. Build the hamburger button
  const toggler = document.createElement("button");
  toggler.className = "navbar-toggler";
  toggler.type = "button";
  toggler.setAttribute("data-bs-toggle", "collapse");
  toggler.setAttribute("data-bs-target", "#mainNav");
  toggler.setAttribute("aria-controls", "mainNav");
  toggler.setAttribute("aria-expanded", "false");
  toggler.setAttribute("aria-label", "Toggle navigation");
  toggler.innerHTML = `<span class="navbar-toggler-icon"></span>`;

  // 3. Wrap the existing <ul> in a collapsible div
  const collapseWrapper = document.createElement("div");
  collapseWrapper.className = "collapse navbar-collapse";
  collapseWrapper.id = "mainNav";

  navList.classList.add("ms-auto"); // push links to the right
  navList.parentNode.insertBefore(collapseWrapper, navList);
  collapseWrapper.appendChild(navList);

  // 4. Insert hamburger button right before the collapsible div
  container.insertBefore(toggler, collapseWrapper);

  // 5. Make sure navbar has the expand class so it collapses below lg
  if (![...navbar.classList].some(c => c.startsWith("navbar-expand-"))) {
    navbar.classList.add("navbar-expand-lg");
  }
});



