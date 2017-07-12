const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const md5 = require('md5');

const records = parse(fs.readFileSync('./items.csv'));

json = records.filter(item => item[1] && item[2]).map(item => ({
    title: item[1],
    image: item[2],
    basic: item[3] !== '0'
}));

const result = {};
for (let item of json) {
    result[md5(item.title)] = item;
}
console.log(JSON.stringify(result));


