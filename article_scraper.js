var request = require('request');
var cheerio = require('cheerio');
var sanitizeHtml = require('sanitize-html');
var minify = require('html-minifier').minify;

module.exports = {
  getArticle : function(req, res, url) {
    request(url, function(error, response, html) {
      if(error) {
        res.writeHead(response.statusCode, {'Content-Type': 'text;charset=utf-8'});
        console.error("Application Failure: %j\t%j", error, response.statusCode);
        res.end('Application Error');
        return;
      } else {
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        //MESSSSSSY
        var minhtml = minify(html);
        var $ = cheerio.load(minhtml, {
          normalizeWhitespace : true
        });
        var likes = $('.like-count').text();
        var dislikes = $('.dislike-count').text();
        $('.single_page_content').contents().remove('.img-center').remove('.tab-cnt').remove('.SC_TBlock');
        // $('*').contents().filter(commentFilter).remove();
        var sanitizedhtml = sanitizeHtml($('.single_page_content').html(), {
          allowedTags: ['b', 'p', 'i', 'em', 'strong', 'a', 'img'],
          allowedAttributes: {
            'img' : ['src'],
            'a' : ['href']
          }
        });
        var list = {
          author : $('.post_commentbox').children().eq(0).text().trim(),
          date : $('.post_commentbox').children().eq(1).text().trim(),
          likes : parseInt(likes),
          dislikes : parseInt(dislikes),
          //todo: add more stuff!
          content : sanitizedhtml.toString().replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, "").replace("To download Medhaj News Android app click here. You can also follow us on Facebook and Twitter.", "").trim()
        }
        res.end(JSON.stringify(list));
      }
    })
  }
}

function commentFilter(index, node) {
  return node.type === 'comment';
};
