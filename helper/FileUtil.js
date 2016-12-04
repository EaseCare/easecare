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