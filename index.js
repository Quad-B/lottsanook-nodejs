const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const port = 1337

app.get('/', (req, res) => {
    fetch('https://news.sanook.com/lotto/check/'+req.query.date+'/')
    .then(res => res.text())
    .then((body) => {
        let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481",0],["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27",0,0],["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27",0,0],["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27",0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481",0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482",0,0,0,0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483",0,0,0,0,0,0,0,0,0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        let $ = cheerio.load(body)

        //console.log($('strong').toArray())

        data[0][1] = $('strong').toArray()[0].firstChild.data
        data[1][1] = $('strong').toArray()[1].firstChild.data
        data[1][2] = $('strong').toArray()[2].firstChild.data
        data[2][1] = $('strong').toArray()[3].firstChild.data
        data[2][2] = $('strong').toArray()[4].firstChild.data
        data[3][1] = $('strong').toArray()[5].firstChild.data
        data[4][1] = $('strong').toArray()[6].firstChild.data
        data[4][2] = $('strong').toArray()[7].firstChild.data

        /*for (const type of $('strong').toArray()) {
            var arrit = type.attribs.class + ''
            if(!arrit.search('lotto__number')){
                //console.log(type.attribs.class)
                console.log(type.firstChild.data)
                data[0][1] = 
            }
        }*/

        let k = 5
        let i = 1
        for (const type of $('span').toArray()) {
            var arrit = type.attribs.class + ''
            if(!arrit.search('lotto__number')){
                //console.log(type.attribs.class)
                //console.log(type.firstChild.data)
                if(k == 5 && i <= 5){
                    data[k][i] = type.firstChild.data
                    i++
                }else if(k == 5 && i > 5){
                    k++
                    i=1
                }
                if(k == 6 && i <= 10){
                    data[k][i] = type.firstChild.data
                    i++
                }else if(k == 6 && i > 10){
                    k++
                    i=1
                }
                if(k == 7 && i <= 50){
                    data[k][i] = type.firstChild.data
                    i++
                }else if(k == 7 && i > 50){
                    k++
                    i=1
                }
                if(k == 8 && i <= 100){
                    data[k][i] = type.firstChild.data
                    i++
                }
            }
        }
        res.send(data)
    });
})

app.get('/index2', (req, res) => {
    let monthtext
    switch (req.query.date.substring(2, 4))
    {
      case '01' : monthtext="มกราคม"; break;
      case '02' : monthtext="กุมภาพันธ์"; break;
      case '03' : monthtext="มีนาคม"; break;
      case '04' : monthtext="เมษายน"; break;
      case '05' : monthtext="พฤษภาคม"; break;
      case '06' : monthtext="มิถุนายน"; break;
      case '07' : monthtext="กรกฎาคม"; break;
      case '08' : monthtext="สิงหาคม"; break;
      case '09' : monthtext="กันยายน"; break;
      case '10' : monthtext="ตุลาคม"; break;
      case '11' : monthtext="พฤศจิกายน"; break;
      case '12' : monthtext="ธันวาคม"; break;
    }
    fetch('https://www.myhora.com/%E0%B8%AB%E0%B8%A7%E0%B8%A2/%E0%B8%87%E0%B8%A7%E0%B8%94-'+req.query.date.substring(0, 2)+'-'+encodeURI(monthtext)+'-'+req.query.date.substring(4, 8)+'.aspx')
    .then(res => res.text())
    .then((body) => {
        let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481",0],["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27",0,0],["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27",0,0],["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27",0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481",0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482",0,0,0,0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483",0,0,0,0,0,0,0,0,0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
        let $ = cheerio.load(body)

        //console.log($('b').toArray())

        data[0][1] = $('b').toArray()[2].firstChild.data
        let threefirst = $('b').toArray()[3].firstChild.data.split(" ")
        let threeend = $('b').toArray()[4].firstChild.data.split(" ")

        if(threefirst.length == 1){
            data[1][1] = 0;
            data[1][2] = 0;
            data[2][3] = threeend[2].replace(/\xc2\xa0/,'');
            data[2][4] = threeend[3].replace(/\xc2\xa0/,'');
        }else{
            data[1][1] = threefirst[0].replace(/\xc2\xa0/,'');
            data[1][2] = threefirst[1].replace(/\xc2\xa0/,'');
        }
        data[2][1] = threeend[0].replace('/\xc2\xa0/', '');
        data[2][2] = threeend[1].replace('/\xc2\xa0/', '');
        data[3][1] = $('b').toArray()[5].firstChild.data;

        function padLeadingZeros(num, size) {
            var s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        }

        data[4][1] = padLeadingZeros(data[0][1]-1, 6);
        data[4][2] = padLeadingZeros(data[0][1]+1, 6);
        
        let wave = 5;
        let minwave = 0;
        let maxwave = 5;

        for (const type of $('div').toArray()) {
            //var arrit = type.attribs.class + ''
            //if(!arrit.search('lotto__number')){
                //console.log(type.attribs.class)
                //console.log(type.firstChild.data)
            //}
            if(type.attribs.class == 'ltr_dc ltr-fx ltr_c20'){
                if (minwave < maxwave) {
                    minwave++;
                    data[wave][minwave] = type.firstChild.data;
                }
            }
            if (minwave == maxwave && wave == 5) {
                minwave = 0;
                maxwave = 10;
                wave = 6;
            }
            if (minwave == maxwave && wave == 6) {
                minwave = 0;
                maxwave = 50;
                wave = 7;
            }
            if (minwave == maxwave && wave == 7) {
                minwave = 0;
                maxwave = 100;
                wave = 8;
            }
        }

        //console.log(data)
        res.send(data)
        //res.send('test')
    });
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port)
})

/*$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();*/