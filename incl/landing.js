window.onload = function () {

  var index = 0;
  $(".opt").each(function () { 
    index += 1;
    var time = index;
    var that = this;
    setTimeout(function () {$(that).hide(); }, time); 
  });
};

$(".block").mouseenter(function () {
  $(".opt").each(function () {
    if ($(this).css("display") !== "none") $(this).hide(); 
  });
  $(this).children(".opt").each(function () {
    if ($(this).css("display") == "none") $(this).show(); 
  });
});


$(".block").mouseleave(function () {
  $(".opt").each(function () {
    if ($(this).css("display") !== "none") $(this).hide(); 
  });
});

$(".opt").click(function () {
  var a = $(this).find("a");
  if (a.length > 0) {
    a = a[0];
    try {
      window.location = "http://slco-2016.github.io/q1_report/" + $(a).attr('href');
    } catch (e) { console.log("Err: ", e); }
  }
});


$(".survey").click(function () {
  var a = $(this).find("a");
  if (a.length > 0) {
    a = a[0];
    try {
      window.location = $(a).attr('href');
    } catch (e) { console.log("Err: ", e); }
  }
});

setInterval(function () {
  var s = $(".ship");
  var y = window.innerHeight + 100;
  var dy = -100;
  var x = Math.random() * window.innerWidth/3 - window.innerWidth/3;
  var dx = x + window.innerWidth + window.innerWidth/3;

  // Pick whether to do left or right ship
  if (Math.random() > 0.5) {
    var s = $(".ship2");

    // Update x starting point
    x = window.innerWidth + window.innerWidth/3;
    var dx = 0 - (Math.random() * window.innerWidth/3);
  }

  // Run animations
  s.css("top", y);
  s.css("left", x);
  s.stop().animate({
    left: dx + "px",
    top:  dy + "px"
  }, 3000 + Math.random() * 7000);   
}, 8000);


$(document).mousemove( function (e) {
  
  // Work out scales every time in case of resize
  var scaleX = window.innerWidth/255;
  var scaleY = window.innerHeight/255;

  var x = e.pageX ? e.pageX : 120;
  var y = e.pageY ? e.pageY : 120;

  // Create rgb color vals based on position
  var col1 = Math.floor(x/scaleX);
  var col2 = Math.floor(y/scaleY);
  
  // Build rgb
  var rgb  = new Array(col1, col2, 255);
  // Get hex val
  var color = convertHex(rgb);
  
  // Update colors on a series of items on the screen
  $(".title").css("color", color);
  $("header div a").css("color", color);
  $(".block").css("background-color", color);
  $("header div.inverse").css("background-color", color);

  // Udpate the highlight color from orange
  var newHighlight = hexToComplimentary(color);
  $(".block .opt").css("background-color", newHighlight);
  $(".block .header").css("color", newHighlight);
  $("header div.inverse").css("color", newHighlight);
  $(".block .opt a").css("color", color);
  $(".block .opt:hover a").css("color", shadeColor(color, 75));
  $(".block .opt:hover").css("background-color", shadeColor(newHighlight, -25));

  // Move the moon
  var moonX = (-x - window.innerWidth/2)/(window.innerWidth/2) * 50;
  var moonY = (y)/(window.innerHeight/2) * 20;
  $(".moon").stop().animate({
    // marginLeft: moonX + "px",
    // marginBottom: moonY + "px"
  }, 50);

  // Move the bg
  $(".stars").stop().animate({
    backgroundPositionX: -moonX + "px",
    backgroundPositionY: moonY + "px"
  }, 50);
}); 

function convertHex (rgb){
  var hex = new Array();
  for(var i = 0; i <= 2; ++i){
    hex[i] = parseInt(rgb[i]).toString(16);
    if(hex[i].length == 1){
      hex[i] = "0"+hex[i];
    }
  }
  var hex = "#"+hex.join("");
  return hex;
}

function hexToComplimentary (hex){

  // Convert hex to rgb
  // Credit to Denis http://stackoverflow.com/a/36253499/4939630
  var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

  // Get array of RGB values
  rgb = rgb.replace(/[^\d,]/g, '').split(',');

  var r = rgb[0], g = rgb[1], b = rgb[2];

  // Convert RGB to HSL
  // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
  r /= 255.0;
  g /= 255.0;
  b /= 255.0;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2.0;

  if(max == min) {
      h = s = 0;  //achromatic
  } else {
      var d = max - min;
      s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

      if(max == r && g >= b) {
          h = 1.0472 * (g - b) / d ;
      } else if(max == r && g < b) {
          h = 1.0472 * (g - b) / d + 6.2832;
      } else if(max == g) {
          h = 1.0472 * (b - r) / d + 2.0944;
      } else if(max == b) {
          h = 1.0472 * (r - g) / d + 4.1888;
      }
  }

  h = h / 6.2832 * 360.0 + 0;

  // Shift hue to opposite side of wheel and convert to [0-1] value
  h+= 180;
  if (h > 360) { h -= 360; }
  h /= 360;

  // Convert h s and l values into r g and b values
  // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
  if(s === 0){
      r = g = b = l; // achromatic
  } else {
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255); 
  b = Math.round(b * 255);

  // Convert r b and g values to hex
  rgb = b | (g << 8) | (r << 16); 
  return "#" + (0x1000000 | rgb).toString(16).substring(1);
};

function shadeColor (color, percent) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}
