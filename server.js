var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var app     = express();

var latest = require('./latest_news.js');
var list_scraper = require('./list_scraper.js');
var search_scraper = require('./search_scraper.js');
var article_scraper = require('./article_scraper.js');

//todo: implement pagination
//todo: implement search
var port = process.env.PORT || 9090;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/article', function(req, res) {
  article_scraper.getArticle(req, res, req.body.url);
})


app.get('/india/:page', function(req, res) {
  list_scraper.getList(req, res, list_scraper.url.india);
})

app.get('/latest', function(req, res){
  latest.data(req, res);
})

app.get('/world/:page', function(req, res){
  list_scraper.getList(req, res, list_scraper.url.world);
})

app.get('/olympic/:page', function(req, res){
  list_scraper.getList(req, res, list_scraper.url.olympic);
})

app.get('/cricket/:page', function(req, res){
  list_scraper.getList(req, res, list_scraper.url.cricket);
})

app.get('/football/:page', function(req, res){
  list_scraper.getList(req, res, list_scraper.url.football);
})

app.get('/science/:page', function(req, res){
  list_scraper.getList(req, res, list_scraper.url.science_tech);
})

app.get('/search/:query', function(req, res){
  // search on website uses cookies, no easy way to implement it for a sample app backend
  // all queries return all articles
  // search_scraper.search(req, res);
  list_scaper.getList(req, res, "http://medhajnews.in/en/search_article.php");
})

app.get('/ads', function(req, res){
  ads(req, res);
})

app.get('/photos', function(req, res) {
  photos(req, res);
})

app.listen(port)

function photos(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
  latest_photos = [];
  var comment1 = {
    "id" : 12321,
    "body" : "apkuploadplznow",
    "user" : 143
  }
  for(var i=0; i < 5; i++) {
      latest_photos.push({
        id : 123 + i,
        url : "google.com",
        content : ["Bollywood male actors may not be as loyal partner but when it comes to their love for kids, these bollywood stars do present themselves as the best fathers. They know that they are star for the world but family comes first and hence they do their bit for kids. Have a look at bollywoods top fathers.",
      "No list in complete without the ultimate Shehanshah, The big B! Having played the cantankerous Bhaskor Banerjee in Piku, he is quite the opposite in real life. Father to daughter Shweta Nanda and son Abhishek Bachchan and now grandfather to Navya Naveli, Agastya Nanda and Aaradhya Bachchan.",
    "Surprised? He may not be an Actor-Parent but his immense love and dedication for his children is wonderful. He has daughter Pooja Bhatt and son Rahul from his previous marriage and daughters Shaheen Bhatt and Alia Bhatt from his second marriage to Soni Razdan. We absolutely admire the way he takes a stand everytime his children are bullied. The way he openly spoke against the ‘Udta Punjab ban’ or when the ‘Dumb Alia’ jokes did the rounds. He silenced the trolls and gave out a clear message to not mess with his children! At his wittiest best!",
  "The heartthrob duo is the most dashing father-son team in the B-town. The Kapoor family has maintained their tradition of grooming and present once again a superstar to the industry. As Raj Kapoor did to Rishi, he too has trained Ranbir perfectly on performance and star quotient as well.",
"Though he is in the news for his controversial divorce to wife Sussanne and alleged relationship with Kangana Ranaut, this hasn’t stopped him from being a hands on dad to his sons Hrehaan and Hridhaan. Though his sons live with their mother, Hrithik has visitation rights and often whisks them away for holidays abroad and indulges them with food and movies when in the city.",
"He is the best in everything he does, including parenthood! King Khan is a doting parent to his 3 children Aryan, Suhana and AbRam. From helping do their homework, to having his children accompany him for IPL Matches, picking up fights with anyone who dare touch them, to being their cheerleader at their graduation to loving them so passionately.",
"This Khan superstar is quite protective about his 3 children – Junaid, Ira and Azad. He has Junaid and Ira from his previous marriage to Reema and Azad with current wife Kiran Rao. But this hasn’t deterred him from showering equal amounts of love and affection on all his children. Recently his daughter Ira expressed to go on a Euro trip with her friends and Aamir allowed on a condition that she has to update him every 4 hours."],

        title : "Best B-Town Fathers",
        link_image : ["https://medhaj-staging.s3.amazonaws.com/uploads/photo/data_file/45069/star_dads.png",
      "https://medhaj-staging.s3.amazonaws.com/uploads/photo/share_img/Amitabh_Bachcha.png",
    "https://medhaj-staging.s3.amazonaws.com/uploads/photo/share_img/Alia_father.png",
  "https://medhaj-staging.s3.amazonaws.com/uploads/photo/share_img/Rishi_ranbir.png",
"https://medhaj-staging.s3.amazonaws.com/uploads/photo/share_img/Hrithik_sons.png",
"https://medhaj-staging.s3.amazonaws.com/uploads/photo/share_img/Sharukh_kids.png",
"https://medhaj-staging.s3.amazonaws.com/uploads/photo/share_img/amir_family.png"],
        author : "Ravi Dubey",
        category : "Entertainment",
        language : "en",
        date : "",
        time : "19 Jun",
        likes : 56,
        dislikes : 9,
        comments : [comment1, comment1]
        });
  }
  res.end(JSON.stringify(latest_photos));
}

function ads(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
  latest_ads = [];
  for(var i=0; i < 5; i++) {
      latest_ads.push({
        id : 123 + i,
        url : "apple.com",
        link_image : "https://si.wsj.net/public/resources/images/BN-NF598_ptech0_H_20160323105214.jpg",
        content : "Because if its not an iPhone, its not an iPhone",
        title : "iPhone 7S Plus",
        provider : "Apple"
        });
  }
  res.end(JSON.stringify(latest_ads));
}



console.log('Magic happens on port ' + port);

exports = module.exports = app;
