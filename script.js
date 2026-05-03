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
  
  // Inject the hover animation styles
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


