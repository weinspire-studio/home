// jshint esversion: 6

import * as mobileModule from "./sub_modules/mobile";
import * as desktopModule from "./sub_modules/desktop";
import * as swiperModule from "./sub_modules/swiper";
import * as jQueryModule from "./sub_modules/jquery";
import * as contactModule from "./sub_modules/contact";
import debounce from "lodash/debounce";
import "./sub_modules/classList";
// import svg4everybody from "./sub_modules/svg4everybody";
// svg4everybody({ polyfill: true });

// polyfill forEach IE11.
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

//VARIABLES
const navBar = document.getElementById("section-navbar");
const navWhiteBack = document.querySelector(".navigation-white-back");
const navShadow = document.querySelector(".navigation-shadow");
const notMobileScreenMQ = window.matchMedia("(min-width: 801px)");
let swiper;
let hasScrollListenerMobile = false;
let hasScrollListenerDesktop = false;
let debouncedNavDesktop;
let debouncedNavMobile;

//FUNCTIONS INVOCATIONS
init();
initOnWidthChange();
jQueryModule.smoothScroll();
contactModule.validateContactForm();
contactModule.submitContactForm();

//FUNCTIONS DEFINITIONS
//on pageload, executes the following code, depending on screen width.
function init() {
  if (notMobileScreenMQ.matches) {
    desktopCode();
  } else {
    mobileCode();
  }
}

// adds listener that executes when screen width changes (passing by 801px).
function initOnWidthChange() {
  notMobileScreenMQ.addListener(() => {
    if (notMobileScreenMQ.matches) {
      desktopCode();
    } else {
      mobileCode();
    }
  });
}

