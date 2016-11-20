"use strict";

var PDFDocument = require ('pdfkit');
var fs = require('file-system');
 
module.exports.genratePdf = function(data){
    var doc = new PDFDocument();
    console.log("Inside pdf genrator"+JSON.stringify(data));
    // Pipe its output somewhere, like to a file or HTTP response 
// See below for browser usage 
var filePath = data.reportPath;
var fileName = filePath.split("/")[2];
doc.pipe(fs.createWriteStream("test_reports/"+fileName));
 
doc.moveTo(300, 75)
   .lineTo(373, 301)
   .lineTo(181, 161)
   .lineTo(419, 161)
   .lineTo(227, 301)
   .fill('red', 'even-odd');  
   
var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in...';  

doc.y = 320;
doc.fillColor('black')
doc.text(loremIpsum, {
   paragraphGap: 10,
   indent: 20,
   align: 'justify',
   columns: 2
});  
 
// Finalize PDF file 
doc.end();
}