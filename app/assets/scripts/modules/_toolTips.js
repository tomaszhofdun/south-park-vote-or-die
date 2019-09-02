import $ from "jquery";

class ToolTipBootstrap {
    constructor() {
        this.events()
    }
    events() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })
}
}


  export default ToolTipBootstrap;
