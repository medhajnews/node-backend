request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        console.log('Cheerio loaded HTML');

    $('.latest_postnav').filter(function(){
        var data = $(this);
        //first news item
        for(var i=0; i < 5; i++) {
          news_links.push()
          latest_news.push({
            id : data.children().eq(i).children().first().children().first().attr('href').split("--")[1],
            title : data.children().eq(i).text().replace(/\n              /g, "").replace(/  /g, ""),
            category : data.children().eq(i).children().first().children().first().attr('href').split("/")[0],
            language : data.children().eq(i).children().first().children().first().attr('href').split("--")[2],
            link_news : url + data.children().eq(i).children().first().children().first().attr('href'),
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
        for(var k=0; k < len; k++) {
          request(latest_news[k].link_news, function(err, response, html){
            if(!err){
              var $ = cheerio.load(html);

              $('.single_page').filter(function(){
                var data = $(this);
                latest_news[k].time = data.children().eq(2).children().eq(1).text();
                latest_news[k].author = data.children().eq(2).children().eq(0).text().replace(/\n/g, "").replace("              ","").replace("               ","");
                latest_news[k].area = data.children().eq(3).children().eq(1).text();
                for(var j=0; j < data.children().eq(3).children("p").slice(1,-1).length; j++) {
                  latest_news[k].article_content = latest_news[k].article_content +  data.children().eq(3).children("p").slice(1,-1)[j];
                }
              })
              console.log(latest_news);
            }
          }.bind(null, latest_news));
        }
        console.log('JSON ready');
    })
}
res.end(JSON.stringify(latest_news));

    });
