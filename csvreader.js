const fs = require('fs');
const csvParser = require('csv-parser');
const {csvModel, connection} = require('./csvmodel');

const fileReader = ()=>{
  let results = [];
  fs.createReadStream('data.csv')
  .pipe(csvParser())
  .on('data', (data) => {
    console.log("data = ", data);
    results.push(data);
})
  .on('end', () => {
    console.log(results);
    try{
      csvModel(connection(), results);
    }catch(e){
      console.log("log = ", e);
    }
  });
}

  module.exports = {fileReader};