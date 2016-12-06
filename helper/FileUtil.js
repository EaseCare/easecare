var fs = require('fs');
 

module.exports.isFileExist = function(path, inputFileName, cb){
    var pwd = __dirname;
    var pathPre = pwd.split("/helper")[0];
    var path = pathPre+path;
    console.log("the path i got is"+path);
    fs.readdir(path, function(err, items) {
        console.log("items are"+JSON.stringify(items)+" inputName = "+inputFileName);
        var result = items.indexOf(inputFileName.toString());
        return cb(null, result);
    });
}

module.exports.readDir = function(path, host, cb){
    var pwd = __dirname;
    var pathPre = pwd.split("/helper")[0];
    var newPath = pathPre+path;
    fs.readdir(newPath, function(err, items) {
        var fileArray = [];
        items.forEach(function(item){
            var itemPath = host+path+item;
            fileArray.push(itemPath);
        });
        return cb(null, fileArray);
    });
}