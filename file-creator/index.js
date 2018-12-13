var readline = require('readline');
var fs = require('fs');
var _ = require('lodash');
const EOL = require('os').EOL;

var input = [];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();

rl.on('line', function (cmd) {

    input.push(cmd);
});

var getApppendedFileName = function( fileNames ){
  fileName
} 

rl.on('close', function (cmd) {
    let fileDetails = [];
    var numberOfFiles = input.shift();
    var newInput  = input.join(EOL)
                        .replace(/\$/g, '') // Remove all '$' symbols
                        .replace(/\n/g, '') // Remove all '\n' or new line characters
                        .split('\r')
                        .filter((v,i,a) => a.indexOf(v) == i)
                        .join('\r')
                        .split('\r\r')
                        .map( item => item.split('\r'));

    // making a meaningful JSON object of the date provided
    fileDetails = newInput.map( item => {
      var obj = {};
      obj['fileName'] = item[0];
      obj['fileContent'] = item.splice(1);
      return obj;
    })

    //isolating and concatenating fileNames
    var fileNames = _.map(fileDetails, 'fileName');
    var fileExtension = fileNames[0].split('.')[1];

    var appendedFileName = _.camelCase(fileNames.map( (item) => item.split('.')[0] )) + '.' + fileExtension;

    // writing file to same folder with expected output!
    fs.writeFileSync(appendedFileName, appendedFileName +'\n' +_.flatten(_.map(fileDetails, 'fileContent')).join('\n'), 'utf8')

    process.exit(0);
  
});