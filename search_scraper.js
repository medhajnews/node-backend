var request = require('request');
var cheerio = require('cheerio');

var url = "http://medhajnews.in/en/"; // we'll post the search
                                      // field on the website and fetch articles
                                      // slow, but will make do.

module.exports = {
  search : function(req, res) {
    request.post(url, {
      form: {
        query : req.params.query,
        button : 'search'
      }
    }, function(error, response, html) {
      if(error) {
        res.writeHead(response.statusCode, {'Content-Type': 'text;charset=utf-8'});
        console.error("Application Failure: %j\t%j", error, response.statusCode);
        res.end('Application Error');
        return;
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
        // var $ = cheerio.load(html);
        // var list = [];
        // $('.cat_fig').each(function() {
        //   list.push({
        //     id : parseInt($(this).children().eq(0).attr('href').toString().split("--")[1]),
        //     url : $(this).children().eq(0).attr('href').toString(),
        //     image : $(this).children().eq(0).children().eq(0).attr('src').toString(),
        //     title : $(this).children().eq(1).children().eq(0).text().toString()
        //   });
        // })
        // res.end(JSON.stringify(list));
      }
    })
  }
}
