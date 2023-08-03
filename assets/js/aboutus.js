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


// to prevent page zoom 

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

initSmoothScroll();

$(window).on('load', function () {
    setTimeout(function () { // allowing 3 secs to fade out loader
        $('.page-loader').fadeOut('slow');
    }, 1000);
});
// window.onload = function () {

// };
window.addEventListener("DOMContentLoaded", (event) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    window.addEventListener("resize", reportWindowSize);

    function reportWindowSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        console.log(width);
    }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    window.onload = setTimeout(function () {
        aboutAnimation();
        initAccordian();
        initNavbarFixedTop();
        initNavbarResponsive();
        initbutton();
        initScrolltriggerNav();
        initsubscribe();
    }, 1000);


})

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

function initNavbarResponsive() {
    // console.clear();
    var t1 = gsap.timeline({
        paused: true,
    });

    t1.to(".menu-mobile", 0.9, {
        top: "0%",
        ease: Expo.easeInOut,
        // delay: -0.2,
    });
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

function initSmoothScroll() {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".smooth-scroll"),
        smooth: true,
        // mobile: {
        //     // breakpoint: 0,
        //     smooth: false,
        //     // inertia: 0.8,
        //     // getDirection: true,
        // },
        // tablet: {
        //     // breakpoint: 0,
        //     smooth: false,
        //     // inertia: 0.8,
        //     // getDirection: true,
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
    // new ResizeObserver(() => scroll.update()).observe(document.querySelector(".smooth-scroll"))
    // ScrollTrigger.defaults({
    //     scroller: ".smooth-scroll",
    // });

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
                // delay: 1,
            })
            .from(".about_h_underline", {
                y: 20,
                // stagger: 0.05,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: -0.5,
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

function initTricksWords() {

    var spanWord = document.getElementsByClassName("span-lines");
    for (var i = 0; i < spanWord.length; i++) {
        var wordWrap = spanWord.item(i);
        wordWrap.innerHTML = wordWrap.innerHTML.replace(
            /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
            '$1<span class="span-line"><span class="span-line-inner">$2</span></span>'
        );
    }
}

function initonscrolltrigger() {
    // create
    let mm = gsap.matchMedia();

    if (document.querySelector(".span-lines.animate")) {
        const sla = document.querySelectorAll(".span-lines.animate");
        sla.forEach((line) => {
            // let triggerElement = $(this);
            const slasli = document.querySelectorAll(
                ".span-lines.animate .span-line-inner"
            );
            // let targetElement = $(".span-lines.animate .span-line-inner");

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: line,
                    toggleActions: "play none none reset",
                    start: "top 100%",
                    end: "top 0%",
                },
            });
            if (slasli) {
                tl.from(slasli, {
                    // y: "100%",
                    stagger: 0.01,
                    ease: "power3.out",
                    duration: 1.5,
                    delay: 0,
                    yPercent: 100,
                });
            }
        });
    }

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
                stagger: 0.2,
            });
        });
    }
    if (document.querySelectorAll(".span-lines.animate-2")) {
        const splitLines = new SplitText(".span-lines.animate-2", {
            type: "lines,words",
            linesClass: "line",
        });
        const lines = splitLines.words;

        // const makeWrapper = (lines, elClass) => {
        //     lines.forEach((line) => {
        //         const lineEl = document.createElement("div");
        //         lineEl.classList = elClass;
        //         line.parentNode.appendChild(lineEl);
        //         lineEl.appendChild(line);
        //     });
        // };

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
    if (document.querySelectorAll(".ap")) {
        const splitLines = new SplitText(".ap", {
            type: "lines,words",
            linesClass: "line",
        });
        const lines = splitLines.words;

        // const makeWrapper = (lines, elClass) => {
        //     lines.forEach((line) => {
        //         const lineEl = document.createElement("div");
        //         lineEl.classList = elClass;
        //         line.parentNode.appendChild(lineEl);
        //         lineEl.appendChild(line);
        //     });
        // };

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
    if (document.querySelectorAll(".divider")) {

        // Assuming you have an array of elements with class "element"
        const elements = document.querySelectorAll(".divider");

        // Create a timeline for each element
        elements.forEach((element) => {
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
                    width: "20%",
                    duration: 1,
                }, {
                    width: "100%",
                    duration: 1,
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
    if (document.querySelectorAll(".animate-btns2")) {
        // Assuming you have an array of elements with class "element"
        const animatebtns2 = document.querySelectorAll(".animate-btns2");

        // Create a timeline for each element
        animatebtns2.forEach((element) => {
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
    if (document.querySelectorAll(".animate-grids")) {
        // Assuming you have an array of elements with class "element"
        const animategrids = document.querySelectorAll(".animate-grids");

        // Create a timeline for each element
        animategrids.forEach((element) => {
            const timeline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: "play none none reset",
                    start: "top 110%",
                    end: "top 0%",
                    // markers:!0,
                    stagger: {
                        amount: 0.3,
                    },
                },
            });

            // Add animations to the timeline
            timeline.fromTo(
                element, {
                    yPercent: 20,
                    duration: 1,
                    opacity: 0,
                }, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.3
                }
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
                    duration: 0.5,
                }
            );

            // const items = document.querySelectorAll(".data-count");

            // timeline.from(items, {
            //     textContent: 0,
            //     duration: 4,
            //     ease: "power1.in",
            //     snap: {
            //         textContent: 1
            //     },
            //     // stagger: {
            //     // each: 1.0,
            //     onUpdate: function () {
            //         this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            //     },
            //     // }
            // });


            // function numberWithCommas(x) {
            //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // }
        });
    }
    if (document.querySelectorAll(".img_appear2")) {
        // Assuming you have an array of elements with class "element"
        const img_appear = document.querySelectorAll(".img_appear2");

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
                       scale: 0.5,
                       // duration: 1,
                       opacity: 0,
                  }, {
                       scale: 1,
                       opacity: 1,
                       duration: 1,
                  }
             );

        });
   }
    if (document.querySelectorAll(".circle-div-round")) {


        // Assuming you have an array of elements with class "element"
        const circledivround = document.querySelectorAll(".circle-div-round");

        // Create a timeline for each element
        circledivround.forEach((element) => {
            const timeline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: "play none none reset",
                    start: "top 100%",
                    end: "bottom bottom",
                    stagger: {
                        amount: 0.3,
                    },
                },
            });

            // Add animations to the timeline
            timeline.fromTo(
                element, {
                    scale: 0,
                    duration: 1,
                    opacity: 0,
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                }
            );
        });
    }
}

