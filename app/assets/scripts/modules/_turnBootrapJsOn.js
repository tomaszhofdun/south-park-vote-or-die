import $ from "jquery";
import "bootstrap";


class TurnBootrapJsOn {
    constructor() {
        this.events()
    }
    events() {
        $(function () {
            $('[data-toggle="popover"]').popover()
          })
}
}


  export default TurnBootrapJsOn;

