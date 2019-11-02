//importujemy wszystkie nasze moduły z "modules/"
//import import Lightbox from "lightbox2"; lub require("lightbox2"); ale to nie jest es6 tylko funkcja node i webpack ją rozpoznaje


import ToolTips from "./modules/_toolTips";
var toolTips = new ToolTips;

import Modals from "./modules/_modals";
var modals = new Modals;

import TurnBootrapJsOn from "./modules/_turnBootrapJsOn";
var turnBootrapJsOn = new TurnBootrapJsOn;

import MakeVisibleScrollToTopIcon from "./modules/_makeVisibleScrollToTopIcon";
var makeVisibleScrollToTopIcon = new MakeVisibleScrollToTopIcon;

import ScrolltoTop from "./modules/_scrolltoTop"
var scrolltoTop = new ScrolltoTop;

import Test2 from "./modules/_test2";
var test2 = new Test2;
