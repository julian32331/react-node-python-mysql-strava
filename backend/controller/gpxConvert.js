
var fs = require('fs');

let convert = require('./makeCSVforML/convert')
var exec = require('child_process').exec;
var makecsvML = require('./makeCSVforML')

var folderName = `storage/gpx/`;
if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
}

exports.convertgpx = function (req, res) {
    makedirs()
    // handler(req, res)
    console.log("files: ", req.files)
    makecsvML.processFile();
    return res.send({ success: true, msg: "ok" })
}


function handler(req, res) {

    function sendres(params, result) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        params.parseresult = result
        res.end(JSON.stringify(params, "", 3))
    }

    if (req.url == '/gpxfileupload' && req.method.toLowerCase() == 'post') {
        let data = '';
        let limiterror = false;
        req.on('data', function (chunk) {

            if (data.length < 50000000) data += chunk.toString() // limit file length to 50MB
            else limiterror = true;
        });

        req.on('end', function () {
            if (limiterror) {
                sendres({ name: "" }, 'upload limit exceeded')
                return
            }

            let useexec = false
            if (useexec) {
                let mstime = new Date().getTime()
                let fname = __dirname + '/temp_files/' + mstime + '.txt'
                fs.writeFileSync(fname, data)
                let pid = exec('node ./js/exec_convert.js ' + mstime + '.txt', function (error, stdout, stderr) {
                    console.log('stdout: ', stdout);
                    console.log('stderr: ', stderr);

                    if (error !== null) {
                        console.log('exec error: ', error);
                    }
                    res.writeHead(200, { 'content-type': 'text/plain' });
                    res.end(stdout)
                });
                if (pid == 0) pid = 10
            }
            else
                convert.convert(data, res)
        });
    }
    else {
        var url = decodeURI(req.url);
        if (url.indexOf('.css') != -1) { // check if url contains '.css'
            console.log('****** reading css file ' + url);
            fs.readFile('.' + url, "utf-8", function (err, data) {
                if (err) console.log(err);
                res.setHeader("Content-Type", "text/css");
                res.writeHead(200);
                res.end(data);
            });
            return;
        }

        if (url.indexOf('.gif') != -1) { //check if url contains '.gif'
            console.log('****** reading gif file ' + url);
            fs.readFile('.' + url, function (err, data) {
                if (err) console.log(err);
                res.setHeader("Content-Type", "image/gif");
                res.writeHead(200);
                res.end(data);
            });
            return;
        }

        if (url.indexOf('.js') != -1) { //check if url contains '.js'
            console.log('****** reading script file ' + url);
            fs.readFile('.' + url, "utf-8", function (err, data) {
                if (err); // console.log(err);
                res.setHeader("Content-Type", "application/javascript");
                res.writeHead(200);
                if (url.indexOf('main.js') != -1) data = data.replace("serveripaddress", serveripaddress);
                res.end(data);
            });
            return;
        }
        if (url.indexOf('.html') != -1) { //check if url contains '.html'
            console.log('****** reading html file ' + url);
            fs.readFile('.' + url, "utf-8", function (err, data) {
                if (err) console.log(err);
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(data);
            });
            return;
        }

        if (url == '/') {
            fs.readFile(__dirname + '/main.html', function (err, data) {  // main html file
                console.log('****** reading index file ' + url);
                if (err) throw err;
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(data);
            });
            return;
        }
        if (url.indexOf('.ico') != -1) { //check if url contains '.gif'
            console.log('****** reading ico file ' + url);
            fs.readFile('.' + url, function (err, data) {
                if (err);// console.log(err);
                res.setHeader("Content-Type", "image/ico");
                res.writeHead(200);
                res.end(data);
            });
            return;
        }

        console.log('404 error');
        fs.readFile(__dirname + '/404.html', "utf-8", function (err, data) {
            if (err) console.log(err);
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(data);
        });

        return;

        fs.readFile('.' + url, "utf-8", function (err, data) {
            if (err) console.log(err);
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(data);
        });
    }
}

function makedirs() {
    let uploads = 'storage/gpx/uploads/'
    if (!fs.existsSync(uploads)) fs.mkdirSync(uploads)

    let outfiles = 'storage/gpx/output-files/'
    if (!fs.existsSync(outfiles)) fs.mkdirSync(outfiles)

    let slotfiles = 'storage/gpx/timeslot-files/'
    if (!fs.existsSync(slotfiles)) fs.mkdirSync(slotfiles)

    let wfiles = 'storage/gpx/weather-files/'
    if (!fs.existsSync(wfiles)) fs.mkdirSync(wfiles)
}