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
// const smoother = ScrollSmoother.create({
//      // wrapper: ".body",
//      content: ".scroll_smoother",
//      smooth: 2,
//      effects: true,
//      // normalizeScroll: true,
//     smoothTouch: 0.1,
//     speed:30,

// });
/* After Adding New Content to DOM */
// smoother.refresh();

// document.querySelector('.button').onmousemove = function (e) {

//      var x = e.pageX - e.target.offsetLeft;
//      var y = e.pageY - e.target.offsetTop;

//      e.target.style.setProperty('--x', x + 'px');
//      e.target.style.setProperty('--y', y + 'px');
// };
var th1 = gsap.timeline({
     repeat: -1
});
th1.to(".title_section", 30, {
     backgroundPosition: "-960px 0"
});

//Parallax Scrolling
let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section, i) => {
     section.bg = section.querySelector(".bg");

     // Give the backgrounds some random images
     //   section.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

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

});

// scroll images section 

console.clear();

gsap.set('.wrapper',{xPercent:-50,yPercent:-50})
gsap.set('#no02',{y:55})

var box = document.querySelector('.box'),
    boxWidth = box.offsetWidth,
    no01 = document.querySelectorAll("#no01 .box"),
    no02 = document.querySelectorAll("#no02 .box"),
    noBoxes = no01.length,
    totalWidth = boxWidth * noBoxes,
    dirFromLeft = "+=" + totalWidth,
    dirFromRight = "-=" + totalWidth,
    from = [dirFromLeft, dirFromRight],
    dur = [25, 40];

console.log();

var mod = gsap.utils.wrap(0, totalWidth);

function marquee(which, time, direction, scale){
  gsap.set(which, {
    x:function(i) {
      return i * boxWidth;
    }
  });
  var action = gsap.timeline({overwrite: true})
  .to(which,  {
  x: direction,
  modifiers: {
    x: x => mod(parseFloat(x)) + "px"
  },
    duration:time, ease:'none',
    repeat:-1,
  })
  .timeScale(scale);
  
  return action
}



var marquee01 = gsap.timeline()
.add(marquee(no01, dur[0], from[0], 1))

var marquee02 = gsap.timeline()
.add(marquee(no02, dur[1], from[1], 1),0)

var thisMarquee = [marquee01, marquee02];

// =============================

// var marqueeWraps = gsap.utils.toArray('.wrapper').forEach(function(wrap, i) {

//   var thisLine = wrap.querySelectorAll(".box");

//   wrap.addEventListener("mouseenter", () => { 
//     thisMarquee[i].pause();
//   })

//   wrap.addEventListener("mouseleave", () => { 
//     thisMarquee[i].play();
//   })
  
// })