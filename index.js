var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");
var util = require("util");
var app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public/"));

var conn = mysql.createConnection({
    "host":"bw2lg6invrqnscgvq1kz-mysql.services.clever-cloud.com",
    "user":"uqjqtc2a54mtlooj",
    "password":"CfeONbGUbjd6ibWMIa0O",
    "database":"sandip_hotel"
});

var exe = util.promisify(conn.query).bind(conn);

app.get("/",function(req,res){
    res.render("home.ejs");
});

app.get("/menu_card",async function(req,res){
    var data = await exe(`SELECT * FROM product`);
    var obj = {"products":data};
    res.render("menu_card.ejs",obj);
});

app.post("/save_menu_card",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO product(product_name,product_type,product_price) VALUES ('${d.product_name}','${d.product_type}','${d.product_price}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/menu_card");
});

app.get("/billing",async function(req,res){
    var data1 = await exe(`SELECT * FROM bill`);
    var obj ={"bills":data1};
    res.render("billing.ejs",obj);
});

app.post("/save_bill",async function(req,res){
    var d = req.body;
    var sql =`INSERT INTO bill(product_name,product_price,product_qty,product_total) VALUES ('${d.product_name}','${d.product_price}','${d.product_qty}','${d.product_total}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/billing");
});

app.get("/employees",async function(req,res){
    var data2 = await exe(`SELECT * FROM employee`);
    var obj = {"employees":data2};
    res.render("employees.ejs",obj);
});

app.post("/save_employee",async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO employee(employee_name,employee_mobile,employee_type) VALUES ('${d.employee_name}','${d.employee_mobile}','${d.employee_type}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/employees");
});

app.listen(1000);
