var quotes_data;
var articles_data;

$(document).ready(function() {

  $.ajax({
    type: 'get',
    url: '/Qquotes',
    async: false,
    success: loadQuotes
  });

  $.ajax({
    type: 'get',
    url: '/Qarticles',
    async: false,
    success: loadArticles
  });

  function loadQuotes(data) {
    quotes_data = data.quotes;
  };

  function loadArticles(data) {
    articles_data = data.articles;
  };

  console.log("all quotes recieved: ", quotes_data);
  console.log("all articles recieved: ", articles_data);

  pushQuotes();

  function pushQuotes() {
    var index = quotes_data.length - 1;

    for (i = index; i > index - 5; i--) {
      var tempQtId = "#quote-" + (i - (index - 1));
      var tempQttId = "#quote-" + (i - (index - 1)) + "-tag";

      console.log("QuoteID text: ", tempQtId);
      console.log("QuoteID tag: ", tempQttId);

      //$().html(quotes_data[i].quote);
      //$().html(quotes_data.first_name + " " quotes_data.last_name + ", " quotes_data.policy);
    }
  };
});
