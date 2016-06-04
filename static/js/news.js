var quotes_data;
var articles_data;

var currentArticleIndex;
var currentQuoteIndex;

$("#show-more-quotes").click(function() {
  console.log("next five will start at: ", currentQuoteIndex - 5);
  $(".recent-quotes-container").append("<div id='quote-1-container' class='recent-quote-container'><p id='quote-1' class='quotes-text'>THIS IS A TEST</p><p id='quote-1-tag' class='quote-tag'>TESTING THE TAG</p></div>");
});

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

  shoveArticles();
  shoveQuotes();
});

function shoveArticles() {
  var index = articles_data.length - 1;

  for (i = index; i > index - 3; i--) {
    var tempAtleImgId = "#news-img-" + ((index + 1) - i);
    var tempAtleTagId = "#news-tag-" + ((index + 1)- i);

    var tempImgSource;
    if (articles_data[i].publisher == "ABC News") {
      tempImgSource = "resources/img/abc.jpg";
    } else if (articles_data[i].publisher == "New York Times") {
      tempImgSource = "resources/img/nyt.png";
    }

    var tempTag = "<b>" + articles_data[i].title + "</b><br>by: " + articles_data[i].author_fn.toLowerCase() + " " + articles_data[i].author_ln.toLowerCase() + ", published: " + articles_data[i].pub_date.substr(0, 6);

    $(tempAtleImgId).attr("src", tempImgSource);
    $(tempAtleTagId).html(tempTag);
  }

  currentArticleIndex = index - 3;
  console.log("current article index: ", currentArticleIndex);
};

function shoveQuotes() {
  var index = quotes_data.length - 1;

  for (i = index; i > index - 5; i--) {
    var tempQtId = "#quote-" + ((index + 1) - i);
    var tempQttId = "#quote-" + ((index + 1)- i) + "-tag";

    var tempTag = quotes_data[i].first_name + " " + quotes_data[i].last_name + ", " + quotes_data[i].policy;

    $(tempQtId).html(quotes_data[i].quote);
    $(tempQttId).html(tempTag);
  }

  currentQuoteIndex = index - 5;
  console.log("current quote index: ", currentQuoteIndex);
};
