gsap.registerPlugin(ScrollTrigger);

// you only need to define the configuration settings you want to CHANGE. Omitted properties won't be affected.
gsap.config({
     autoSleep: 60,
     force3D: false,
     nullTargetWarn: false,
     trialWarn: false,
     units: {
          left: "%",
          top: "%",
          rotation: "rad",
     },
});

document.addEventListener("keydown", function (e) {
     if (e.ctrlKey &&
         (e.keyCode == "61" ||
             e.keyCode == "107" ||
             e.keyCode == "173" ||
             e.keyCode == "109" ||
             e.keyCode == "187" ||
             e.keyCode == "189")
     ) {
         e.preventDefault();
     }
 });
 document.addEventListener(
     "wheel",
     function (e) {
         if (e.ctrlKey) {
             e.preventDefault();
         }
     }, {
         passive: false
     }
 );
 



window.history.scrollRestoration = "manual";
ScrollTrigger.clearScrollMemory("manual");

const selectAll = (e) => document.querySelectorAll(e);


$(window).on('load', function () {
     setTimeout(function () { // allowing 3 secs to fade out loader
          $('.page-loaderhome').fadeOut('slow');
     });
});
$(window).on('load', function () {
     setTimeout(function () { // allowing 3 secs to fade out loader
          $('.page-loader').fadeOut('slow');
     });
});
window.onload = function () {
     initSmoothScroll();
     initPreloader();
     initHeroLoader();
     
     // aboutAnimation();
     //   initProgramPage();
     initNavbarFixedTop();
     initNavbarResponsive();


     initscrollFisrt();
     // create
     let mm = gsap.matchMedia();

     // add a media query. When it matches, the associated function will run
     mm.add("(min-width: 1024px)", () => {
          initsecondAnime();
     });
     initParallaxImage();
     initLazyLoad();
     initbutton();
     initParallaxVideo();
     initScrolltriggerNav();
     initonscrolltrigger()
};
initplyrseeVideo();


/**
 * Scrolltrigger Scroll Check
 */
function initScrolltriggerNav() {
     ScrollTrigger.create({
          start: "top -30%",
          scroller: ".smooth-scroll",
          onUpdate: (self) => {
               $("body").addClass("scrolled");
          },
          onLeaveBack: () => {
               $("body").removeClass("scrolled");
          },
     });
}

// Navbar button
function initbutton() {
     document.querySelector(".button").onmousemove = function (e) {
          var x = e.pageX - e.target.offsetLeft;
          var y = e.pageY - e.target.offsetTop;

          e.target.style.setProperty("--x", x + "px");
          e.target.style.setProperty("--y", y + "px");
     };
     var th1 = gsap.timeline({
          repeat: -1,
     });
     th1.to(".title_section", 30, {
          backgroundPosition: "-960px 0",
     });
}

