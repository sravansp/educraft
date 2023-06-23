// console.clear();
const element = document.querySelector(".cursor");
const target = document.querySelector(".target");
const text = document.querySelector(".text");
class Cursor {
  constructor(el, target, text) {
    this.el = el;
    // this.target = target;
    // this.text = text;
    // this.triggerDistance = this.target.getBoundingClientRect().width;
    this.bind();
  }

  bind() {
    document.addEventListener("mousemove", this.move.bind(this), false);
  }

  move(e) {
    const cursorPosition = {
      left: e.clientX,
      top: e.clientY };

    document.querySelectorAll(".target").forEach(single => {
      const triggerDistance = single.getBoundingClientRect().width;

      const targetPosition = {
        left:
        single.getBoundingClientRect().left +
        single.getBoundingClientRect().width / 16,
        top:
        single.getBoundingClientRect().top +
        single.getBoundingClientRect().height / 16};

      const distance = {
        x: targetPosition.left - cursorPosition.left,
        y: targetPosition.top - cursorPosition.top };


      const angle = Math.atan2(distance.x, distance.y);
      const hypotenuse = Math.sqrt(
      distance.x * distance.x + distance.y * distance.y);

      if (hypotenuse < triggerDistance) {
        // look at this code to adjust the round cursor area sizing
        gsap.to(this.el, 0.2, {
          left: targetPosition.left - Math.sin(angle) * hypotenuse / 2,
          top: targetPosition.top - Math.cos(angle) * hypotenuse / 2,
          height: single.clientHeight,
          width: single.clientWidth });

        gsap.to(single.querySelector(".text"), 1, {
          x: -(Math.sin(angle) * hypotenuse / 4),
          y: -(Math.cos(angle) * hypotenuse / 4) });

      } else {
        gsap.to(this.el, 0.2, {
          left: cursorPosition.left,
          top: cursorPosition.top,
          height: "12px",
          width: "12px" });


        gsap.to(single.querySelector(".text"), 1, {
          x: 0,
          y: 0 });

      }
    });
    //     const targetPosition = {
    //       left:
    //         this.target.getBoundingClientRect().left +
    //         this.target.getBoundingClientRect().width / 2,
    //       top:
    //         this.target.getBoundingClientRect().top +
    //         this.target.getBoundingClientRect().height / 2
    //     };
    //     const distance = {
    //       x: targetPosition.left - cursorPosition.left,
    //       y: targetPosition.top - cursorPosition.top
    //     };
    //     const angle = Math.atan2(distance.x, distance.y);
    //     const hypotenuse = Math.sqrt(
    //       distance.x * distance.x + distance.y * distance.y
    //     );
    //     if (hypotenuse < this.triggerDistance) {
    //       TweenMax.to(this.el, 0.2, {
    //         left: targetPosition.left - (Math.sin(angle) * hypotenuse) / 2,
    //         top: targetPosition.top - (Math.cos(angle) * hypotenuse) / 2,
    //         height: target.clientHeight,
    //         width: target.clientWidth
    //       });
    //       TweenMax.to(document.querySelector(".text"), 0.2, {
    //         x: -((Math.sin(angle) * hypotenuse) / 2),
    //         y: -((Math.cos(angle) * hypotenuse) / 2)
    //       });
    //     } else {
    //       TweenMax.to(this.el, 0.2, {
    //         left: cursorPosition.left,
    //         top: cursorPosition.top,
    //         height: "12px",
    //         width: "12px"
    //       });
    //       TweenMax.to(document.querySelector(".text"), 0.2, {
    //         x: 0,
    //         y: 0
    //       });
    //     }
  }}

const cursor = new Cursor(element, target);