function initAccordian() {
    /* ===== Variables ===== */
    var header = document.querySelectorAll(".panel-header"),
        item = document.querySelectorAll(".item"),
        hoverPanelTl = [],
        openedPanel = {};

    Array.prototype.forEach.call(header, function (el, i) {
        var arrow = el.querySelector(".arrow"),
            spacer = el.querySelector(".spacer"),
            panel = el.parentNode,
            content = panel.querySelector(".panel-content");

        hoverPanelTl[i] = gsap.timeline({
            paused: true
        });

        /* ============= Define hover animation ============= */
        hoverPanelTl[i].to(el, 0.2, {
            css: {
                color: "#000",

                textIndent: "25px"
            },
            ease: Linear.easeNone
        });

        /* ============= Add event listeners ============= */
        el.addEventListener("mouseenter", function () {
            if (!hoverPanelTl[i].paused() || panel.classList.contains("closed")) {
                hoverPanelTl[i].timeScale(1).play();
                TweenLite.to(spacer, .5, {
                    width: '100%'
                });
            }
        });

        el.addEventListener("mouseleave", function () {
            if (!hoverPanelTl[i].paused()) {
                hoverPanelTl[i].timeScale(3).reverse();
                TweenLite.to(spacer, .1, {
                    width: 0
                });
            }
        });

        el.addEventListener("click", function () {
            /* ============= If panel open ============= */
            if (!panel.classList.contains("closed")) {
                hoverPanelTl[i].paused(false);
                TweenLite.set(spacer, {
                    width: "100%"
                });
                TweenLite.to(content, 0.3, {
                    height: 0,
                    // borderTopWidth: 0
                    paddingBottom:0
                });
                TweenMax.to(arrow, 0.3, {
                    rotation: 0,
                    transformOrigin: "25% 50%"
                });
                panel.classList.add("closed");
                openedPanel = {};
            } else {

                /* ============= Auto close open panels ============= */
                if (openedPanel.el != undefined) {
                    console.log(openedPanel);
                    var openArrow = openedPanel.el.querySelector(".arrow"),
                        openPanel = openedPanel.el.parentNode,
                        openContent = openPanel.querySelector(".panel-content");

                    hoverPanelTl[openedPanel.hoverTl].paused(false);
                    hoverPanelTl[openedPanel.hoverTl].timeScale(3).reverse();

                    TweenLite.to(openContent, 0.3, {
                        height: 0,
                        // borderTopWidth: 0
                        paddingBottom:0
                    });
                    TweenMax.to(openArrow, 0.3, {
                        rotation: 0,
                        transformOrigin: "25% 50%"
                    });
                    openPanel.classList.add("closed");
                }

                /* ============= If panel closed ============= */
                hoverPanelTl[i].paused(true);
                TweenLite.set(spacer, {
                    width: 0
                });
                TweenLite.set(content, {
                    height: "auto",
                    // borderTopWidth: "2px"
                    paddingBottom:"20px"
                });
                TweenLite.from(content, 0.5, {
                    height: 0,
                    borderTopWidth: 0,
                    ease: Back.easeOut.config(1.4)
                });
                TweenMax.to(arrow, 0.5, {
                    rotation: 90,
                    transformOrigin: "25% 50%",
                    ease: Back.easeOut.config(1.4)
                });
                panel.classList.remove("closed");
                openedPanel.el = el;
                openedPanel.hoverTl = i;
            }
        });
    });

    Array.prototype.forEach.call(item, function (el, i) {
        el.addEventListener("click", function () {
            console.log("The " + el.innerText + " button was clicked.");
        });
    });

}

initsliderBlog();
function initsliderBlog() {
    if (document.querySelector(".owl-carousel")) {
        var blogslider = $("#blogslider");
        blogslider.owlCarousel({
            items: 1,
            loop: true,
            margin: 40,
            autoplay: true,
            smartSpeed: 1500,
            autoplayTimeout: 4000,
            autoplayHoverPause: false,
            responsiveClass: true,

        });
        var blogslidermenu = $("#blogslidermenu");
        blogslidermenu.owlCarousel({
            items: 5,
            margin: 10,
            responsiveClass: true,
            nav: false,
            loop: true,
            autoWidth: true,
            navigation: false,
            dots: false,

        });
        var courseslidermenu = $("#courseslidermenu");
        courseslidermenu.owlCarousel({
            items: 5,
            margin: 10,
            responsiveClass: true,
            nav: false,
            loop: true,
            autoWidth: true,
            navigation: false,
            dots: false,

        });
    }


}

function initsubscribe() {
    $("#subscribe").click(function () {
        $(".subscribe-text").toggle(function () {
                $(this).animate({
                    // style change
                }, 500);
            },
            function () {
                $(this).animate({
                    // style change back
                }, 500);
            });
    });
}