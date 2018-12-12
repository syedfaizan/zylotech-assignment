const inquirer = require('inquirer');

var questions = [{
  type: 'input',
  name: 'No. of files',
  message: "",
}, {
  type: 'input',
  name: 'sequence',
  message: "",
}]

inquirer
  .prompt(questions)
  .then(res => {



  })