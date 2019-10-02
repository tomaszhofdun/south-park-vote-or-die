import $ from "jquery";
import smoothscroll from "jquery-smooth-scroll";

class ScrolltoTop {
    constructor() {
        this.scrollToTopIcon = $(".scrollToTopIcon");
        // this.addSmoothScrolling();
        this.events();
    }
    events() {
        // this.scrollToTopIcon.on("click", this.scrollToTop())
        document.addEventListener("DOMContentLoaded", this.addSmoothScrolling());
    }
    addSmoothScrolling() {
        this.scrollToTopIcon.smoothScroll({
            offset: 0,
            easing: 'swing',
            speed: "auto",
            preventDefault: true
           
          })
    }
}

export default ScrolltoTop;