var $ = global.jQuery;
var hovercar = require("../hovercar")($);

$(function () {

  hovercar({ cars: ".container > .bg", centerBy: "window" }, function () {
    console.log('done 1');
    hovercar({ plates: ".container > .logo", centerBy: "parent" }, function () {
      console.log("all hovered");
    });
  });

});
