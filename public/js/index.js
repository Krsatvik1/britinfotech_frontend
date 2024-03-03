"use strict";

var _gsap = require("gsap");
var _CustomEase = require("gsap/CustomEase");
var _EasePack = require("gsap/EasePack");
var _lenis = _interopRequireDefault(require("@studio-freight/lenis"));
var _ScrollTrigger = require("gsap/ScrollTrigger");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var lenis = new _lenis["default"]();
lenis.on("scroll", function (e) {
  console.log(e);
});
lenis.on("scroll", _ScrollTrigger.ScrollTrigger.update);
_gsap.gsap.ticker.add(function (time) {
  lenis.raf(time * 600);
});
_gsap.gsap.ticker.lagSmoothing(0);
_gsap.gsap.registerPlugin(_ScrollTrigger.ScrollTrigger, _EasePack.RoughEase, _EasePack.ExpoScaleEase, _EasePack.SlowMo, _CustomEase.CustomEase);
var layer1, header, nav, h1;
if (document.getElementById("Layer_1")) {
  layer1 = document.getElementById("Layer_1");
}
if (document.querySelector("header")) {
  header = document.querySelector("header");
  if (header.querySelector("div > h1")) {
    h1 = header.querySelector("div > h1");
  }
}
var nav = document.querySelector("#navSide");
function showNav() {
  nav.classList.toggle("showNav");
}
if (layer1 && h1) {
  var setLayerHeight = function setLayerHeight() {
    layer1.style.height = "calc(" + h1.offsetHeight + "px - 2rem)";
  };
  setLayerHeight(); // Set initial height
  window.addEventListener("resize", setLayerHeight);
}
var observerClass = function observerClass(entries, className) {
  var intersectionRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.25;
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: intersectionRatio
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(entries);
};
if (document.querySelector(".card-animation-1")) {
  _gsap.gsap.registerPlugin(_ScrollTrigger.ScrollTrigger);
  _gsap.gsap.utils.toArray(".card-animation-1 > a").forEach(function (card, k) {
    var i = window.innerWidth >= 768 ? "2" : "8";
    var s = k % 2 == 0 ? "60% 100%" : "top 100%";
    var e = k % 2 == 0 ? "160% 70%" : "bottom 70%";
    var d = k % 2 == 0 ? "-" : "+";
    _gsap.gsap.from(card, {
      opacity: 0,
      y: "100%",
      x: d + i + "%",
      scrollTrigger: {
        trigger: card,
        start: s,
        end: e,
        scrub: true,
        markers: false
      }
    });
  });
}
if (document.querySelector(".choose-us")) {
  // observerClass(document.querySelector(".slider-1"), "slider-reveal", 0.5);
  // let x = window.innerWidth >= 768 ? '100%': '8'
  var x = window.innerWidth >= 768 ? "1" : "0";
  var y = window.innerWidth >= 768 ? "0" : "1";
  _gsap.gsap.fromTo(document.querySelector(".slider-1"), {
    scaleY: 1,
    scaleX: 1
  }, {
    scaleY: y,
    scaleX: x,
    scrollTrigger: {
      trigger: document.querySelector(".choose-us > div:nth-child(1)"),
      start: "top 55%",
      end: "bottom 55%",
      scrub: true,
      markers: false
    }
  });
  _gsap.gsap.fromTo(document.querySelector(".slider-2"), {
    scaleY: 1,
    scaleX: 1
  }, {
    scaleY: y,
    scaleX: x,
    scrollTrigger: {
      trigger: document.querySelector(".choose-us > div:nth-child(2)"),
      start: "top 55%",
      end: "bottom 55%",
      scrub: true,
      markers: false
    }
  });
  _gsap.gsap.fromTo(document.querySelector(".slider-3"), {
    scaleY: 1,
    scaleX: 1
  }, {
    scaleY: y,
    scaleX: x,
    scrollTrigger: {
      trigger: document.querySelector(".choose-us > div:nth-child(3)"),
      start: "top 55%",
      end: "bottom 55%",
      scrub: true,
      markers: false
    }
  });
  document.querySelectorAll(".choose-us > *").forEach(function (seg, k) {
    var i = window.innerWidth >= 768 ? "5" : "8";
    var d = k % 2 == 0 ? "+" : "-";
    var a = k % 2 == 0 ? "-" : "+";
    var img = seg.querySelector("div:nth-child(1)").querySelector("div:nth-child(1)");
    var frame = seg.querySelector("div:nth-child(1)").querySelector("div:nth-child(2)");
    var heading = seg.querySelector("div:nth-child(3) h3");
    var para = seg.querySelector("div:nth-child(3) p");
    _gsap.gsap.from(img, {
      opacity: 0,
      y: "100%",
      x: a + i + "%",
      scrollTrigger: {
        trigger: seg,
        start: "top 90%",
        end: "bottom 90%",
        scrub: false,
        markers: false
      }
    });
    _gsap.gsap.from(frame, {
      opacity: 0,
      y: "100%",
      x: a + i + "%",
      scrollTrigger: {
        trigger: seg,
        start: "top 80%",
        end: "bottom 80%",
        scrub: true,
        markers: false
      }
    });
    _gsap.gsap.from(heading, {
      opacity: 0,
      y: "100%",
      x: d + i + "%",
      scrollTrigger: {
        trigger: seg,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        markers: false
      }
    });
    _gsap.gsap.from(para, {
      opacity: 0,
      y: "100%",
      x: d + i + "%",
      scrollTrigger: {
        trigger: seg,
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
        markers: false
      }
    });
  });
  // observerClass(document.querySelector(".slider-2"), "slider-reveal", 0.5);
  // observerClass(document.querySelector(".slider-3"), "slider-reveal", 0.5);
  // document.querySelectorAll(".choose-us > div").forEach((card) => {
  //   observerClass(card, "swiper-slide", 0.5);
  // });
}
if (document.querySelector(".shadow-animate")) {
  // observerClass(
  //   document.querySelector(".shadow-animate"),
  //   "md:shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)_inset]",
  //   0.5
  // );
  // observerClass(
  //   document.querySelector(".shadow-animate"),
  //   "shadow-[0px_3.035px_9.105px_0px_rgba(0,0,0,0.25)_inset]",
  //   0.5
  // );
  _gsap.gsap.fromTo(document.querySelector(".shadow-animate"), {
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.0) inset"
  }, {
    boxShadow: "0px 3.035px 9.105px 0px rgba(0,0,0,0.25) inset",
    scrollTrigger: {
      trigger: document.querySelector(".shadow-animate"),
      start: "top 50%",
      end: "bottom 100%",
      scrub: true,
      markers: false
    }
  });
}
if (document.querySelector(".client-list")) {
  var container = document.querySelector(".client-list");
  var items = Array.from(document.querySelectorAll(".client-list > div"));
  _gsap.gsap.set(container, {
    x: 0
  }); // Initial position
  var i = window.innerWidth >= 768 ? "200" : "0";
  _gsap.gsap.to(container, {
    x: "-=".concat(items.length * i, "px"),
    // Move to the left by the total width of all items
    duration: 20,
    // Duration of the animation
    repeat: -1,
    // Repeat indefinitely
    ease: "none",
    // Linear movement
    modifiers: {
      x: function x(value) {
        // Reset the position when it reaches the end
        if (Math.abs(value) >= items.length * 200) {
          return 0;
        }
        return value;
      }
    }
  });
}
// if (document.querySelector(".blog-comp")) {
//   var blog = document.querySelector(".blog-comp");
//   var blogItems = document.querySelectorAll(".blog-comp > div");
//   var itemWidth = window.innerWidth >= 768 ? 29 : 17.75;
//   let intial = 0
//   let keyframes = []
//   var tl = new TimelineMax();
//   blogItems.forEach((item, k) => {
//     var tl = new TimelineMax({delay:k*2});
//     keyframes.push({
//       x: -itemWidth+"rem",
//       duration: 2,
//       ease: "power4.inOut",
//       scrollTrigger: {
//         trigger: item,
//         start: "top 80%",
//         end: "bottom 80%",
//         scrub: false,
//         markers: false,
//       },
//     });

//    itemWidth += itemWidth;
//   });
//   tl.to(
//   blog,
//     keyframes
//  );
//  }