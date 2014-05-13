function getDimensions($el, context) {

  var dimensions = {};
  dimensions.width = $el.outerWidth( true );
  dimensions.height = $el.outerHeight( true );

  context = context || "parent";

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

  dimensions.compare = {
    width:  (context === "window") ? $(window).width()  : $el.parent().outerWidth( true ),
    height: (context === "window") ? $(window).height() : $el.parent().outerHeight( true )
  };

  return dimensions;

}

function center($el, context) {

  context = context || "parent";
  var dims = getDimensions($el, context);

  $el.css({
    "top": ((dims.compare.height - dims.height) / 2) + "px",
    "left": ((dims.compare.width - dims.width) / 2) + "px",
  });

  if (context === "window") {
    $el.parent().height(dims.compare.height);
    $el.parent().width(dims.compare.width);
  }
}

function accidentWarning(car, context) {

  context = context || "parent";
  var dims = getDimensions(car, context);
  var carRatio = dims.nativeWidth / dims.nativeHeight;
  var parkingSpace = dims.compare.width / dims.compare.height;

  if ( carRatio >= parkingSpace ) {

    car.css({
      "width": "auto",
      "height": dims.compare.height + "px",
    });

  } else {

    car.css({
      "width": dims.compare.width + "px",
      "height": "auto",
    });

  }

}


function fontResize (size, scale, plate) {

  // newFontSize = size * scale;
  // plate.css({
  //   "font-size": (newFontSize / 10) + "rem",
  // });

  // return newFontSize;

}


function checkFontSize(size, plate, context) {

  // context = context || "parent";
  // var dims = getDimensions(plate, context);

  // if ( dims.width >= (dims.compare.width * 0.9) ) {

  //   var newFontSize = fontResize(size, 0.9, plate);
  //   return checkFontSize(newFontSize, plate, context);

  // } else if ( dims.width < (dims.compare.width * 0.8)) {

  //   return fontResize(size, 1.11111111, plate);

  // } else if ( dims.width < (dims.compare.width * 0.8)) {

  //   return size;

  // }



}



function hovercar($) {

  $ = $ || global.jQuery;
  if (typeof $ !== "function") throw new Error("jQuery not findable");

  return function (options, callback) {

    var $cars = options.cars && $(options.cars);
    var $plates = options.plates && $(options.plates);

    if ((!$cars || $cars.length === 0) && (!$plates || $plates.length === 0)) {
      return callback(new Error("No matching cars or plates passed to function"));
    }

    function liftOff($el) {
      accidentWarning($el, options.centerBy);
      center($el, options.centerBy);
    }

    function licensePlate(plate) {
      var fontSize = Number(plate.css("font-size").replace(/[^\d.-]/g, ''));

      checkFontSize(fontSize, plate, options.centerBy);
      center(plate, options.centerBy);
      callback();

      $(window).resize( function () {
        checkFontSize(plate, options.centerBy);
        center(plate, options.centerBy);
        //callback();
      });

    }

    if ($cars) {

      $cars.each(function () {

        var car = $(this);
        var dims = getDimensions(car, options.centerBy);
        var i = 0;

        function preFlightCheck ($el, max) {

          setTimeout(function () {

            dims = getDimensions($el, options.centerBy);

            if ( dims.nativeHeight > 0 ) {
              liftOff($el);
              callback();
            }

            else if (i < max) {

              i = i + 1;
              preFlightCheck($el, max);

            }
          }, 50);

        }


        if ( Number(dims.nativeHeight) >= 0 ) {
          preFlightCheck(car, 10);
        }

        $(window).resize(function () {
          liftOff(car);
        });

      });

    }

    if ($plates) {

      $plates.each(function (i, val) {
        var plate = $(this);
        licensePlate(plate);
      });

    }

  }

} /* end of function hovercar */

module.exports = hovercar;

// Example?
// $(window).load( function () {
//   hovercar($(".hovercar"), $(".license-plate"));
// });
