var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  data: function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    url = 'http://www.medhajnews.in/en/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            console.log('Cheerio loaded HTML');

            var comment1 = {
              "id" : 12321,
              "body" : "apkuploadplznow",
              "user" : 143
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
                  url : "http://www.medhajnews.in/" + data.children().eq(i).children().first().children().first().attr('href'),
                  link_image : [data.children().eq(i).children().first().children().first().children().first().attr('src')],
                  author : "Mr Incredible",
                  time : "9 hours ago",
                  date : "19 Jun",
                  area : "New Delhi",
                  likes : 9,
                  comments : [comment1, comment1],
                  dislikes : 6,
                  type : "large",
                  content : "Movie Shorgul, based on the Muzzaffarnagar riots of 2013, has been unofficially banned in the western part of Uttar Pradesh.<<>>According to reports, more than two dozens of theatres in Muffarnagar and Meerut have refused to exhibit the movie. The theatres cited security reasons for not running the Shorgul, scheduled to release on June 24, in their cinema halls.<<>>Manoj Vjpayee, district entertainer officer, pointed out that none the single-small screen cinema halls and multiplex in Muffarnagar had seek approached him to seek permission for exhibiting the film.<<>>Meanwhile, BJP MLA Sangeet Som expressed anger over the story of Shorgul. He reiterated that the director and producers were damaging the reputation of Muffarnagar. "
                });

                latest_news.push({
                  id : data.children().eq(i).children().first().children().first().attr('href').split("--")[1],
                  title : data.children().eq(i).text().replace(/\n              /g, "").replace(/  /g, ""),
                  category : data.children().eq(i).children().first().children().first().attr('href').split("/")[0],
                  language : data.children().eq(i).children().first().children().first().attr('href').split("--")[2],
                  url : "http://www.medhajnews.in/" + data.children().eq(i).children().first().children().first().attr('href'),
                  link_image : [data.children().eq(i).children().first().children().first().children().first().attr('src')],
                  author : "Mr Incredible",
                  time : "9 hours ago",
                  date : "19 Jun",
                  area : "New Delhi",
                  likes : 9,
                  comments : [comment1, comment1],
                  dislikes : 6,
                  type : "tiny",
                  content : "Movie Shorgul, based on the Muzzaffarnagar riots of 2013, has been unofficially banned in the western part of Uttar Pradesh.<<>>According to reports, more than two dozens of theatres in Muffarnagar and Meerut have refused to exhibit the movie. The theatres cited security reasons for not running the Shorgul, scheduled to release on June 24, in their cinema halls.<<>>Manoj Vjpayee, district entertainer officer, pointed out that none the single-small screen cinema halls and multiplex in Muffarnagar had seek approached him to seek permission for exhibiting the film.<<>>Meanwhile, BJP MLA Sangeet Som expressed anger over the story of Shorgul. He reiterated that the director and producers were damaging the reputation of Muffarnagar. "
                });
            }
            console.log('JSON ready');

        })
    }
    res.end(JSON.stringify(latest_news));

        });
  }
};
