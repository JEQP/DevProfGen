var fs = require('fs');
var pdf = require('html-pdf');
var inq = require('inquirer');
var axios = require('axios');
var generateHtML = require('./generateHTML');
var options = { format: 'Letter' };
var exports = require('exports');
var convertFactory = require('electron-html-to');



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



function getPrompts() {
  inq
    .prompt(questions)
    .then(function ({ username, color }) { // enter the vars created above

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
            
            return generateHtML({
              color,
              ...res, // this includes all parts of the res object
              totalStars
            }); // these all get sent as one object, which is called params in generateHTML.js
          }).catch()

            // This must be linked after the axios call, so it happens within the "res" function. Otherwise it runs before the call finishes.
            
            .then(htmlData => {
                      
              var conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
              });

              const htmlTrial = `<h1>${username}</h1>`;
             
              conversion({ html: htmlData }, (err, result) => {

                if (err) {
                  return console.error(err);
                }

                console.log(result.numberOfPages);
                console.log('Success');
                result.stream.pipe(fs.createWriteStream(`./${username}.pdf`));
                conversion.kill(); // necessary if you use the electron-server strategy, see below for details
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
}

init();

// Big ups to Dhani and Tonnette for their help for this program. The TAs were great as usual, and Martin put in a great deal of effort to fix an npm problem.