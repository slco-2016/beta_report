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


// Make sure that when you click on the cirle it also goes to the href
$(".opt").click(function () {console.log("sss")
  var a = $(this).find("a");
  if (a.length > 0) {
    a = a[0];
    try {
      window.location = $(a).attr('href');
    } catch (e) { console.log("Err: ", e); }
  }
});


$(".block").mouseleave(function () {
  $(".opt").each(function () {
    if ($(this).css("display") !== "none") $(this).hide(); 
  });
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

