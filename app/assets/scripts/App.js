//importujemy wszystkie nasze moduły z "modules/"
//import import Lightbox from "lightbox2"; lub require("lightbox2"); ale to nie jest es6 tylko funkcja node i webpack ją rozpoznaje
import "popper.js";
import "bootstrap";
import "../../temp/scripts/modernizr";
import "picturefill";
import "lazysizes";


import ToolTips from "./modules/_toolTips";

var toolTips = new ToolTips;


// require("./modules/_toolTips")
// var re = new df();
// import GallerySlider from "./modules/_gallerySlider";
// var gallerySlider = new GallerySlider();

// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
//   })

// $("p").hide();
