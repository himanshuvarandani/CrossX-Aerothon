var express = require('express');
const path = require('path');
const http = require('http');

var nodemailer = require("nodemailer");


var con = require("concurrently");

var nodemon = require("nodemon");
const toobusy = require('toobusy-js');
const cors = require("cors");



var app = express();
const server = http.createServer(app);


const { parse } = require('path');
app.use(function(req, res, next) {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
        next();
    }
});
app.use(cors());




/*app.get('*', function(req, res) {  
    if (req.protocol==="http"){
        
   // res.redirect('https://' + req.headers.host + req.url);
   }

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
})*/



//app.use(helmet.xssFilter());

//toobusy

//exit on exception
const process = require("process")
process.on("uncaughtException", function(err) {
    console.log(err)

    // clean up allocated resources
    // log necessary error details to log files
    process.exit(); // exit the process to avoid unknown state
});

process.on("SIGINT", function(err) {
    console.log(err)

    // clean up allocated resources
    // log necessary error details to log files
    process.exit(); // exit the process to avoid unknown state
});

//do something when app is closing
//process.on('exit', exitHandler.bind(null,{cleanup:true}));

/*[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => { process.on(eventType, cleanUpServer.bind(null, eventType));})*/




const rateLimit = require("express-rate-limit");
const { fstat } = require('fs');
const apiLimiter = rateLimit({
    windowMs: 1.3 * 60 * 1000, // 1.2 minutes
    max: 4, // Limit each IP to max this requests per `window` (here, per 1.2 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "try again after few minutes later"
})
const apiLimiter3 = rateLimit({
    windowMs: 1.3 * 60 * 1000, // 1.2 minutes
    max: 4, // Limit each IP to max this requests per `window` (here, per 1.2 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "<h2>Avoid-Frequent-Searches</h2> "
})
const apiLimiter2 = rateLimit({
    windowMs: 12 * 60 * 1000, // 1.2 minutes
    max: 5, // Limit each IP to max this requests per `window` (here, per 1.2 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "{message:Too Many Attempts ++ try again after  few minutes later}"
})

// Apply the rate limiting middleware to API calls only


server.listen(process.env.PORT || 5000, function() {

    console.log("started at 5000");
    const SocketService = require("./SocketService");
    const socketService = new SocketService();
    socketService.attachServer(server);


});
app.use("/login", require("./login/login"))

// ejs ,handlebars pug vs ejs vs handlebars vs mustache vs eta
app.get("/", (req, res) => {
    var i = 0;
    //if (i < 1e5) i++;
    //console.log("I counted to " + i);
    //res.redirect('http://' + req.headers.host + req.url + "pre");
    // res.sendFile(path.join(__dirname, '/index.html'));



    const ind = require("./index.js")
    res.send(ind.head)

    //res.sendFile(path.join(__dirname, "./client/public/index.html"));
    //res.sendFile(path.join(__dirname, '/test1.html'));

});
app.get("/mod", (req, res) => {
    const indc = require("./addmodule.js")

    res.send(indc.head1);



    // res.sendFile(path.join(__dirname, '/addmodule.html'));

})
app.get("/mod/structure", (req, res) => {
    var d = fs.readFileSync("./ideabox.json")
    var b = JSON.parse(d);
    console.log(b)
        //res.send(b)

    res.json({ response: b })

})
const fs = require("fs")
app.get("/choose/:id", (req, res) => {
    console.log("choose request")
    var id = req.params.id
    console.log("id" + id)
    if (id !== '1' && id !== '0') {
        console.log("error" + id)
        res.json({ response: "error" })

    } else {
        var apilinks = ["https://crossxlinka.herokuapp.com/", "https://vijayasatyad.pythonanywhere.com/"]
        var d = fs.readFileSync("./ideabox.json")
        var b = JSON.parse(d);
        console.log(b)
            //res.send(b)

        res.json({ api: apilinks[id], response: b })
        console.log("send response and api")

    }

    //res.send(JSON.stringify({ "api": apilinks, "response": "idea boc" }))
})




app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));

app.post('/mod/module', (req, res) => {
    console.log("recieved")
    console.log(req.body)
    var n1 = req.body.n.toLowerCase();
    n1 = n1.replaceAll("\n", "\\n");

    var n2 = req.body.n1.toLowerCase();
    n2 = n2.replaceAll("\n", "\\n")
    var n3 = req.body.n2.toLowerCase();
    n3 = n3.replaceAll("\n", "\\n")
    n.replace
    console.log(n1 + " " + n2 + " " + n3)
    appendtrial("0", n1, n2, n3, function(msg) {
        console.log(msg)
        res.send({ r: msg })
    })






})



