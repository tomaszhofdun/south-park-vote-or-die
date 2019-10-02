import $ from "jquery";
import smoothscroll from "jquery-smooth-scroll";

class ScrolltoTop {
    constructor() {
        this.scrollToTopIcon = $(".scroolToTop");
        this.events();
    }
    events() {
        this.scrollToTopIcon.on("click", this.scrollToTop())
    }
    scrollToTop() {
        this.scrollToTopIcon.smoothscroll({
            offset: 0,
           
            // easing name. jQuery comes with "swing" and "linear." For others, you'll need an easing plugin
            // from jQuery UI or elsewhere
            easing: 'swing',
           
            // speed can be a number or 'auto'
            // if 'auto', the speed will be calculated based on the formula:
            // (current scroll position - target scroll position) / autoCoefficient
            speed: 400,
            preventDefault: true
           
          })
    }
}

export default ScrolltoTop;