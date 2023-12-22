"use strict";

function updateCurvedText(curvedText, radius, curvedText2) {
  curvedText.style.minWidth = "initial";
  curvedText.style.minHeight = "initial";
  var w = curvedText.clientWidth,
    h = curvedText.clientHeight;
  curvedText.style.minWidth = w + "px";
  curvedText.style.minHeight = h + "px";
  var text = curvedText.textContent;
  var html = "";
  Array.from(text).forEach(function (letter) {
    html += "<span>".concat(letter, "</span>");
  });
  curvedText.innerHTML = html;
  var letters = curvedText.querySelectorAll("span");
  letters.forEach(function (letter) {
    letter.style.position = "absolute";
    letter.style.height = "".concat(radius, "px");
    letter.style.transformOrigin = "bottom center";
  });
  var circleLength = 2 * Math.PI * radius;
  var angleRad = w / (2 * radius);
  var angle = 2 * angleRad * 180 / Math.PI / text.length;
  letters.forEach(function (el, idx) {
    el.style.transform = "translate(".concat(w / 2, "px,0px) rotate(").concat(idx * angle - text.length * angle / 2, "deg)");
  });
  curvedText2.style.minWidth = "initial";
  curvedText2.style.minHeight = "initial";
  var w2 = curvedText2.clientWidth,
    h2 = curvedText2.clientHeight;
  curvedText2.style.minWidth = w2 + "px";
  curvedText2.style.minHeight = h2 + "px";
  var text2 = curvedText2.textContent;
  var html2 = "";
  Array.from(text2).forEach(function (letter) {
    html2 += "<span>".concat(letter, "</span>");
  });
  curvedText2.innerHTML = html2;
  var letters2 = curvedText2.querySelectorAll("span");
  letters2.forEach(function (letter) {
    letter.style.position = "absolute";
    letter.style.height = "".concat(radius, "px");
    letter.style.transformOrigin = "top center";
  });
  var circleLength2 = 2 * Math.PI * radius;
  var angleRad2 = w2 / (2 * radius);
  var angle2 = 2 * angleRad2 * 180 / Math.PI / text2.length;
  letters2.forEach(function (el, idx) {
    el.style.transform = "translate(".concat(w2 / 2, "px,0px) rotate(").concat(idx * angle2 - text2.length * angle2 / 2, "deg)");
  });
}
var curvedText = document.querySelector(".curved-text");
var curvedText2 = document.querySelector(".curved-text-2");
var radius = 80;
updateCurvedText(curvedText, radius, curvedText2);