var request = require('request');
var cheerio = require('cheerio');

module.exports = {

  //url list
  url : {
    india : "http://medhajnews.in/en/india/",
    governance : "http://medhajnews.in/en/governance/",
    world : "http://medhajnews.in/en/world/",
    olympic : "http://medhajnews.in/en/olympic/",
    cricket : "http://medhajnews.in/en/cricket/",
    football : "http://medhajnews.in/en/football/",
    entertainment : "http://medhajnews.in/en/Entertainment/",
    energizing_india : "http://medhajnews.in/en/energyizing_india/",
    science_tech : "http://medhajnews.in/en/science_technology/",
    business_econ : "http://medhajnews.in/en/business_economy/",
    videos : "http://medhajnews.in/en/video/",
    life : "http://medhajnews.in/en/Life360/",
    health : "http://medhajnews.in/en/health/",
    fashion : "http://medhajnews.in/en/fashion/",
    tour : "http://medhajnews.in/en/tour/"
  },

  getList : function (req, res, url) {
    request(url, function(error, response, html) {
      if(error) {
        res.writeHead(response.statusCode, {'Content-Type': 'text;charset=utf-8'});
        console.error("Application Failure: %j\t%j", error, response.statusCode);
        res.end('Application Error');
        return;
      } else {
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        var $ = cheerio.load(html);
        var list = [];
        $('.cat_fig').each(function() {
          list.push({
            id : parseInt($(this).children().eq(0).attr('href').toString().split("--")[1]),
            url : $(this).children().eq(0).attr('href').toString(),
            image : $(this).children().eq(0).children().eq(0).attr('src').toString(),
            title : $(this).children().eq(1).children().eq(0).text().toString()
          });
        })
        res.end(JSON.stringify(list));
      }
    })
  }
};