//Parallax Scrolling Image
function initParallaxImage() {
     let getRatio = (el) =>
          window.innerHeight / (window.innerHeight + el.offsetHeight);

     gsap.utils.toArray("section").forEach((section, i) => {
          section.bg = section.querySelector(".bg");

          // Give the backgrounds some random images
          //   section.bg.style.backgroundImage = `url(./assets/images/parallax-educraft.jpg)`;

          // the first image (i === 0) should be handled differently because it should start at the very top.
          // use function-based values in order to keep things responsive
          gsap.fromTo(
               section.bg, {
                    backgroundPosition: () =>
                         i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
               }, {
                    backgroundPosition: () =>
                         `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                         trigger: section,
                         start: () => (i ? "top bottom" : "top top"),
                         end: "bottom top",
                         scroller: ".smooth-scroll",
                         scrub: true,
                         invalidateOnRefresh: true, // to make it responsive
                    },
               }
          );
     });
}

function initParallaxVideo() {
     // Parallax Video
     // JavaScript
     // Initialize GSAP timeline
     const parallaxtl = gsap.timeline({});

     // Calculate the scroll range for parallax effect
     const scrollRange =
          document.querySelector(".parallax-container").offsetHeight -
          window.innerHeight;

     // Scroll event handler
     function parallaxScroll() {
          const scrollTop = window.offsetTop || document.documentElement.scrollTop;

          // Calculate the parallax effect for the video position
          const videoPosition = (scrollTop / scrollRange) * 100;

          // Update the video position using GSAP
          parallaxtl.to(".parallax-video", {
               y: -videoPosition + "%",
          });
     }

     // Register the scroll event listener
     window.addEventListener("scroll", parallaxScroll);
}

function initNavbarResponsive() {
     // console.clear();
     var t1 = gsap.timeline({
          paused: true,
     });

     // t1.to(".one", 0.5, {
     //     y: 6,
     //     rotation: 45,
     //     ease: Expo.easeInOut,
     // });
     // t1.to(".two", 0.5, {
     //     y: -6,
     //     rotation: -45,
     //     ease: Expo.easeInOut,
     //     delay: -0.5,
     // });

     t1.to(".menu-mobile", 0.9, {
          top: "0%",
          ease: Expo.easeInOut,
          // delay: -0.2,
     });
     //     t1.to(".title-menu", {
     //           top: "0%",
     //           ease: Expo.easeInOut,
     //           delay: -0.5,
     //      }, 1.5);

     t1.staggerFrom(
          ".menu-mobile .anime-menu",
          0.75, {
               x: -30,
               opacity: 0,
               ease: Expo.easeOut,
               delay: -0.5,
          },
          0.1
     );

     // t1.to(".menu-mobile", {
     //      top: "0%",
     //      ease: Expo.easeInOut,
     //      delay: -0.5,
     // }, 1.5);

     // t1.from(
     //      ".menu-mobile ul li", {
     //           x: -30,
     //           opacity: 0,
     //           ease: Expo.easeOut,
     //           stagger: 0.1
     //      },
     //      0.75
     // );
     let isOpen = false;
     t1.reverse();

     $(document).on("click", ".menu-mobile a", function () {
          t1.reversed(!t1.reversed());
     });
     const toggle = document.querySelector(".navbar-toggle");
     toggle.onclick = function () {
          if (isOpen) {
               this.classList.remove("active");
               t1.reversed(!t1.reversed());
          } else {
               this.classList.add("active");
               t1.reversed(!t1.reversed());
          }
          isOpen = !isOpen;
     };
}

function initNavbarFixedTop() {
     var scrollUp = document.querySelector(".navbar");

     ScrollTrigger.create({
          start: "top -50",
          end: 99999,
          scroller: ".smooth-scroll",
          // markers: true,
          toggleClass: {
               className: "navbar--scrolled",
               targets: ".navbar",
          },
     });

     ScrollTrigger.create({
          start: "top -300",
          end: 99999,
          scroller: ".smooth-scroll",
          toggleClass: {
               className: "navbar--up",
               targets: ".navbar",
          },
          onUpdate: ({
               direction
          }) => {
               if (direction == -1) {
                    scrollUp.classList.remove("navbar--up");
               } else {
                    scrollUp.classList.add("navbar--up");
               }
          },
     });

     const elem = document.querySelectorAll(".navbar");
}

/**
 * Lazy Load
 */
function initLazyLoad() {
     // https://github.com/locomotivemtl/locomotive-scroll/issues/225
     // https://github.com/verlok/vanilla-lazyload
     var lazyLoadInstance = new LazyLoad({
          elements_selector: ".lazy",
     });
}

function initSmoothScroll() {
     const locoScroll = new LocomotiveScroll({
          el: document.querySelector(".smooth-scroll"),
          smooth: true,
          // mobile: {
          //      breakpoint: 0,
          //      smooth: false,
          //      // inertia: 0.8,
          //      // getDirection: true,
          // },
          // tablet: {
          //      breakpoint: 0,
          //      smooth: true,
          //      // inertia: 0.8,
          //      // getDirection: true,
          // },
     });
     // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
     locoScroll.on("scroll", ScrollTrigger.update);

     // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
     ScrollTrigger.scrollerProxy(".smooth-scroll", {
          scrollTop(value) {
               return arguments.length ?
                    locoScroll.scrollTo(value, 0, 0) :
                    locoScroll.scroll.instance.scroll.y;
          }, // we don't have to define a scrollLeft because we're only scrolling vertically.
          getBoundingClientRect() {
               return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
               };
          },
          // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
          pinType: document.querySelector(".smooth-scroll").style.transform ?
               "transform" : "fixed",
     });

     ScrollTrigger.defaults({
          scroller: ".smooth-scroll",
     });

     /**
      * Remove Old Locomotive Scrollbar
      */

     const scrollbar = selectAll(".c-scrollbar");

     if (scrollbar.length > 1) {
          scrollbar[0].remove();
     }

     // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

     // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
     ScrollTrigger.refresh();
}

function initscrollFisrt() {
     var largeTL = gsap.timeline({
          scrollTrigger: {
               trigger: ".start-trig",
               pin: ".bg_scroller",
               scroller: ".smooth-scroll",
               pinSpacing: false,
               start: "top top",
               // markers: true,
               //end: '+=200%',
               end: "+=400%", // two more sections so 2*100% more here
          },
     });
}

function initsecondAnime() {
     let videoElem = document.querySelector(".video-ux-design");
     // let src = videoElem.currentSrc || videoElem.src;

     // once(document.documentElement, "touchstart", function () {

     //           videoElem.play(), videoElem.pause();
     //      }),
     //      ScrollTrigger.create({
     //           trigger: videoElem,
     //           start: "top 70%",
     //           end: "bottom",
     //           // scroller: ".smooth-scroll",
     //           // markers: !0,
     //           onEnter: () => videoElem.play(),
     //           onEnterBack: () => videoElem.play(),
     //           onLeave: () => videoElem.pause(),
     //           onLeaveBack: () => videoElem.pause()
     //      });
     //videoElem.play();
     let video_timeline = gsap.timeline({
          scrollTrigger: {
               trigger: ".section_5",
               start: "top top",
               scroller: ".smooth-scroll",
               // markers: !0,
               scrub: !0,
               pin: !0,
               // end: '+=400%',
               toggleClass: "acceso",
          },

          // scrollTrigger: {
          //      trigger: ".start-trig",
          //      pin: ".bg_scroller",
          //      scroller: ".smooth-scroll",
          //      pinSpacing: false,
          //      start: "top top",
          //      // markers: true,
          //      //end: '+=200%',
          //      end: '+=400%', // two more sections so 2*100% more here
          // },
     });
     video_timeline
          .fromTo(
               ".macbook-display", {
                    backgroundColor: "transparent",
                    outline: "none",
               }, {
                    backgroundColor: "#373435",
                    duration: 5,
                    outline: ".5px solid #fff",
                    delay: 10,
               }
          )

          .to(".eduportal", {
               opacity: 0,
               duration: 1000,
               // delay: 0
          })

          .fromTo(
               ".css-macbook", {
                    scale: 2.8,
               }, {
                    scale: 0.7,
                    duration: 9000,
                    // delay: 1
               }
          )
          .fromTo(
               ".pa-hero-bg-overlay", {
                    opacity: 1,
               }, {
                    opacity: 0,
                    duration: 3000,
                    delay: -5000,
               }
          )
          // .fromTo(
          //      ".mobile_screen_postion", {
          //           opacity: 0,
          //      }, {
          //           duration: 5000,
          //           delay: -5000,
          //           opacity: 1,

          //      }
          // )
          .fromTo(
               ".lptitle_span", {
                    opacity: 0,
                    // stagger: 0.5,
                    y: 100,
               }, {
                    duration: 4000,
                    opacity: 1,
                    stagger: 4000,
                    delay: -4500,
                    y: 0,
               }
          )
          .fromTo(
               ".video-ux-design", {
                    height: "100%",
                    objectFit: "cover",
               }, {
                    height: "-webkit-fill-available",
                    duration: 5,
               }
          )
          .fromTo(
               ".macbook-screen", {
                    backgroundColor: "transparent",
               }, {
                    backgroundColor: "#4b4b4d",
                    duration: 2,
                    // delay: 5
               }
          );
     let video_tl = gsap.timeline({
          defaults: {
               duration: 3,
          },
          scrollTrigger: {
               trigger: videoElem,
               start: "center center",
               end: "+=8000",
               // scroller: ".smooth-scroll",
               scrub: !0,
          },
     });
     // once(videoElem, "loadedmetadata", () => {
     //           video_tl.fromTo(
     //                videoElem, {
     //                     currentTime: 0.01
     //                }, {
     //                     currentTime: videoElem.duration || 1
     //                }
     //           );
     //      }),
     //      setTimeout(function () {
     //           window.fetch &&
     //                fetch(src)
     //                .then((a) => a.blob())
     //                .then((a) => {
     //                     let b = URL.createObjectURL(a),
     //                          c = videoElem.currentTime;
     //                     once(document.documentElement, "touchstart", function () {
     //                               videoElem.play(), videoElem.pause();
     //                          }),
     //                          videoElem.setAttribute("src", b),
     //                          (videoElem.currentTime = c + 0.01);
     //                });
     //      }, 1e3);
}

function once(a, b, c, d) {
     var e = function () {
          a.removeEventListener(b, e), c.apply(this, arguments);
     };
     return a.addEventListener(b, e, d), e;
}

function initPreloader() {
     const tl = gsap
          .timeline

     // {
     //      paused: true,
     //      onUpdate: progressUpdate,
     //      onComplete: loadComplete
     // }
     ();

     tl.to("body", {
               overflow: "hidden",
          })
          .to(".preloader .text-container", {
               duration: 0,
               opacity: 1,
               ease: "Power3.easeOut",
          })
          .from(".preloader .text-container svg", {
               duration: 2.7,
               delay: 1,
               // y: 70,
               // skewY: 10,
               // stagger: 0.4,
               ease: "Power3.easeOut",
          })
          .to(".preloader", {
               duration: 1,
               height: "0vh",
               ease: "expo.inOut",
          })
          .to(
               "body", {
                    overflow: "auto",
               },
               "-=2"
          )
          .to(".preloader", {
               display: "none",
          });
}

function initplyrseeVideo() {
     let buttons;
     let lightbox = document.querySelector(".lightbox");
     let player;

     const showLightbox = () => {
          buttons = document.querySelectorAll(".btn_see_video");
          buttons.forEach((button) => {
               button.addEventListener("click", () => {
                    lightbox.style.display = "block";
                    // document.querySelector('#player iframe').src = 'https://player.vimeo.com/video/' + button.dataset.link;
                    player = new Plyr("#player");
                    player.play();
               });
          });
     };

     const closeLightbox = () => {
          lightbox.addEventListener("click", function (e) {
               if (e.target !== this) return;
               document.querySelector(".lightbox").style.display = "none";
               player.destroy();
          });
     };

     document.addEventListener("DOMContentLoaded", () => {
          // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.

          // Expose
          window.player = player;

          // Bind event listener
          function on(selector, type, callback) {
               document.querySelector(selector).addEventListener(type, callback, false);
          }
          showLightbox();
          closeLightbox();
     });
}

function aboutAnimation() {
     let reveal = document.querySelectorAll(".section_wrapper_1");

     reveal.forEach((el) => {
          let headings = el.querySelectorAll(".animate-element1");
          let p = el.querySelectorAll("p");

          let tl = gsap
               .timeline()
               .from(headings, {
                    y: 50,
                    // stagger: 0.05,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 3.5,
               })
               .from(
                    ".main_about_img", {
                         y: 100,
                         // stagger: 0.05,
                         opacity: 0,
                         duration: 1.5,
                         // delay:-0.5,
                         ease: "power3.out",
                    },
                    "-=0.6"
               );

          // ScrollTrigger.create({
          //      trigger: el,
          //      start: "top 100%",
          //      end: "top 0%",
          //      // markers: true,
          //      toggleActions: "play none none none ",
          //      animation: tl
          // })
     });

     initTricksWords();
     initonscrolltrigger();
}

function initProgramPage(params) {
     initheaderAnime();

     initparaAnime();
}

function initTricksWords() {
     // Copyright start
     // © Code by T.RICKS, https://www.tricksdesign.com/
     // You have the license to use this code in your projects but not redistribute it to others
     // Tutorial: https://www.youtube.com/watch?v=xiAqTu4l3-g&ab_channel=TimothyRicks

     // Find all text with .tricks class and break each letter into a span
     var spanWord = document.getElementsByClassName("span-lines");
     for (var i = 0; i < spanWord.length; i++) {
          var wordWrap = spanWord.item(i);
          wordWrap.innerHTML = wordWrap.innerHTML.replace(
               /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
               '$1<span class="span-line"><span class="span-line-inner">$2</span></span>'
          );
     }
}

function makeWrapper(lines, elClass) {
     lines.forEach((line) => {
          const lineEl = document.createElement("div");
          lineEl.classList = elClass;
          line.parentNode.appendChild(lineEl);
          lineEl.appendChild(line);
     });
};

function initonscrolltrigger() {
     // create
     let mm = gsap.matchMedia();


     // add a media query. When it matches, the associated function will run
     mm.add("(min-width: 1024px)", () => {
          const scrollElement = document.querySelectorAll(".video_scroll_section");
          scrollElement.forEach((scrollElement) => {
               gsap.to(scrollElement, {
                    maxWidth: "100%", // Increase the width to 100%
                    // duration: 10,
                    scrollTrigger: {
                         trigger: scrollElement,
                         start: "top 90%", // Animation starts when the element is 80% from the top of the viewport
                         // end: '+=200%',
                         end: "+=100%", // Animation ends when the element is 20% from the top of the viewport
                         scrub: true, // Smoothly animate between start and end values
                         onUpdate: (self) => {
                              // console.log("Scrolled");
                              // console.log("Progress: ", self.progress.toFixed(2));
                         },
                    },
               });
          });
     });

     if (document.querySelectorAll(".hh")) {
          var childSplit = new SplitText(".hh", {
               type: "lines",
               linesClass: "split-child",
          });
          childSplit.lines.forEach((line) => {
               let tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: line,
                         toggleActions: "play none none reset",
                         start: "top 100%",
                         end: "top 0%",
                         // markers:!0,
                    },
               });
               tl.from(line, {
                    duration: 1,
                    yPercent: 100,
                    ease: "power3.out",
                    stagger: 0.1,
               });
          });
     }

     if (document.querySelectorAll(".ap")) {
          const splitLines = new SplitText(".ap", {
               type: "lines,words",
               linesClass: "line",
          });
          const lines = splitLines.words;



          // makeWrapper(lines, "lines");

          lines.forEach((pline) => {
               let tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: pline,
                         toggleActions: "play none none reset",
                         start: "top 100%",
                         end: "top 0%",
                         // markers:!0,
                    },
               });
               tl.from(
                    pline, {
                         duration: 1,
                         opacity: 0,
                         y: "150%",
                         rotate: 5,
                         transformOrigin: "0% 50% -50",
                         ease: "expo",
                         stagger: 0.1,
                         // delay: 0.5
                         // repeat: -1
                    },
                    0.3
               );
          });
     }



     if (document.querySelectorAll(".img_appear")) {
          // Assuming you have an array of elements with class "element"
          const img_appear = document.querySelectorAll(".img_appear");

          // Create a timeline for each element
          img_appear.forEach((element) => {
               const timeline = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                         trigger: element,
                         toggleActions: "play none none reset",
                         start: "top 100%",
                         end: "top 0%",
                    },
               });

               // Add animations to the timeline
               timeline.fromTo(
                    element, {
                         scale: 0.8,
                         // duration: 1,
                         opacity: 0,
                    }, {
                         scale: 1,
                         opacity: 1,
                         duration: 0.8,
                    }
               );

          });
     }
     if (document.querySelectorAll(".animate-btns")) {
          // Assuming you have an array of elements with class "element"
          const animatebtns = document.querySelectorAll(".animate-btns");
  
          // Create a timeline for each element
          animatebtns.forEach((element) => {
              const timeline = gsap.timeline({
                  paused: true,
                  scrollTrigger: {
                      trigger: element,
                      toggleActions: "play none none reset",
                      start: "top 100%",
                      end: "top 0%",
                      stagger: {
                          amount: 0.3,
                      },
                  },
              });
  
              // Add animations to the timeline
              timeline.fromTo(
                  element, {
                      xPercent: 50,
                      duration: 1,
                      opacity: 0,
                  }, {
                      xPercent: 0,
                      opacity: 1,
                      duration: 1,
                  }
              );
          });
      }
     if (document.querySelectorAll(".animateystg")) {
          // Assuming you have an array of elements with class "element"
          const animateystg = document.querySelectorAll(".animateystg");

          // Create a timeline for each element
          animateystg.forEach((element) => {
               const timeline = gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                         trigger: element,
                         toggleActions: "play none none reset",
                         start: "top 100%",
                         end: "top 0%",
                         stagger: {
                              amount: 0.3,
                         },
                    },
               });

               // Add animations to the timeline
               timeline.fromTo(
                    element, {
                         yPercent: 100,
                         duration: 1,
                         opacity: 0,
                    }, {
                         yPercent: 0,
                         opacity: 1,
                         duration: 1,
                    }
               );
          });
     }


}


function initHeroLoader() {
     var childSplit = new SplitText(".hh-hero", {
          type: "lines",
          linesClass: "split-child",
     });
     var childSplitp = new SplitText(".ap-hero", {
          type: "words,chars",
          charsClass: "char",
          wordsClass: "word++"
     });
     const tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
               trigger: ".landing_wrapper",
               // toggleActions: "play none none reset",
               // start: "top 100%",
               // end: "top 0%",
               // stagger: {
               //      amount: 0.3,
               // },
          },
     });

     // Add animations to the timeline
     tl.fromTo(
          ".navbar", {
               yPercent: -50,
               // duration: 1,
               opacity: 0,
          }, {
               yPercent: 0,
               opacity: 1,
               // immediateRender: true,
               duration: 0.8,
               delay: 4.3
          }
     );
     tl.fromTo(
          ".bg_student img", {
               scale: 0.6,
               // duration: 0.8,
               opacity: 0,
          }, {
               scale: 1,
               opacity: 1,
               duration: 0.8,
          }
     );

     tl.fromTo(".other_particles img", {
          opacity: 0,
          rotate: -80,
     }, {
          opacity: 1,
          rotate: 0,
          // immediateRender: true,
          duration: 0.8,
          delay: -0.5,
     });

     childSplit.lines.forEach((line) => {
          tl.from(line, {
               duration: 0.8,
               yPercent: 200,
               ease: "power3.out",
               stagger: 0.1,
               delay: -0.7,
          });
     });
     childSplitp.words.forEach((words) => {
          tl.from(words, {
               duration: 0.7,
               yPercent: 200,
               ease: "power3.out",
               stagger: 0.1,
               delay: -0.7,
          });
     });
     tl.fromTo(".hero-btn a", {
          opacity: 0,
          xPercent: -50,
     }, {
          xPercent: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.2,
          // immediateRender: true,
          duration: 0.8,
          delay: -0.6,
     });
     tl.fromTo(".Associated", {
          opacity: 0,
     }, {

          opacity: 1,
          ease: "power3.out",
          immediateRender: true,
          duration: 0.8,
          delay: -0.7,
     });
}