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

  shoveQuotes();
});

function shoveQuotes() {
  var index = quotes_data.length - 1;

  for (i = index; i > index - 5; i--) {
    var tempQtId = "#quote-" + ((index + 1) - i);
    var tempQttId = "#quote-" + ((index + 1)- i) + "-tag";

    var tempTag = quotes_data[i].first_name + " " + quotes_data[i].last_name + ", " + quotes_data[i].policy;

    $(tempQtId).html(quotes_data[i].quote);
    $(tempQttId).html(tempTag);
  }
};
