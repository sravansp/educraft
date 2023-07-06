
let section = document.getElementsByClassName("section_3");
const boxes = document.querySelectorAll(".desktopContentSection");
const boxesmotfirst = document.querySelectorAll(".desktopContentSection:not(:first-child)");

const tl = gsap.timeline();
boxes.forEach((box, i) => {
     if (i !== 0) {
          tl.fromTo(
               box, {
                    opacity: 0,
                    yPercent: 50
               }, {
                    opacity: 1,
                    yPercent: 0
                    
               },
               i
          );
     }
     if (i !== boxes.length - 1) {
          tl.fromTo(
               box, {
                    opacity: 1,
                    yPercent: 0
               }, {
                    opacity: 0,
                    yPercent: -50,
                    delay: 0.3
               },
               i
          );
     }
});
console.log(section);
ScrollTrigger.create({
     trigger: section,
     pin: true,
     //   markers: true,
     start: "top top",
     end: `+=${window.innerHeight * boxes.length}`,
     animation: tl,
     scrub: true,
});
// return t1;
// }


















// Second Animation 

let videoElem = document.querySelector(".video-ux-design");
let src = videoElem.currentSrc || videoElem.src;


once(document.documentElement, "touchstart", function () {

          videoElem.play(), videoElem.pause();
     }),
     ScrollTrigger.create({
          trigger: videoElem,
          start: "top 70%",
          end: "bottom",
          // markers: !0,
          onEnter: () => videoElem.play(),
          onEnterBack: () => videoElem.play(),
          onLeave: () => videoElem.pause(),
          onLeaveBack: () => videoElem.pause()
     });
//videoElem.play();
let video_timeline = gsap.timeline({
     scrollTrigger: {
          trigger: ".section_5",
          start: "top top",
          // markers: !0,
          scrub: !0,
          pin: !0,
          toggleClass: "acceso"
     }
});
video_timeline
     .fromTo(
          ".macbook-display", {
               backgroundColor: "transparent",
               outline: "none"
          }, {
               backgroundColor: "#373435",
               duration: 5,
               outline: ".5px solid #fff",
               delay: 10,
          }
     )

     .to(
          ".eduportal", {
               opacity: 0,
               duration: 1000,
               // delay: 0
          }
     )
     .fromTo(
          ".pa-hero-bg-overlay", {
               opacity: 1

          }, {
               opacity: 0,
               duration: 1000,
               delay: 3000
          }
     )
     .fromTo(
          ".css-macbook", {
               scale: 2.9
          }, {
               scale: 0.7,
               duration: 9000,
               // delay: 1
          }
        
     )

     .fromTo(
          ".mobile_screen_postion", {
               opacity: 0,
          }, {
               duration: 5000,
               delay: -5000,
               opacity: 1,
              
          }
     )
     .fromTo(
          ".lptitle_span", {
               opacity: 0,
               // stagger: 0.5,
               y: 100
          }, {
               duration: 4000,
               opacity: 1,
               stagger: 4000,
               delay: -4500,
               y: 0
          }
     )
     .fromTo(
          ".video-ux-design", {
               height: "100%",
               objectFit: "cover"
          }, {
               height: "-webkit-fill-available",
               duration: 5
          }
     )
     .fromTo(
          ".macbook-screen", {
               backgroundColor: "transparent"
          }, {
               backgroundColor: "#4b4b4d",
               duration: 2,
               delay: 5
          }
     );
let video_tl = gsap.timeline({
     defaults: {
          duration: 3
     },
     scrollTrigger: {
          trigger: videoElem,
          start: "center center",
          end: "+=600",
          scrub: !0
     }
});
once(videoElem, "loadedmetadata", () => {
          video_tl.fromTo(
               videoElem, {
                    currentTime: 0.01
               }, {
                    currentTime: videoElem.duration || 1
               }
          );
     }),
     setTimeout(function () {
          window.fetch &&
               fetch(src)
               .then((a) => a.blob())
               .then((a) => {
                    let b = URL.createObjectURL(a),
                         c = videoElem.currentTime;
                    once(document.documentElement, "touchstart", function () {
                              videoElem.play(), videoElem.pause();
                         }),
                         videoElem.setAttribute("src", b),
                         (videoElem.currentTime = c + 0.01);
               });
     }, 1e3);




function once(a, b, c, d) {
     var e = function () {
          a.removeEventListener(b, e), c.apply(this, arguments);
     };
     return a.addEventListener(b, e, d), e;
}









