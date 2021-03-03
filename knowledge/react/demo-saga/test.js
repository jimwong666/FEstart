const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer(function (req, res) {
    // if(req.url=="/favicon.ico"){
    //     let faviconName = path.resolve(__dirname, "favicon.png");
    //     console.log(faviconName);
    //     fs.readFile(faviconName, function(err, data){ // readFile读取文件
    //         res.end(data);
    //     })
    //     return;
    // };
    
    const method = req.method.toUpperCase();
    switch(method){
        case "GET":
            // let getDate = url.parse(req.url, true).query;
            // const fileName = path.resolve(__dirname, "resources", String(getDate.name));
            const fileName = path.resolve(__dirname, req.url.replace(/\//, "./"));
            const stream = fs.createReadStream(fileName); // stream读取文件

            stream.pipe(res);

            break;
        case "POST":
            let postDate = "";
        
            req.on("data", function(chunk){
                postDate += chunk.toString();
            })
    
            req.on("end", function(){
                if(postDate){
                    res.setHeader("Content-type", "application/json");
                    res.end(JSON.parse(postDate));
                } else {
                    res.end({errcode: 0});
                }
            })

            break;
    }
});
server.listen(8010);