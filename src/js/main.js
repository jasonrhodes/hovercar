var log = require("./lib/log"),
    $ = require("./vendor/jquery");

function hovercar (cars, plates) {
  var $cars = $(cars);
  var $plates = $(plates);
  if ($cars.length === 0 && $plates.length === 0) { return; }

  function getDimensions ($el) {
    var dimensions = {};
    dimensions.width = $el.outerWidth( true );
    dimensions.height = $el.outerHeight( true );
    if ( $el.context.nodeName === "VIDEO" ) {
      dimensions.nativeWidth = $el.context.videoWidth;
      dimensions.nativeHeight = $el.context.videoHeight;
    } else if ( $el.context.nodeName === "IMG" ) {
      dimensions.nativeWidth = $el.context.naturalWidth;
      dimensions.nativeHeight = $el.context.naturalHeight;
    } else {
      dimensions.nativeWidth = 0;
      dimensions.nativeHeight = 0;
    }
    dimensions.parent = {};
    dimensions.parent.width = $el.parent().outerWidth( true );
    dimensions.parent.height = $el.parent().outerHeight( true );

    return dimensions;
  }

  function center ($el) {
    var dims = getDimensions($el);

    $el.css({
      "top": ((dims.parent.height - dims.height) / 2) + "px",
      "left": ((dims.parent.width - dims.width) / 2) + "px",
    });
  }

  function liftOff ($el) {
    accidentWarning($el);
    center($el);
  }

  function accidentWarning (car) {
    var dims = getDimensions(car);
    var carRatio = dims.nativeWidth / dims.nativeHeight;
    var parkingSpace = dims.parent.width / dims.parent.height;

    if ( carRatio >= parkingSpace ) {
      car.css({
        "width": "auto",
        "height": dims.parent.height + "px",
      });
    } else {
      car.css({
        "width": dims.parent.width + "px",
        "height": "auto",
      });
    }
  }

  function licensePlate (plate) {
    var fontSize = Number(plate.css("font-size").replace(/[^\d.-]/g, ''));
    var newFontSize = fontSize;
    if ($plates.length === 0) { return; }

    function fontResize (scale, plate) {
      newFontSize = newFontSize * scale;
      plate.css({
        "font-size": (newFontSize / 10) + "rem",
      });
    }

    function checkFontSize (plate) {
      var dims = getDimensions(plate);
      if ( dims.width >= (dims.parent.width * 0.9) ) {
        fontResize(0.9, plate);
        checkFontSize(plate);
      } else if ( dims.width < (dims.parent.width * 0.8) && newFontSize < fontSize ) {
        fontResize(1.11111111, plate);
      } else if ( dims.width < (dims.parent.width * 0.8) && newFontSize >= fontSize ) {
        newFontSize = fontSize;
      } else {
        return;
      }
    }

    $plates.each( function () {
      var plate = $(this);
      checkFontSize(plate);
      center(plate);

      $(window).resize( function () {
        checkFontSize(plate);
        center(plate);
      });
    });
  }

  $cars.each( function () {
    var car = $(this);
    var dims = getDimensions(car);
    var i = 0;
    function preFlightCheck ($el, max) {
      setTimeout(function () {
        dims = getDimensions($el);
        if ( dims.nativeHeight > 0 ) { liftOff($el); }
        else if (i < max) {
          i = i + 1;
          preFlightCheck($el, max);
        }
      }, 50);
    }
    if ( Number(dims.nativeHeight) >= 0 ) {
      preFlightCheck(car, 10);
    }

    $(window).resize( function () {
      liftOff(car);
    });
  });

  $plates.each( function () {
    var plate = $(this);
    licensePlate(plate);
  });
}

$(window).load( function () {
  hovercar($(".hovercar"), $(".license-plate"));
});
