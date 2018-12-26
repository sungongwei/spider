const cheerio = require('cheerio'); 
//Node.js 版的jQuery
const async = require('async'); 
 
const fs = require('fs');
//fs操作IO
const url = require('url');

var http = require("https");
var txt = null;
fs.open('F:/1.txt', 'a+', (err,fd)=>{
    if(!err){
        txt =fd;
    }else{
        console.log('open file err'+err)
    }
})

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
download();
//调用

