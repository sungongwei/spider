//Node.js 版的jQuery
const http     = require("https");
const email    = require('./email');
const schedule = require('node-schedule');
const iconv    = require('iconv-lite');
const fs       = require('fs');
const url      = require('url');
const cheerio  = require('cheerio');

var txt = null;
// fs.open('F:/1.txt', 'a+', (err,fd)=>{
//     if(!err){
//         txt =fd;
//     }else{
//         console.log('open file err'+err)
//     }
// })
var charset ='gbk';
var  novelUrl = 'https://www.farpop.com/';
function  myHttp(url){
    let promise=new Promise(function (resolve, reject) {
        let req=http.get(url)
         req.on("response",function (res) {
             let data=[];
             let length=0;
             res.on("data",function (chunk) {
                data.push(chunk);
                length += chunk.length;
             });
             res.on('end', function(msg){
                 data = Buffer.concat(data,length);
                 data = iconv.decode(data,charset);
                 resolve(data.toString())
             })
         });
    })
    return promise;
}
async function download() {
    for(var i =1 ;i<=521;i++){
        novelUrl = 'https://www.seego.co/novel/woheaojiaokongjiedehuangdaoshenghuo/read_'+i+'.html';
        let html =await myHttp(novelUrl);
        let $ = cheerio.load(html);
        let chapter =  $('h1').text();
        chapter=chapter.substr(12);
        let content =  $('#chaptercontent').text();
        content = content.substr(36)
        fs.writeFileSync(txt, chapter+'\r\n' ,{ 'flag': 'a' });
        fs.writeFileSync(txt, content+'\r\n' ,{ 'flag': 'a' });
        console.log('success'+i);

    }
}
// download();
//调用
var curChapter = '';
async function check (){
    var  html = await myHttp(novelUrl);
    var $ = cheerio.load(html);
    var node = $("#info p").last();//p:contains('最新章节')
    if(curChapter != node.text()){

        console.log('get new chapter');
        
        curChapter =node.text();
        var href = node.children().attr('href');
        html =await myHttp(href);
        $ = cheerio.load(html);
        var data ={
            'subject':$('.bookname h1').text(),
            'content':$('#content').text(),
        }
        console.log('send email');
        email.send(data);
    }
}

    // check();

schedule.scheduleJob('0 */10 0-2,12-23 * * *',()=>{
    check();
});

