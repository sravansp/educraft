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
          rotation: "rad"
     }
});
// smooth scrolling container
const smoother = ScrollSmoother.create({
     // wrapper: ".body",
     content: ".scroll_smoother",
     smooth: 0.9,
     effects: true,
     // normalizeScroll: true,
     smoothTouch: 0.1,
     speed: 5,

});
/* After Adding New Content to DOM */
smoother.refresh();

document.querySelector('.button').onmousemove = function (e) {

     var x = e.pageX - e.target.offsetLeft;
     var y = e.pageY - e.target.offsetTop;

     e.target.style.setProperty('--x', x + 'px');
     e.target.style.setProperty('--y', y + 'px');
};
var th1 = gsap.timeline({
     repeat: -1
});
th1.to(".title_section", 30, {
     backgroundPosition: "-960px 0"
});

//Parallax Scrolling Image
let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section, i) => {
     section.bg = section.querySelector(".bg");

     // Give the backgrounds some random images
     //   section.bg.style.backgroundImage = `url(./assets/images/parallax-educraft.jpg)`;

     // the first image (i === 0) should be handled differently because it should start at the very top.
     // use function-based values in order to keep things responsive
     gsap.fromTo(section.bg, {
          backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
     }, {
          backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
               trigger: section,
               start: () => i ? "top bottom" : "top top",
               end: "bottom top",
               scrub: true,
               invalidateOnRefresh: true // to make it responsive
          }
     });
     // gsap.fromTo(".parallax_content", {
     //      opacity: 1
     // }, {
     //      y: "-50%",
     //      duration: 1,
     //      opacity: 0,
     // });

});

// Parallax Video
// JavaScript
// Initialize GSAP timeline
const parallaxtl = gsap.timeline({});

// Calculate the scroll range for parallax effect
const scrollRange = document.querySelector('.parallax-container').offsetHeight - window.innerHeight;

// Scroll event handler
function parallaxScroll() {
     const scrollTop = window.offsetTop || document.documentElement.scrollTop;

     // Calculate the parallax effect for the video position
     const videoPosition = (scrollTop / scrollRange) * 100;

     // Update the video position using GSAP
     parallaxtl.to('.parallax-video', {
          y: -videoPosition + '%'
     });
}

// Register the scroll event listener
window.addEventListener('scroll', parallaxScroll);




