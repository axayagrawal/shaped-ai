// Duplicate the slides for the illusion of an infinite loop
$(".testimonials_slider_slide").clone().appendTo(".testimonials_slider_list");

let wrap = $(".testimonials_slider");
let items = $(".testimonials_slider_slide");
let totalItems = items.length; // Since we've duplicated the slides
let currentIndex = 2; // starting index
let isAnimating = false;

function isHorizontalMode() {
  return $(window).width() < 768;
}

function makeItemActive(myIndex) {
  if ($(window).width() >= 768) {
    gsap.to(items, { scale: 0.9, opacity: 0.7, duration: 0.4 }); // Reset all slides to smaller size and lower opacity for screens >= 768px
  } else {
    gsap.to(items, { opacity: 0.7, duration: 0.4 }); // Only reset opacity for screens < 768px
  }
  items.removeClass("active");

  $(".testimonials_slider_list").each(function () {
    let currentItem = $(this).find(".testimonials_slider_slide").eq(myIndex);
    currentItem.addClass("active");
    if ($(window).width() >= 768) {
      gsap.to(currentItem, { scale: 1, opacity: 1, duration: 0.4 }); // Animate the active slide to normal size and full opacity for screens >= 768px
    } else {
      gsap.to(currentItem, { opacity: 1, duration: 0.4 }); // Only animate opacity for screens < 768px
    }
  });
}

function animateToCenter() {
  if (isAnimating) return;
  isAnimating = true;

  let activeItem = items.eq(currentIndex);

  if (isHorizontalMode()) {
    let wrapCenter = wrap.offset().left + wrap.width() / 2;
    let itemCenter = activeItem.offset().left + activeItem.outerWidth() / 2;
    let moveAmount = wrapCenter - itemCenter;

    gsap.to(".testimonials_slider_track", {
      x: `+=${moveAmount}`,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: loopAnimation
    });
  } else {
    let wrapCenter = wrap.offset().top + wrap.height() / 2;
    let itemCenter = activeItem.offset().top + activeItem.outerHeight() / 2;
    let moveAmount = wrapCenter - itemCenter;

    gsap.to(".testimonials_slider_track", {
      y: `+=${moveAmount}`,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: loopAnimation
    });
  }
}

function loopAnimation() {
  // After moving to center, pause for 3 seconds
  setTimeout(() => {
    currentIndex++;

    if (currentIndex == totalItems - 1) {
      // Before the last slide comes to the center
      items = $(".testimonials_slider_slide"); // Update the items since we duplicated
      // Directly append another set
      $(".testimonials_slider_slide")
        .clone()
        .appendTo(".testimonials_slider_list");
    }

    if (currentIndex >= totalItems) {
      currentIndex = 2; // Start from the second slide again
      if (isHorizontalMode()) {
        gsap.set(".testimonials_slider_track", {
          x: -items.eq(0).outerWidth()
        });
      } else {
        gsap.set(".testimonials_slider_track", {
          y: -items.eq(0).outerHeight()
        });
      }
    }
    makeItemActive(currentIndex);
    isAnimating = false;
    animateToCenter();
  }, 7000);
}

makeItemActive(currentIndex); // Initial activation
animateToCenter(); // Start the animation loop
