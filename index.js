var fs = require('fs');
var pdf = require('html-pdf');
var inq = require('inquirer');

const questions = [
    inq
    .prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
          },
          {
            type: "list",
            message: "What colour do you desire?",
            name: "colour",
            choices: [
                "Blue", 
                "Red", 
                "Green", 
                "Orange",
                "Pink",
                "Yellow",
                "Aqua"
            ]
          },
          
        ])
        
];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();
