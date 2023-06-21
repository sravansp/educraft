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
     smooth: 2,

});
/* After Adding New Content to DOM */
// smoother.refresh();

document.querySelector('.button').onmousemove = function (e) {

     var x = e.pageX - e.target.offsetLeft;
     var y = e.pageY - e.target.offsetTop;

     e.target.style.setProperty('--x', x + 'px');
     e.target.style.setProperty('--y', y + 'px');
};
var th1 = gsap.timeline({ repeat: -1 });
th1.to(".title_section", 30, { backgroundPosition: "-960px 0" });

