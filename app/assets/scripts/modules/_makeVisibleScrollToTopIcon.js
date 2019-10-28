import $ from "jquery";

class MakeVisibleScrollToTopIcon {
    constructor() {
        this.scrollToTopIcon = $(".scrollToTopIcon");
        this.events();
    }
    events() {
        // this.scrollToTopIcon.addClass("invisible");
        window.onscroll = this.makeVisible.bind(this);
    }
    makeVisible() {
      
        if (window.pageYOffset > 1000) {
          // this.scrollToTopIcon.removeClass("invisible");
          // this.scrollToTopIcon.addClass("visible");
          this.scrollToTopIcon.addClass("scrollToTopIcon-visible")
        }
        else {
          // this.scrollToTopIcon.removeClass("visible");
          // this.scrollToTopIcon.removeClass("visible");
          // this.scrollToTopIcon.animate({opacity: '0'});
          // this.scrollToTopIcon.fadeOut();
          this.scrollToTopIcon.removeClass("scrollToTopIcon-visible")

          
        }
        
      }

}

export default MakeVisibleScrollToTopIcon;