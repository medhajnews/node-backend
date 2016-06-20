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

app.listen(port)

function data(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
  url = 'http://www.medhajnews.in';

  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);
          console.log('Cheerio loaded HTML');


          var latest_news = [];
      $('.latest_postnav').filter(function(){
          var data = $(this);
          //first news item
          for(var i=0; i < 25; i++) {
            if(i<5) {
              latest_news.push({
                id : data.children().eq(i).children().first().children().first().attr('href').split("--")[1],
                title : data.children().eq(i).text().replace(/\n              /g, "").replace(/  /g, ""),
                category : data.children().eq(i).children().first().children().first().attr('href').split("/")[0],
                language : data.children().eq(i).children().first().children().first().attr('href').split("--")[2],
                link_news : "http://www.medhajnews.in/" + data.children().eq(i).children().first().children().first().attr('href'),
                link_image : data.children().eq(i).children().first().children().first().children().first().attr('src'),
                author : "Mr Incredible",
                time : "19 Jun",
                area : "New Delhi",
                likes : "9",
                dislikes : "6",
                article_content : "रघुराम राजन के RBI गवर्नर के पद से रिटायरमेंट की ख़बर का असर आज भारतीय बाज़ार पर दिखा। बाज़ार के शुरु होते ही डॉलर के मुकाबले रूपये 61 पैसे गिरकर 67.09 रूपए के स्तर पर पहुंचा।<<>>भारतीय शेयर बाज़ार में भी शुरुआता में उतार-चढ़ाव देखा गया। बॉम्बे स्टॉक एक्सचेंज (BSE) के शुरुआती दौर में 178.03 अंकों की गिरावट हुई, जिसके साथ BSE 26,447.88 पर पहुंचा। जबकि  नैशनल स्‍टॉक एक्‍सचेंज (NSE) के सोमवार को शुरु होते ही 1.35 अंक की उछाल के साथ 8,171.55 पर पहुंच गया। लेकिन कुछ ही समय बाद NSE में 0.10 प्रतिशत की गिरावट दर्ज की गई।<<>>आपको बता दें कि गत शुक्रवार को भारतीय बाज़ार के बंद होने पर डॉलर के मुकाबले रूपये 13 पैसे की मजबूती के साथ 67.09 रूपए था।"
              });
            } else {
              latest_news.push({
                id : data.children().eq(1).children().first().children().first().attr('href').split("--")[1],
                title : data.children().eq(1).text().replace(/\n              /g, "").replace(/  /g, ""),
                category : data.children().eq(1).children().first().children().first().attr('href').split("/")[0],
                language : data.children().eq(1).children().first().children().first().attr('href').split("--")[2],
                link_news : "http://www.medhajnews.in/" + data.children().eq(i).children().first().children().first().attr('href'),
                link_image : data.children().eq(1).children().first().children().first().children().first().attr('src'),
                author : "Mr Incredible",
                time : "19 Jun",
                area : "New Delhi",
                likes : "9",
                dislikes : "6",
                article_content : "रघुराम राजन के RBI गवर्नर के पद से रिटायरमेंट की ख़बर का असर आज भारतीय बाज़ार पर दिखा। बाज़ार के शुरु होते ही डॉलर के मुकाबले रूपये 61 पैसे गिरकर 67.09 रूपए के स्तर पर पहुंचा।<<>>भारतीय शेयर बाज़ार में भी शुरुआता में उतार-चढ़ाव देखा गया। बॉम्बे स्टॉक एक्सचेंज (BSE) के शुरुआती दौर में 178.03 अंकों की गिरावट हुई, जिसके साथ BSE 26,447.88 पर पहुंचा। जबकि  नैशनल स्‍टॉक एक्‍सचेंज (NSE) के सोमवार को शुरु होते ही 1.35 अंक की उछाल के साथ 8,171.55 पर पहुंच गया। लेकिन कुछ ही समय बाद NSE में 0.10 प्रतिशत की गिरावट दर्ज की गई।<<>>आपको बता दें कि गत शुक्रवार को भारतीय बाज़ार के बंद होने पर डॉलर के मुकाबले रूपये 13 पैसे की मजबूती के साथ 67.09 रूपए था।"
              });
            }
          }
          console.log('JSON ready');

      })
  }
  res.end(JSON.stringify(latest_news));

      });
}
console.log('Magic happens on port ' + port);

exports = module.exports = app;
