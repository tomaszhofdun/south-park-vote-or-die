import $ from "jquery";


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

