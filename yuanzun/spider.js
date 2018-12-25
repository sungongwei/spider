const cheerio = require('cheerio'); 
//Node.js 版的jQuery
const async = require('async'); 
 
const fs = require('fs');
//fs操作IO
const url = require('url');

var http = require("https");

var  novelUrl = '';
function  myHttp(url){
    let promise=new Promise(function (resolve, reject) {
        let req=http.get(url)
         req.on("response",function (res) {
             let finalData='';
             res.on("data",function (data) {
                 finalData+=data;
             });
             res.on('end', function(date){
                 resolve(finalData.toString())
             })
         });
    })
    return promise;
}
async function download() {
    for(var i =1 ;i<=1;i++){
        novelUrl = 'https://www.seego.co/novel/woheaojiaokongjiedehuangdaoshenghuo/read_'+3+'.html';
        let html =await myHttp(novelUrl);
        let $ = cheerio.load(html);
        let chapter =  $('h1').text();
        let content =  $('#chaptercontent').text();
        
        console.log();

    }
}
download();
//调用
