var fs = require('fs');
var pdf = require('html-pdf');
var inq = require('inquirer');
var axios = require('axios');
var generateHtML = require('./generateHTML');
var options = { format: 'Letter' };
var exports = require('exports');
var convertFactory = require('electron-html-to');

// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });

const questions = [
  {
    type: "input",
    message: "What is your Github username?",
    name: "username"
  },
  {
    type: "list",
    message: "What colour do you desire?",
    name: "color",
    choices: [
      "blue",
      "red",
      "green",
      "pink",
    ]
  }
];

function testPrompts() {
  inq.prompt(questions).then(function (params) {
    console.log(params.username);
    console.log(params.color);
  })
}

function getPrompts() {
  inq
    .prompt(questions)
    .then(function ({ username, color }) { // enter the vars created above

      console.log("Color: " + color + " username: " + username);
      const queryUrl = `https://api.github.com/users/${username}`;

      axios.get(queryUrl).then(function (res) {

        return res.data;

      }) 
        .then(res => {
          const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
          axios.get(queryUrl).then(starResponse => {
            const repoStars = starResponse.data.map(function (repo) {
              return repo.stargazers_count;
            });

            let totalStars = 0;
            repoStars.forEach(star => {
              totalStars += star;
            });
            console.log("After Stars Color: " + color);
            console.log("After Stars totalStars: " + totalStars);
            console.log("After Stars res: " + res);
            return generateHtML({
              color,
              ...res, // this includes all parts of the res object
              totalStars
            }); // these all get sent as one object, which is called params in generateHTML.js
          }).catch()

            // This must be linked after the axios call, so it happens within the "res" function. Otherwise it runs before the call finishes.
            
            .then(htmlData => {
              console.log(htmlData);
              console.log("type of data: " + typeof htmlData);

          
              var conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
              });

              const htmlTrial = `<h1>${username}</h1>`;
             
              conversion({ html: htmlData }, (err, result) => {

                if (err) {
                  return console.error(err);
                }

                console.log(result.numberOfPages);
                // console.log(result.logs);
                console.log('Success');
                result.stream.pipe(fs.createWriteStream(`./${username}.pdf`));
                conversion.kill(); // necessary if you use the electron-server strategy, see below for details
                // open(`./${username}.pdf`);
              });
            })
        })
      

    })



    .catch(err => {
      console.log(err);
    });


};



function init() {
  getPrompts();
  // writeToFile(color);
}

init();

