var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

//todo: remember refractor
var port = process.env.PORT || 9090;
app.get('/india', function(req, res){
  data(req, res);
})

app.get('/latest', function(req, res){
  data(req, res);
})

app.get('/world', function(req, res){
  data(req, res);
})

app.get('/sports', function(req, res){
  data(req, res);
})

app.get('/science', function(req, res){
  data(req, res);
})

app.post('/search', function(req, res){
  data(req, res);
})

app.listen(port)

function data(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
  url = 'http://www.medhajnews.in/en/';

  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);
          console.log('Cheerio loaded HTML');


          var latest_news = [];
      $('.latest_postnav').filter(function(){
          var data = $(this);
          //first news item
          for(var i=0; i < 5; i++) {
              latest_news.push({
                id : data.children().eq(i).children().first().children().first().attr('href').split("--")[1],
                title : data.children().eq(i).text().replace(/\n              /g, "").replace(/  /g, ""),
                category : data.children().eq(i).children().first().children().first().attr('href').split("/")[0],
                language : data.children().eq(i).children().first().children().first().attr('href').split("--")[2],
                link_news : "http://www.medhajnews.in/" + data.children().eq(i).children().first().children().first().attr('href'),
                link_image : data.children().eq(i).children().first().children().first().children().first().attr('src'),
                author : "Mr Incredible",
                time : "9 hours ago",
                date : "19 Jun",
                area : "New Delhi",
                likes : "9",
                dislikes : "6",
                article_content : "Movie Shorgul, based on the Muzzaffarnagar riots of 2013, has been unofficially banned in the western part of Uttar Pradesh.<<>>According to reports, more than two dozens of theatres in Muffarnagar and Meerut have refused to exhibit the movie. The theatres cited security reasons for not running the Shorgul, scheduled to release on June 24, in their cinema halls.<<>>Manoj Vjpayee, district entertainer officer, pointed out that none the single-small screen cinema halls and multiplex in Muffarnagar had seek approached him to seek permission for exhibiting the film.<<>>Meanwhile, BJP MLA Sangeet Som expressed anger over the story of Shorgul. He reiterated that the director and producers were damaging the reputation of Muffarnagar. "
              });
          }
          console.log('JSON ready');

      })
  }
  res.end(JSON.stringify(latest_news));

      });
}
console.log('Magic happens on port ' + port);

exports = module.exports = app;
