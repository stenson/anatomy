var embroid = (function(){
  
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  
  var random = function(min, max) {
    return Math.round(( Math.random() * (max-min) ) + min);
  };
  
  var _embroid = function(options) {
    var xD = options.width || 100;
    var yD = options.height || 100;
    
    canvas.height = yD;
    canvas.width = xD;
    
    var iterations = options.iterations || 1000;
    var iterator = options.iterator || function(){}; // required
    
    for(var i = 0; i < iterations; i++) {
      var x = random(0, xD);
      var y = random(0, yD);
      iterator(i, x, y, context);
    }

    return canvas.toDataURL();
  };
  
  // some nice stuff to go along with the main jazz
  _embroid.random = random;
  
  _embroid.random255 = function() {
    return _embroid.random(0,255);
  };
  
  return _embroid;
  
})();