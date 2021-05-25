const fetch = require('node-fetch')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const port = 3000

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

/*$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();*/