import $ from "jquery";
import smoothscroll from "jquery-smooth-scroll";

class ScrolltoTop {
    constructor() {
        this.scrollToTop = $(".scrollToTop");
        this.events();
        // console.log(this.scrollToTop);

    }
    events() {
        // console.log(this.scrollToTop);

        document.addEventListener("DOMContentLoaded", this.addSmoothScrolling());
    }
    
    addSmoothScrolling() {
        // console.log(this.scrollToTop);
        this.scrollToTop.smoothScroll();
    }
}

export default ScrolltoTop;