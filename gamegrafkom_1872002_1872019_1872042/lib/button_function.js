$(document).ready(function () {
  $("#buttonTerima").on("click", function () {
    if (!pulang && !terima){
      terima = true;
      $(".menu").hide();
    }
  });

  $("#buttonUsir").on("click", function () {
    if (!pulang && !terima){
      pulang = true;
      $(".menu").hide();
    }
  });
});
