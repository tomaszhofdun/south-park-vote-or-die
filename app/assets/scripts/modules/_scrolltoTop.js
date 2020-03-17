import $ from "jquery";
import smoothscroll from "jquery-smooth-scroll";

class ScrolltoTop {
    constructor() {
        this.scrollToTop = $(".scrollToTop");
        this.events();

    }
    events() {document.addEventListener("DOMContentLoaded", this.addSmoothScrolling());
    }
    
    addSmoothScrolling() {
        this.scrollToTop.smoothScroll();
    }
}

export default ScrolltoTop;