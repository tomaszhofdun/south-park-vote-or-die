import $ from "jquery";

class MakeVisibleScrollToTopIcon {
    constructor() {
        this.scrollToTopIcon = $(".scrollToTopIcon");
        this.events();
    }
    events() {
        window.onscroll = this.makeVisible.bind(this);
    }
    makeVisible() {
      
        if (window.pageYOffset > 1000) {
          this.scrollToTopIcon.addClass("scrollToTopIcon-visible")
        }
        else {
          this.scrollToTopIcon.removeClass("scrollToTopIcon-visible")
        }
      }

}

export default MakeVisibleScrollToTopIcon;