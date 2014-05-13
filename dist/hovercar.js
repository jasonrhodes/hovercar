(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
function hovercar($) {

  $ = $ || global.jQuery;
  if (typeof $ !== "function") throw new Error("jQuery not findable");

  return function (options, callback) {

    var $cars = options.cars && $(options.cars);
    var $plates = options.plates && $(options.plates);

    if ($cars.length === 0 && $plates.length === 0) {
      return callback(new Error("No matching cars or plates passed to function"));
    }

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

}

module.exports = hovercar;

// Example?
// $(window).load( function () {
//   hovercar($(".hovercar"), $(".license-plate"));
// });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamFzb24vcGFja2FnZXMvaG92ZXJjYXIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2phc29uL3BhY2thZ2VzL2hvdmVyY2FyL2Zha2VfYzI2MWY4ODcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5mdW5jdGlvbiBob3ZlcmNhcigkKSB7XG5cbiAgJCA9ICQgfHwgZ2xvYmFsLmpRdWVyeTtcbiAgaWYgKHR5cGVvZiAkICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcImpRdWVyeSBub3QgZmluZGFibGVcIik7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xuXG4gICAgdmFyICRjYXJzID0gb3B0aW9ucy5jYXJzICYmICQob3B0aW9ucy5jYXJzKTtcbiAgICB2YXIgJHBsYXRlcyA9IG9wdGlvbnMucGxhdGVzICYmICQob3B0aW9ucy5wbGF0ZXMpO1xuXG4gICAgaWYgKCRjYXJzLmxlbmd0aCA9PT0gMCAmJiAkcGxhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk5vIG1hdGNoaW5nIGNhcnMgb3IgcGxhdGVzIHBhc3NlZCB0byBmdW5jdGlvblwiKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGltZW5zaW9ucyAoJGVsKSB7XG4gICAgICB2YXIgZGltZW5zaW9ucyA9IHt9O1xuICAgICAgZGltZW5zaW9ucy53aWR0aCA9ICRlbC5vdXRlcldpZHRoKCB0cnVlICk7XG4gICAgICBkaW1lbnNpb25zLmhlaWdodCA9ICRlbC5vdXRlckhlaWdodCggdHJ1ZSApO1xuICAgICAgaWYgKCAkZWwuY29udGV4dC5ub2RlTmFtZSA9PT0gXCJWSURFT1wiICkge1xuICAgICAgICBkaW1lbnNpb25zLm5hdGl2ZVdpZHRoID0gJGVsLmNvbnRleHQudmlkZW9XaWR0aDtcbiAgICAgICAgZGltZW5zaW9ucy5uYXRpdmVIZWlnaHQgPSAkZWwuY29udGV4dC52aWRlb0hlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAoICRlbC5jb250ZXh0Lm5vZGVOYW1lID09PSBcIklNR1wiICkge1xuICAgICAgICBkaW1lbnNpb25zLm5hdGl2ZVdpZHRoID0gJGVsLmNvbnRleHQubmF0dXJhbFdpZHRoO1xuICAgICAgICBkaW1lbnNpb25zLm5hdGl2ZUhlaWdodCA9ICRlbC5jb250ZXh0Lm5hdHVyYWxIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaW1lbnNpb25zLm5hdGl2ZVdpZHRoID0gMDtcbiAgICAgICAgZGltZW5zaW9ucy5uYXRpdmVIZWlnaHQgPSAwO1xuICAgICAgfVxuICAgICAgZGltZW5zaW9ucy5wYXJlbnQgPSB7fTtcbiAgICAgIGRpbWVuc2lvbnMucGFyZW50LndpZHRoID0gJGVsLnBhcmVudCgpLm91dGVyV2lkdGgoIHRydWUgKTtcbiAgICAgIGRpbWVuc2lvbnMucGFyZW50LmhlaWdodCA9ICRlbC5wYXJlbnQoKS5vdXRlckhlaWdodCggdHJ1ZSApO1xuXG4gICAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjZW50ZXIgKCRlbCkge1xuICAgICAgdmFyIGRpbXMgPSBnZXREaW1lbnNpb25zKCRlbCk7XG5cbiAgICAgICRlbC5jc3Moe1xuICAgICAgICBcInRvcFwiOiAoKGRpbXMucGFyZW50LmhlaWdodCAtIGRpbXMuaGVpZ2h0KSAvIDIpICsgXCJweFwiLFxuICAgICAgICBcImxlZnRcIjogKChkaW1zLnBhcmVudC53aWR0aCAtIGRpbXMud2lkdGgpIC8gMikgKyBcInB4XCIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWZ0T2ZmICgkZWwpIHtcbiAgICAgIGFjY2lkZW50V2FybmluZygkZWwpO1xuICAgICAgY2VudGVyKCRlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWNjaWRlbnRXYXJuaW5nIChjYXIpIHtcbiAgICAgIHZhciBkaW1zID0gZ2V0RGltZW5zaW9ucyhjYXIpO1xuICAgICAgdmFyIGNhclJhdGlvID0gZGltcy5uYXRpdmVXaWR0aCAvIGRpbXMubmF0aXZlSGVpZ2h0O1xuICAgICAgdmFyIHBhcmtpbmdTcGFjZSA9IGRpbXMucGFyZW50LndpZHRoIC8gZGltcy5wYXJlbnQuaGVpZ2h0O1xuXG4gICAgICBpZiAoIGNhclJhdGlvID49IHBhcmtpbmdTcGFjZSApIHtcbiAgICAgICAgY2FyLmNzcyh7XG4gICAgICAgICAgXCJ3aWR0aFwiOiBcImF1dG9cIixcbiAgICAgICAgICBcImhlaWdodFwiOiBkaW1zLnBhcmVudC5oZWlnaHQgKyBcInB4XCIsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FyLmNzcyh7XG4gICAgICAgICAgXCJ3aWR0aFwiOiBkaW1zLnBhcmVudC53aWR0aCArIFwicHhcIixcbiAgICAgICAgICBcImhlaWdodFwiOiBcImF1dG9cIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGljZW5zZVBsYXRlIChwbGF0ZSkge1xuICAgICAgdmFyIGZvbnRTaXplID0gTnVtYmVyKHBsYXRlLmNzcyhcImZvbnQtc2l6ZVwiKS5yZXBsYWNlKC9bXlxcZC4tXS9nLCAnJykpO1xuICAgICAgdmFyIG5ld0ZvbnRTaXplID0gZm9udFNpemU7XG4gICAgICBpZiAoJHBsYXRlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgIGZ1bmN0aW9uIGZvbnRSZXNpemUgKHNjYWxlLCBwbGF0ZSkge1xuICAgICAgICBuZXdGb250U2l6ZSA9IG5ld0ZvbnRTaXplICogc2NhbGU7XG4gICAgICAgIHBsYXRlLmNzcyh7XG4gICAgICAgICAgXCJmb250LXNpemVcIjogKG5ld0ZvbnRTaXplIC8gMTApICsgXCJyZW1cIixcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrRm9udFNpemUgKHBsYXRlKSB7XG4gICAgICAgIHZhciBkaW1zID0gZ2V0RGltZW5zaW9ucyhwbGF0ZSk7XG4gICAgICAgIGlmICggZGltcy53aWR0aCA+PSAoZGltcy5wYXJlbnQud2lkdGggKiAwLjkpICkge1xuICAgICAgICAgIGZvbnRSZXNpemUoMC45LCBwbGF0ZSk7XG4gICAgICAgICAgY2hlY2tGb250U2l6ZShwbGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIGRpbXMud2lkdGggPCAoZGltcy5wYXJlbnQud2lkdGggKiAwLjgpICYmIG5ld0ZvbnRTaXplIDwgZm9udFNpemUgKSB7XG4gICAgICAgICAgZm9udFJlc2l6ZSgxLjExMTExMTExLCBwbGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIGRpbXMud2lkdGggPCAoZGltcy5wYXJlbnQud2lkdGggKiAwLjgpICYmIG5ld0ZvbnRTaXplID49IGZvbnRTaXplICkge1xuICAgICAgICAgIG5ld0ZvbnRTaXplID0gZm9udFNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICRwbGF0ZXMuZWFjaCggZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGxhdGUgPSAkKHRoaXMpO1xuICAgICAgICBjaGVja0ZvbnRTaXplKHBsYXRlKTtcbiAgICAgICAgY2VudGVyKHBsYXRlKTtcblxuICAgICAgICAkKHdpbmRvdykucmVzaXplKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2hlY2tGb250U2l6ZShwbGF0ZSk7XG4gICAgICAgICAgY2VudGVyKHBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkY2Fycy5lYWNoKCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2FyID0gJCh0aGlzKTtcbiAgICAgIHZhciBkaW1zID0gZ2V0RGltZW5zaW9ucyhjYXIpO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgZnVuY3Rpb24gcHJlRmxpZ2h0Q2hlY2sgKCRlbCwgbWF4KSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRpbXMgPSBnZXREaW1lbnNpb25zKCRlbCk7XG4gICAgICAgICAgaWYgKCBkaW1zLm5hdGl2ZUhlaWdodCA+IDAgKSB7IGxpZnRPZmYoJGVsKTsgfVxuICAgICAgICAgIGVsc2UgaWYgKGkgPCBtYXgpIHtcbiAgICAgICAgICAgIGkgPSBpICsgMTtcbiAgICAgICAgICAgIHByZUZsaWdodENoZWNrKCRlbCwgbWF4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwKTtcbiAgICAgIH1cbiAgICAgIGlmICggTnVtYmVyKGRpbXMubmF0aXZlSGVpZ2h0KSA+PSAwICkge1xuICAgICAgICBwcmVGbGlnaHRDaGVjayhjYXIsIDEwKTtcbiAgICAgIH1cblxuICAgICAgJCh3aW5kb3cpLnJlc2l6ZSggZnVuY3Rpb24gKCkge1xuICAgICAgICBsaWZ0T2ZmKGNhcik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICRwbGF0ZXMuZWFjaCggZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBsYXRlID0gJCh0aGlzKTtcbiAgICAgIGxpY2Vuc2VQbGF0ZShwbGF0ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaG92ZXJjYXI7XG5cbi8vIEV4YW1wbGU/XG4vLyAkKHdpbmRvdykubG9hZCggZnVuY3Rpb24gKCkge1xuLy8gICBob3ZlcmNhcigkKFwiLmhvdmVyY2FyXCIpLCAkKFwiLmxpY2Vuc2UtcGxhdGVcIikpO1xuLy8gfSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIl19
