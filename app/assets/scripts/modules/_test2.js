import $ from "jquery";
import smoothscroll from "jquery-smooth-scroll";

// przycisk do cofania strony na samą górę
class Test2 {
  constructor() {
    this.scrollToTopIcon = $(".scrollToTopIcon");
    this.addSmoothScrolling();
  }

  addSmoothScrolling() {
    this.scrollToTopIcon.smoothScroll({
      speed: 1000
    });
  }
}

export default Test2;