function sleep(ms) {

    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

}

/* */
//append2("html", 0, 1)

function append2(v, v1, v2) {

    var data = fs.readFileSync("./ideabox.json")
    var b = JSON.parse(data);
    var c = b
    try {
        if (c["language"][v]) {


            console.log("lang")

        }

    } catch (error) {
        console.log("lang-error")

    }

    try {
        if (c["feature"][v] !== undefined) {
            console.log("feature")

        }

    } catch (error) {
        console.log("feature-error")

    }

}
//appendtrial("0", "html1767672", "tags123", "new  123321", function(msg) {
//  console.log(msg)
//})


function append(v, v1, v2, callback) {
    var data = fs.readFileSync("./ideabox.json")
    var b = JSON.parse(data);
    var c = b
    console.log(c)
    var search = "false"


    console.log("append completed")

    var key = Object.keys(c)
    var t1 = c[key[0]]
    var t2 = c[key[1]]
    console.log(t1)
    var p = "";
    for (var r = 0; r < key.length; r++) {
        var rkey = Object.keys(c[key[r]])
        console.log(rkey)
        var ll = c[key[r]] //lang or feature

        for (var tt = 0; tt < rkey.length; tt++) {
            console.log(rkey[tt])
            var k = rkey[tt] //name of  language /feature
            console.log(k)
                //console.log(c[key[0]][k])
            var tkey = Object.keys(c[key[r]][k])
                //console.log(tkey) module names 
            p += "\n <strong>" + k + "</strong>"
            if (v == k) {
                //create new or override 
                search = c[key[r]][k];
                console.log("found");
                //console.log(tkey.indexOf(v1));
                //console.log(v1 + " " + tkey);
                var index = tkey.indexOf(v1)
                if (index === -1) {
                    console.log("new appending ");
                    c[key[r]][k][v1] = v2;
                    fs.writeFileSync("./ideabox.json", JSON.stringify(c));
                    callback(" new appending ")


                } else {

                    console.log("searched")
                    console.log(search[tkey[index]])
                    c[key[r]][k][tkey[index]] = v2;
                    console.log(search);
                    fs.writeFileSync("./ideabox.json", JSON.stringify(c));
                    callback(" appended  ")
                }
                //console.log(search)


            }



        }


    }
    console.log(p)

}

function appendtrial(type, v, v1, v2, callback) {
    var data = fs.readFileSync("./ideabox.json")
    var b = JSON.parse(data);
    var c = b
    console.log(c)
    var search = "false"


    console.log("append completed")

    var key = Object.keys(c)
    var t1 = c[key[0]]
    var t2 = c[key[1]]
    console.log(t1)
    var p = "";
    for (var r = 0; r < key.length; r++) {
        //ng or feature

        var rkey = Object.keys(c[key[r]])
        console.log(rkey)
        var ll = c[key[r]]

        var inde = rkey.indexOf(v)
        console.log(inde + " lang/feat " + v)
        if (type == r) {
            var k = rkey[inde]
            if (inde === -1) {

                console.log("new appending inside loang or feature ");
                var msg = '{"' + v1 + '":"' + v2 + '"}'
                console.log(msg + " " + msg.length)
                msg = JSON.parse(msg)
                console.log(msg)
                console.log(typeof(msg))
                    //console.log(JSON.parse(msg))
                c[key[r]][v] = msg
                console.log(c)
                fs.writeFileSync("./ideabox.json", JSON.stringify(c));
                callback(" new language or feature ")




            } else {
                search = c[key[r]][k];
                console.log("found");
                var tkey = Object.keys(c[key[r]][k])
                    //console.log(tkey.indexOf(v1));
                    //console.log(v1 + " " + tkey);
                var index = tkey.indexOf(v1)
                if (index === -1) {
                    console.log("new appending ");
                    c[key[r]][k][v1] = v2;
                    fs.writeFileSync("./ideabox.json", JSON.stringify(c));
                    callback(" new appending ")


                } else {

                    console.log("searched")
                    console.log(search[tkey[index]])
                    c[key[r]][k][tkey[index]] = v2;
                    console.log(search);
                    fs.writeFileSync("./ideabox.json", JSON.stringify(c));
                    callback(" appended  ")
                }
                //console.log(search)



            }


        }





        //create new or override

    }
    console.log(p)

}