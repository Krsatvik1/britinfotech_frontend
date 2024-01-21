
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
    nav.classList.toggle("showNav")
  }

  if (layer1 && h1) {
    function setLayerHeight() {
      layer1.style.height = "calc(" + h1.offsetHeight + "px - 2rem)";
    }

    setLayerHeight(); // Set initial height
    window.addEventListener("resize", setLayerHeight);
  }
  let observerClass = (entries, className, intersectionRatio = 0.25) => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: intersectionRatio,
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (
          entry.isIntersecting
        ) {
          console.log(className);
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(entries);
  };
  if (document.querySelector(".card-animation-1")) {
    document.querySelectorAll(".card-animation-1 > a").forEach((card) => {
      observerClass(card, "animate", 0.5);
    });
  }
  if (document.querySelector(".choose-us")) {
    observerClass(document.querySelector(".slider-1"), "slider-reveal", 0.5);
    observerClass(document.querySelector(".slider-2"), "slider-reveal", 0.5);
    observerClass(document.querySelector(".slider-3"), "slider-reveal", 0.5);
    document.querySelectorAll(".choose-us > div").forEach((card) => {
      observerClass(card, "swiper-slide", 0.5);
    });
  }
  if (document.querySelector(".shadow-animate")) {
    observerClass(document.querySelector(".shadow-animate"), "md:shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)_inset]", 0.5);
    observerClass(document.querySelector(".shadow-animate"), "shadow-[0px_3.035px_9.105px_0px_rgba(0,0,0,0.25)_inset]", 0.5);
  }
  if (document.querySelector(".blog")) {
    
  }