//code that executes only in desktop and large tablets screens (> 801px).
function desktopCode() {
  addClassesToSvgs(false);
  styleNavOnScroll(false);
  desktopModule.styleAnchorOnHover();
  jQueryModule.animateImages();
  debouncedNavDesktop = debounce(styleNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener("scroll", debouncedNavDesktop.bind(null, false));
  hasScrollListenerDesktop = true;
  if (hasScrollListenerMobile === true) {
    desktopModule.restoreDesktopNav();
    window.removeEventListener("scroll", debouncedNavMobile);
    hasScrollListenerMobile = false;
  }
  if (swiper && swiper.params.init === true) {
    swiper.destroy();
  }
}

//code that executes only in phones and small tablets screens (< 801px).
function mobileCode() {
  addClassesToSvgs();
  styleNavOnScroll();
  mobileModule.styleMobileNav();
  jQueryModule.unbindImages();
  mobileModule.initSwiper();
  debouncedNavMobile = debounce(styleNavOnScroll, 200, {
    leading: true,
    trailing: true,
  });
  window.addEventListener("scroll", debouncedNavMobile);
  hasScrollListenerMobile = true;
  if (hasScrollListenerDesktop === true) {
    window.removeEventListener("scroll", debouncedNavDesktop);
    hasScrollListenerDesktop = false;
  }
  swiper = swiperModule.defineSwiper();
  swiper.on("init", function () {
    swiper.params.init = true;
  });
  swiper.init();
}

//adds or removes classes in order to give white styles to the nav.
function styleNavOnScroll(isMobile = true) {
  let scrolledY = window.pageYOffset;
  if (scrolledY > 0) {
    if (isMobile) {
      mobileModule.styleMobileBrand();
    } else {
      desktopModule.styleDesktopBrand();
    }
    navBar.classList.add("nav-white");
    navWhiteBack.classList.add("nav-white-back");
    navShadow.classList.add("nav-shadow");
  } else {
    if (isMobile) {
      mobileModule.restoreMobileBrand();
    } else {
      desktopModule.restoreDesktopBrand();
    }
    navBar.classList.remove("nav-white");
    navWhiteBack.classList.remove("nav-white-back");
    navShadow.classList.remove("nav-shadow");
  }
}

function addClassesToSvgs(isMobile = true) {
  if (isMobile) {
    mobileModule.setMobileBrand();
    desktopModule.unsetDesktopBrand();
  } else {
    desktopModule.setDesktopBrand();
    mobileModule.unsetMobileBrand();
  }
}

export { navBar, debounce };

//
//
// -----------------
// $("#section-projects-design ul").slick({
//   slide: "li"
// });

// $("#section-projects-design ul").slick({
//   autoplay: true,
//   autoplaySpeed: 2000,
//   fade: true,
//   arrows: false
// });

// Plain JS way (projects-design).
// const list = document.querySelectorAll("#section-projects-design li");
// // console.log(list);
// list.forEach(l => {
//   l.addEventListener("mouseover", expand);
//   l.addEventListener("mouseleave", contract);
// });

// list[0].addEventListener("mouseover", () => {
//   console.log("expandedasd");
// });

// function expand() {
//   if (this.nextElementSibling !== null) {
//     this.classList.remove("contracted");
//     this.classList.add("expanded");
//     this.lastElementChild.classList.add("show-caption");
//     let siblings = getAllSiblings(this, this.parentElement);
//     siblings.forEach(el => {
//       el.classList.remove("expanded");
//       el.classList.add("contracted");
//     });
//   }
// }

// function contract() {
//   this.classList.remove("expanded");
//   this.lastElementChild.classList.remove("show-caption");
//   let siblings = getAllSiblings(this, this.parentElement);
//   siblings.forEach(el => {
//     el.classList.remove("contracted");
//   });
// }

// function getAllSiblings(element, parent) {
//   const children = [...parent.children];
//   children.length = 5;
//   return children.filter(child => child !== element);
// }

//// /////////// /////
// changes the href of a navLink depending on whether the site is in home or in another page.
// const anchorHome = document.querySelector(".nav-home");
// const anchorContact = document.querySelector(".nav-contact");

// console.log(anchorHome);
// console.log(window.location.href);
// console.log(anchorHome.href);

// if (
//   window.location.href === "https://weinspire-studio.github.io/home" ||
//   window.location.href === "https://weinspire-studio.github.io/home/"
// ) {
//   anchorHome.href = "/home/#home";
//   console.log("home");
// }

// function styleDesktopNav() {
// let scro = siteWrapper.scrollHeight;
// console.log("height" + scro);
// console.log(window.innerHeight);
// let scrolledY = siteWrapper.scrollTop;
// console.log(scrolledY);
// }

// svg styling! used another approach, jic!
// let x = getComputedStyle(document.documentElement);
// let y = x.getPropertyValue("--color-1");

// let asd = document.querySelector("#brand-mobile-svg");
// console.log(asd.firstElementChild);

// let sheet = document.styleSheets[0];
// console.log(sheet);
// let classes = sheet.rules || sheet.cssRules;
// console.log(classes[23]);

// TODO:
// shadows
// Logos and svg background (bottom on mobile)
// when navbar mobile opens, click everywhere to close it.
// see navbar classes on burger click (specially on iphone)
// social network in navbar?
// navbar mobile open bug (z-index) DONE
// bug in navbar when page reloads in desktop? (see nav-white and nav-no-border classes) DONE
// burger ontap mobile! (see iphone, selection square)
// accesibility svg titles - svg sprite
// inline svg catched?! see css tricks tutorial
// page loader!!
// dynamic text! See youtube programming video!!
// bugs: button focus blue (in chrome),
// green inputs after submit DONE
// in projects-design: if image stretches more than image witdh: repeat: round or size cover
// lazy - loading!
//download swipper only on mobile? conditional script
// caption background color switched (projects-design)
// on select input from contact form BUG! iphone extra swipe
// es modules! bundles!
// svg grunt!
// transpilation, es6 sourcemap
// source map debuggin? just for dev!
// babel vs babelify? Modules? jquery modules? swiper?
// content link ?
// mousedown touch start?
//auto prefixer: prefix animations? maybe extend sass or something? Each keyframe with different prefix!
// bug in height 100% on iphone? check on the net (maybe min height in pixels?) (caption due to img from unsplash)

// outline on burger div?

// scroll anchoring onwidthchange init?
// test foreach in win 11, and other compatibility issues.

// swiper on safari mac
// inline css repeated

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// html {
//   @include font-size-map($document-font-size);
//   // overflow-x: auto;
//   // overflow-y: visible;
//   // min-height: 100%;
// }

// html, body, #site-wrapper {
//   height: 100%;
// }

// html, body {
//   overflow-y: visible;
//   overflow-x: hidden;
//   // overflow-y: scroll;
//   // z-index: -10;
// }

// body {
//   font-family: "Montserrat", sans-serif;
//   font-weight: 400;
//   background-color: $background-light;
//   // overflow-x: auto;
//   // overflow-y: visible;
//   // min-height: 100%;
// }

// #site-wrapper {
//   // overflow-x: hidden;
//   position: relative;
//   transition: background-color .5s ease;
// }

// h1, h2, h3, h4, h5 {
//   font-weight: 500;
// }

// #section-services {
//   min-height: 150%;
//   // background-color: lightcyan;
// }

// #section-contact {
//   margin-top: 10%;
//   min-height: 100%;
// }

// //Style Classes
// // .menu-open-i {
// //     overflow-y: hidden;
// // }

// .section-low {
//   z-index: -1;
//   position: relative;
// }

// .site-overlay {
//   position: fixed;
//   height: 100%;
//   width: 100%;
//   background-color: $black-opacity;
//   z-index: 0;
//   opacity: 0;
//   transition: opacity .5s ease, z-index .5s ease;
// }

// .overlay-active {
//   z-index: 2;
//   opacity: 1;
// }

// .body-fixed {
//   // overflow: hidden;
// }
// .html-fixed {
//   overflow-x: hidden;
// }
