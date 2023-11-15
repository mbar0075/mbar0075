// Mobile navigation
function showMobileNav() {
  var mobileNav = document.getElementById("nav-mobile");

  if (mobileNav.style.display === "none" || mobileNav.style.display === "") {
      mobileNav.style.display = "flex";
      mobileNav.style.animationName = "wipe_down"; // Apply the wipe-down animation
      mobileNav.style.animationDuration = "0.8s";
      mobileNav.style.animationFillMode = "forwards";

      // Prevent scrolling
      document.body.style.overflowY = "hidden";
  } else {
      mobileNav.style.animationName = "wipe_up"; // Apply the wipe-up animation
      mobileNav.style.animationDuration = "0.8s";
      mobileNav.style.animationFillMode = "forwards";

      setTimeout(function () {
          mobileNav.style.display = "none"; // Hide the element after animation
          document.body.style.overflowY = "scroll"; // Enable scrolling
      }, 800); // This timeout should match the duration of the animation (800ms in this case)
  }
}


// Face animation
document.addEventListener("DOMContentLoaded", function() {
  var face = document.getElementById("mainPicture");

  if (face) {
    face.onclick = function() {
      var randomNumber = Math.floor(Math.random() * 100) + 1;
      
      face.classList.add("change-border-rainbow");
      if (randomNumber > 50) {
        face.classList.add("spin-animation");
        setTimeout(function() {
          face.classList.remove("spin-animation");
        }, 2000);
      } else {
        face.classList.add("bounce-animation");
        setTimeout(function() {
          face.classList.remove("bounce-animation");
        }, 2000);
      }
      face.classList.remove("change-border-rainbow");
    };
  }
});


// Writing animation
function typeWriter(txt, speed = 100, targetId = "typing", delay = 0) {
  setTimeout(() => {
    let i = 0;
    const typingElement = document.getElementById(targetId);
    if (typingElement) {
      const typeInterval = setInterval(() => {
        if (i < txt.length) {
          typingElement.innerHTML += txt.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, speed);
    }
  }, delay);
}