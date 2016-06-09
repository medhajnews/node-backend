var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

//todo: remember refractor
var port = process.env.PORT || 9090;

app.get('/latest', function(req, res){
res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
url = 'http://www.medhajnews.in';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        console.log('Cheerio loaded HTML');


    var title, category, link_news, link_image;
    var first, second, third, fourth, fifth;
    // var newsObject = { title : "", category : "", link_news : "", link_image : "" };

    var json = {
      first : "",
       second : "",
        third : "",
         fourth : "",
          fifth : ""
        }

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
            author : "",
            time : "",
            area : "",
            likes : "",
            dislikes : "",
            article_content : "",
            inline_image_links : []
          });
        }
        var len = latest_news.length;
        for(var i=0; i < len; i++) {
          request(latest_news[i].link_news, function(err, response, html){
            if(!err){
              var $ = cheerio.load(html);
              console.log('loaded article ' + i);

              $('.single_page').filter(function(){
                var data = $(this);
                latest_news[i].time = data.children().eq(2).children().eq(1).text();
                latest_news[i].author = data.children().eq(2).children().eq(0).text().replace(/\n/g, "").replace("              ","").replace("               ","");
                latest_news[i].area = data.children().eq(3).children().eq(1).text();
                for(var j=0; j < data.children().eq(3).children("p").slice(1,-1).length; j++) {
                  latest_news.article_content = latest_news.article_content +  data.children().eq(3).children("p").slice(1,-1)[i];
                }
              })
            }
          });
        }
        console.log('JSON ready');

    })
}
res.end(JSON.stringify(latest_news));

    });
})
app.listen(port)

console.log('Magic happens on port ' + port);

exports = module.exports = app;
