const project = "random-quote-machine";
localStorage.setItem("proj_name","quote-generator");
let quotesdata;


function currFrame()
{
  return window.self!== window.top;
}

var colors = ['#6465a45','#5b5ea6','#009b77','#efc050','#45b8ac','#9b2335','#e08119',
 '#f96714','#2a293e','#9e379f','#e86af0','#ffaaa5','#ff8b94'];

var author = "";
var quote = "" ;

function getQuotes()
{
  return $.ajax({
    headers :{
      accept : "application/json"
    },
    url : 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success : function(recQuotes) {
      if(typeof recQuotes === 'string') {
          quotesdata = JSON.parse(recQuotes);
          console.log("received : " +recQuotes);
        }
    }
  });
}

function randomQuote()
{
  return quotesdata.quotes[Math.floor(Math.random()*quotesdata.quotes.length)];
}

function getQuote()
{
  var randomQ = randomQuote();
  
  quote = randomQ.quote;
  author = randomQ.author;
  
  if(currFrame)
    {
      $('#tweet-quote').attr('href','https://twitter.com/intent/tweet?hashtags=quotes&text='+encodeURIComponent('" '+quote+' " - '+author));
      
        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  }

  $(".quote-text").animate(
    { opacity : 0},
    500,
    function(){
      $(this).animate(
      {opacity:1},500);
      $("#text").text(quote);
    }
  );

  $(".quote-author").animate(
  {opacity:0}
  ,500,
  function(){
    $(this).animate({opacity:1},500);
    $("#author").html(author);
  });
  
  var color = Math.floor(Math.random()*colors.length);
  console.log(color);
  $("html body").animate(
  {
    backgroundColor : colors[color],
    color : colors[color]
  },750);
  
  $(".button").animate(
  {
    backgroundColor : colors[color]
  },1000);

}

$(document).ready( function(){
 getQuotes().then(()=> {getQuote();}); 
  
  
  $("#new-quote").on('click',getQuote);
  
  $("#tweet-quote").on('click',function(){
    if(!currFrame()){
      openURL("https://twitter.com/intent/tweet?hashtags=quotes&text="+encodeURIComponent('" '+quote+' " -'+author));
    }
  });
   $('#tumblr-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  });
  
});
