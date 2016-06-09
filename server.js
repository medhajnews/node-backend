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

    $('.latest_postnav').filter(function(){
        var data = $(this);
        //first news item
        console.log(data.children().first().text().replace(/\n              /g, "").replace(/  /g, ""));
        first = {
          title : data.children().eq(0).text().replace(/\n              /g, "").replace(/  /g, ""),
          category : data.children().eq(0).children().first().children().first().attr('href').split("/")[0],
          linkk_news : data.children().eq(0).children().first().children().first().attr('href'),
          link_image : data.children().eq(0).children().first().children().first().children().first().attr('src'),
        };

        second = {
          title : data.children().eq(1).text().replace(/\n              /g, "").replace(/  /g, ""),
          category : data.children().eq(1).children().first().children().first().attr('href').split("/")[0],
          linkk_news : data.children().eq(1).children().first().children().first().attr('href'),
          link_image : data.children().eq(1).children().first().children().first().children().first().attr('src'),
        };

        third = {
          title : data.children().eq(2).text().replace(/\n              /g, "").replace(/  /g, ""),
          category : data.children().eq(2).children().first().children().first().attr('href').split("/")[0],
          linkk_news : data.children().eq(2).children().first().children().first().attr('href'),
          link_image : data.children().eq(2).children().first().children().first().children().first().attr('src'),
        };

        fourth = {
          title : data.children().eq(3).text().replace(/\n              /g, "").replace(/  /g, ""),
          category : data.children().eq(3).children().first().children().first().attr('href').split("/")[0],
          linkk_news : data.children().eq(3).children().first().children().first().attr('href'),
          link_image : data.children().eq(3).children().first().children().first().children().first().attr('src'),
        };

        fifth = {
          title : data.children().eq(4).text().replace(/\n              /g, "").replace(/  /g, ""),
          category : data.children().eq(4).children().first().children().first().attr('href').split("/")[0],
          linkk_news : data.children().eq(4).children().first().children().first().attr('href'),
          link_image : data.children().eq(4).children().first().children().first().children().first().attr('src'),
        };
        console.log('Got Data!');

        json.first = first;
        json.second = second;
        json.third = third;
        json.fourth = fourth;
        json.fifth = fifth;

        console.log('JSON ready');

    })
}
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//
//
//     console.log('JSON response sent');
//
// })

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
// res.send('Check your console!')
res.end(JSON.stringify(json));

    }) ;
})
app.listen(port)

console.log('Magic happens on port ' + port);

exports = module.exports = app;
