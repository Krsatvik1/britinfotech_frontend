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
  function setLayerHeight() {
    layer1.style.height = "calc(" + h1.offsetHeight + "px - 2rem)";
  }

  setLayerHeight(); // Set initial height
  window.addEventListener("resize", setLayerHeight);
}
let observerClass = (
  entries,
  styleArray,
  repeat = false,
  scroll = false
) => {
  let options = {
    root: null,
    rootMargin: "0px",
    trackVisibility: scroll,
    delay:100
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        let style = entry.target.style
        let visibility = entry.intersectionRatio * 100
        styleArray.forEach(e => {
          
          let mappedValue = ((visibility - 0) / (100 - e.min)) * (e.max - e.min) + e.min;
          let newValue
          if(scroll && !e.direction){
            newValue = mappedValue 
          }
          else if (scroll && e.direction) {
            newValue =e.direction - mappedValue
          } else {
           
            newValue = "'" + e.max + e.unit + "'"
          }
          if (e.matrix){
            style[e.styleName] = e.matrix+"("+newValue+ e.unit+")"
          }else{
            style[e.styleName] = newValue
          }
          
          console.log(e.matrix+"("+newValue+")")
        });
        if (entry.intersectionRatio >= 1 && !repeat) {
         
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);
  observer.observe(entries);
};
if (document.querySelector(".card-animation-1")) {
  document.querySelectorAll(".card-animation-1 > a").forEach((card) => {
    observerClass(card,[{styleName:"transform",max:100,min:0,unit:"%", direction:100, matrix:"translateY" },{styleName:"opacity", max:1 , min:0 , unit:"", direction:0, matrix:0}] , true , true);
  });
}
// if (document.querySelector(".choose-us")) {
//   observerClass(document.querySelector(".slider-1"), "slider-reveal", 0.5);
//   observerClass(document.querySelector(".slider-2"), "slider-reveal", 0.5);
//   observerClass(document.querySelector(".slider-3"), "slider-reveal", 0.5);
//   document.querySelectorAll(".choose-us > div").forEach((card) => {
//     observerClass(card, "swiper-slide", 0.5);
//   });
// }
// if (document.querySelector(".shadow-animate")) {
//   observerClass(
//     document.querySelector(".shadow-animate"),
//     "md:shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)_inset]",
//     0.5
//   );
//   observerClass(
//     document.querySelector(".shadow-animate"),
//     "shadow-[0px_3.035px_9.105px_0px_rgba(0,0,0,0.25)_inset]",
//     0.5
//   );
// }
// if (document.querySelector(".blog")) {
// }
