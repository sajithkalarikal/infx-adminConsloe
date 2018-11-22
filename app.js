var express = require('express');
const XLSX = require('xlsx')
//var json2xls = require('json2xls');//
const Json2csvParser = require('json2csv').Parser;
var fs = require('fs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var filename = 'C:/Users/skalarikal/Desktop/prtotype final/Threshold_Alerts_Ref_Table.csv';//file path//
//var filename = 'C:/Users/skalarikal/Desktop/prtotype final/Threshold_Alerts_Ref_Table_1.xls'; //file path//
var json_object = [];

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//app.use(json2xls.middleware);//

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.render('index.html')
});

app.post('/updateXML', function (req, res) {
  
  console.log("post..............",req.body.data);
  new_object = JSON.parse(req.body.data);
  console.log(typeof new_object);
 // var xls = json2xls(new_object);//
 const parser = new Json2csvParser({});
 const csv = parser.parse(new_object);
  fs.writeFileSync(filename, csv, 'binary');
  
  res.send(200);
});

function ReadFilefromCSV (){ 
 const workbook = XLSX.readFile(filename);
  const sheet_name_list = workbook.SheetNames;

  json_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
	
};

app.get('/getDataFromFile', function (req, res) {
	ReadFilefromCSV ();
  res.send(200, json_object);
  console.log("get........",json_object)
});

app.use(express.static(path.join(__dirname, 'public')));

/* 
var http = require("http")
var port = 3000;

http.createServer(function(req,resp){resp.writehead(200,{"content-type":"text/html"});
resp.end()};) */

app.listen(3000, function() {
	ReadFilefromCSV ();
  console.log('Trying to read a xls file on port 3000...', filename);
  

  console.log("applisen............",json_object);
});

