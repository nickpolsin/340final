$(function() {
  var dc_data = {
    clinton_dc_bar: 1769,
    sanders_dc_bar: 1499,
    trump_dc_bar: 1239,
    cruz_dc_bar: 559,
    kasich_dc_bar: 161
  };

  var i = 0;

  for (var prop in dc_data) {
    if (i < 2) {
      $("#" + prop).css("width", "" + (dc_data[prop] / 11.915));
    } else {
      $("#" + prop).css("width", "" + (dc_data[prop] / 6.185));
    }

    i++;
  };
});
