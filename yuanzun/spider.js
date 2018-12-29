//Node.js 版的jQuery
var http = require("https");

// const async = require('async'); 
 
const iconv = require('iconv-lite');
const fs = require('fs');
//fs操作IO
const url = require('url');
const cheerio = require('cheerio'); 

var txt = null;
// fs.open('F:/1.txt', 'a+', (err,fd)=>{
//     if(!err){
//         txt =fd;
//     }else{
//         console.log('open file err'+err)
//     }
// })
var charset ='gbk';
var  novelUrl = 'https://www.ddbiquge.cc/';
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
    let  html = await myHttp(novelUrl);
    let $ = cheerio.load(html);
    let node = $("#info");//p:contains('最新章节')
    if(curChapter != node.text()){
        // curChapter =node.text();
        let href = node.attr("p");
          console.log(href);

    }

    console.log(curChapter);
}

    check();

// setInterval(() => {
//     check();
// }, 1000);

