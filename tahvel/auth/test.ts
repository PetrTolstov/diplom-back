const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://tahvel.edu.ee/hois_back/haridLogin';
const jar = request.jar();


const options = {
    url: url,
    jar: jar,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': 'remember_user_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IlcxczNOVEV5TTEwc0lqWm9MWE0zWDJ0YWExbE1lWFpRWTFoZlNtSlZJaXdpTVRZNE16SXpOVE01T1M0MU5UZzRNVGs0SWwwPSIsImV4cCI6IjIwMjMtMTEtMDRUMjI6MjM6MTkuNTU4WiIsInB1ciI6ImNvb2tpZS5yZW1lbWJlcl91c2VyX3Rva2VuIn19--a781e2ed5119790c70deeadfe5ee3f7e461f7dde'
    }
};

request(options, function(error, response, html) {
    if (!error && response.statusCode == 200) {
        // парсим страницу с помощью cheerio
        const $ = cheerio.load(html);
        const newOptions = {
            url: 'https://tahvel.edu.ee/hois_back/user',
            jar: jar,
            headers: {
                'User-Agent': 'Mozilla/5.0',
            }
        };
        
        request(newOptions, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(error);
            }
        });
    } else {
        console.log(error);
    }
});
