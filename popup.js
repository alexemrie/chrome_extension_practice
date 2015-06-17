$(document).ready(function(){
  $("#header").on("click", function(){
    $(this).toggleClass("Enabled");
    if ($(this).hasClass("Enabled")) {
      $("#statusDetail").html('Study Mode Enabled');
    } else {
      $("#statusDetail").html('Study Mode Disabled');
    }
  });
  console.log("Accessed popup js");
})
