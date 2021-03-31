const cheerio = require('cheerio')
const request = require('request')
const colors = require('colors')
const mongoose = require('mongoose')
const Article = require('../models/Article')



 function proxyGenerator() {
   let ip_addresses = [];
   let port_numbers = [];
   let proxy;
 
    request("https://sslproxies.org/", function(error, response, html) {
     if (!error && response.statusCode == 200) {
       const $ = cheerio.load(html);
 
       $("td:nth-child(1)").each(function(index, value) {
         ip_addresses[index] = $(this).text();
       });
 
       $("td:nth-child(2)").each(function(index, value) {
         port_numbers[index] = $(this).text();
       });
     } else {
       console.log("Error loading proxy, please try again");
     }
 
     ip_addresses.join(", ");
     port_numbers.join(", ");

  let random = Math.floor(Math.random() * 100)
   proxy = `http://${ip_addresses[random]}:${port_numbers[random]}`;
   console.log(proxy)
})}

exports.update = async function(){
  setInterval(async function() {
  const articles = []
  const options = {
    url: "https://news.google.com/topstories?hl=it&gl=IT&ceid=IT:it",
    method: "GET",
    proxy: proxyGenerator()
  };
  //#region requestsItaly
  //top italy
 request(options, async  function(error, response, html) { 
   if (!error && response.statusCode == 200) {
     const $ = cheerio.load(html);
     let articles_header = $(".DY5T1d").each((index, value) => {
        articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'topItaly', language: 'italian'})
     });
   } else {
     console.log("Error scraping site, please try again".red.inverse);
   }
   console.log(articles.length)
 });

//italy
 options.url = "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRE55YW1vU0FtbDBLQUFQAQ?hl=it&gl=IT&ceid=IT%3Ait"
  
 request(options, async  function(error, response, html) {
   if (!error && response.statusCode == 200) {
     const $ = cheerio.load(html);
     let articles_header = $(".DY5T1d").each((index, value) => {
        articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'italy', language: 'italian'})
     });
   } else {
     console.log("Error scraping site, please try again".red.inverse);
   }
   console.log(articles.length)
 });

//world 

 options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtbDBHZ0pKVkNnQVAB?hl=it&gl=IT&ceid=IT%3Ait"

 request(options, async  function(error, response, html) {
   if (!error && response.statusCode == 200) {
     const $ = cheerio.load(html);
     let articles_header = $(".DY5T1d").each((index, value) => {
        articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'world', language: 'italian'})
     });
   } else {
     console.log("Error scraping site, please try again".red.inverse);
   }
   console.log(articles.length)
 })

//economy
 options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtbDBHZ0pKVkNnQVAB?hl=it&gl=IT&ceid=IT%3Ait"

 request(options, async function(error, response, html) {
   if (!error && response.statusCode == 200) {
     const $ = cheerio.load(html);
     let articles_header = $(".DY5T1d").each((index, value) => {
        articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'economy', language: 'italian'})
     });
   } else {
     console.log("Error scraping site, please try again".red.inverse);
   }
   console.log(articles.length)
 })

 options.url = "https://news.google.com/topics/CAAqKAgKIiJDQkFTRXdvSkwyMHZNR1ptZHpWbUVnSnBkQm9DU1ZRb0FBUAE?hl=it&gl=IT&ceid=IT%3Ait"

 //science tech
 request(options, async  function(error, response, html) {
   if (!error && response.statusCode == 200) {
     const $ = cheerio.load(html);
     let articles_header = $(".DY5T1d").each((index, value) => {
        articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'science-technology', language: 'italian'})
     });
   } else {
     console.log("Error scraping site, please try again".red.inverse);
   }
   console.log(articles.length)
 })

 //health
 options.url = "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtbDBLQUFQAQ?hl=it&gl=IT&ceid=IT%3Ait"

 request(options, async  function(error, response, html) {
   if (!error && response.statusCode == 200) {
     const $ = cheerio.load(html);
     let articles_header = $(".DY5T1d").each((index, value) => {
        articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'health', language: 'italian'})
     });
   } else {
     console.log("Error scraping site, please try again".red.inverse);
   }
   console.log(articles.length)
 })

  //sports
  options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtbDBHZ0pKVkNnQVAB?hl=it&gl=IT&ceid=IT%3Ait"

  request(options, async function(error, response, html) {

    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'sport', language: 'italian'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    
  })
  //#endregion

  //#region usa
  options.url= "https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en"

  //top usa
  request(options, async  function(error, response, html) { 
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'topUsa', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  });
 
 //usa
  options.url = "https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen"
   
  request(options, async  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'usa', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  });
 
 //world 
 
  options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
 
  request(options, async  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'world', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  })
 
 //economy
  options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
 
  request(options, async function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'economy', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  })
 
  options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
 
  //science tech
  request(options, async  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'technology', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  })
 
  options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
 
  //science tech
  request(options, async  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'science', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  })
 
  //health
  options.url = "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-US&gl=US&ceid=US%3Aen"
 
  request(options, async  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let articles_header = $(".DY5T1d").each((index, value) => {
         articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'health', language: 'usa'})
      });
    } else {
      console.log("Error scraping site, please try again".red.inverse);
    }
    console.log(articles.length)
  })
 
   //sports
   options.url = "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
 
   request(options, async function(error, response, html) {
 
     if (!error && response.statusCode == 200) {
       const $ = cheerio.load(html);
       let articles_header = $(".DY5T1d").each((index, value) => {
          articles.push({header: $(value).text(), link: "https://news.google.com" + $(value).attr('href').replace('.', ''), type: 'sport', language: 'usa'})
       });
     } else {
       console.log("Error scraping site, please try again".red.inverse);
     }
     //#endregion
    console.log(articles.length)
    await Article.deleteMany()
    await Article.create(articles)
    })
}, 60000);
}


  
