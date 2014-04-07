var log = require("./lib/log"),
    $ = require("./vendor/jquery");

function hovercar (el) {
  var $el = $(el);
  var width = $el.outerWidth( true );
  var height = $el.outerHeight( true );
  var pWidth = $el.parent().outerWidth( true );
  var pHeight = $el.parent().outerHeight( true );
  var dimensions = getDimensions($el);
  // console.log($el);
  //
  // console.log("element = " + width + "px" + " x " + height + "px");
  // console.log("parent = " + pWidth + "px" + " x " + pHeight + "px");

  var fontSize = Number($el.css("font-size").replace(/[^\d.-]/g, ''));
  var newFontSize = fontSize;

  function newWidth ($el) { width = $el.outerWidth( true ); }
  function newHeight ($el) { height = $el.outerHeight( true ); }
  function newPWidth ($el) { pWidth = $el.parent().outerWidth( true ); }
  function newPHeight ($el) { pHeight = $el.parent().outerHeight( true ); }

  function getDimensions ($el) {
    var dimensions = {};
    dimensions.width = $el.outerWidth( true );
    dimensions.height = $el.outerHeight( true );
    dimensions.parent = {};
    dimensions.parent.width = $el.parent().outerWidth( true );
    dimensions.parent.height = $el.parent().outerHeight( true );

    return dimensions;
  }

  function center ($el) {
    // I feel like there should be an easier way to set the height variable and
    // then refresh it on resize.
    // newWidth($el);
    // newHeight($el);
    // newPWidth($el);
    // newPHeight($el);

    // this only works if the parent element is set postion: relative; and if
    // the target element is set position: absolute;. it'd be nice to do a check
    // of these two to see if they already have the position attribute and then
    // tweak the position based on that and/or add the position to each.
    getDimensions($el);

    $el.css({
      "top": ((dimensions.parent.height - dimensions.height) / 2) + "px",
      "left": ((dimensions.parent.width - dimensions.width) / 2) + "px",
    });
    console.log("//////////RESIZE//////////");
    console.log("$el: " + dimensions.width + " x " + dimensions.height);
    console.log("parent: " + dimensions.parent.width + " x " + dimensions.parent.height);
    console.log("window: " + window.innerWidth + " x " + window.innerHeight);
  }

  function fontSizer (scale, $el) {
    newFontSize = newFontSize * scale;
    $el.css({
      "font-size": (newFontSize / 10) + "rem",
    });
  }

  function fontSizeChecker ($el) {
    // this whole if check is a little dicey I think. Not sure if there's a
    // better way or if I should pass in the scaling factors when the function
    // is called. Should the scaling up and down be separate functions?
    if ( dimensions.width >= (dimensions.parent.width * 0.9)) {
      fontSizer(0.9, $el);
      // console.log("after css change" + fontSize + ", " + newFontSize);
      center($el);
    } else if ( dimensions.width < (dimensions.parent.width * 0.8) && newFontSize < fontSize ) {
      fontSizer(1.11111111, $el);
      // is there a better way to do this rather than nesting ifs?
      if ( newFontSize > fontSize ) {
        newFontSize = fontSize;
        // console.log("after css change" + fontSize + ", " + newFontSize);
      }
      // console.log("after css change" + fontSize + ", " + newFontSize);
      center($el);
    }
  }

  fontSizeChecker($el);
  center($el);

  $(window).resize( function() {
    fontSizeChecker($el);
    center($el);
  });

}

$(window).load( function() {
  hovercar($(".hovercar"));
});
