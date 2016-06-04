$(document).ready(function(){

  $("#article-add").click(function() {
		addArticle();
  });

  function addArticle(){
		var vals = {
      publisher: $("#article-submit-publisher").val(),
      authorfirstname: $("#article-submit-authorfirstname").val(),
      authorlastname: $("#article-submit-authorlastname").val(),
      datepublished: $("#article-submit-datepublished").val(),
      link: $("#article-submit-link").val(),
      title: $("#article-submit-title").val()
    };

		console.log(vals);
    for (var key in vals) {
		  if (vals[key].length == 0) {
			   $("#article-submit-result").html("<p>Please Complete All Items</p>");
      }
    }

		$.post("/Qnewarticle", vals).done(function(data) {
			$("#result").text(data);
		}, "html");
  };
});
