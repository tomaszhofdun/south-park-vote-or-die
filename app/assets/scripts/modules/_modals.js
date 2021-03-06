import $ from "jquery";

class Modals {
  constructor() {
    this.southparkgameplaymodal = $("#southparkgameplaymodal");
    this.southparkgameplay = document.getElementById("southparkgameplay");
    this.southparktrailermodal = $("#southparktrailermodal");
    this.southparktrailer = document.getElementById("southparktrailer");
    this.events();
  }
  events() {
    var that = this;
    this.southparkgameplaymodal.on('shown.bs.modal', function () {
        that.southparkgameplay.play();
    })
    this.southparkgameplaymodal.on('hidden.bs.modal', function () {
      that.southparkgameplay.pause();
    })
    this.southparktrailermodal.on('shown.bs.modal', function () {
      that.southparktrailer.play();
    })
    this.southparktrailermodal.on('hidden.bs.modal', function () {
      that.southparktrailer.pause();
    })
  }
  
  play() {
    console.log("play");
    this.southparkgameplay.play();
  }
  pause() {
    console.log("pause");
    this.southparkgameplay.pause();
  }
}

export default Modals;
