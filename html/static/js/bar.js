var count_data;

$(document).ready(function() {
  $.ajax({
    type: 'get',
    url: '/Qcounts',
    async: false,
    success: loadCounts
  });

  for (i = 0; i < count_data.length; i++) {
    var barId = "#" + count_data[i].last_name.toLowerCase() + "_dc_bar";
    var textId ="#" + count_data[i].last_name.toLowerCase() + "_count";
    var count = parseInt(count_data[i].count);

    $(textId).html(count);

    if (i < 2) {
      $(barId).css("width", "" + (count / 11.915));
    } else {
      $(barId).css("width", "" + (count / 6.185));
    }
  };
});

function loadCounts(data) {
  count_data = data.candidates;
  console.log("applying data to own variable", count_data);
};
