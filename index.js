var fs = require('fs');
var pdf = require('html-pdf');
var inq = require('inquirer');
var axios = require('axios');
// var generateHtML = require('./generateHTML');
// var exports = require('exports');
// convertFactory = require('electron-html-to');

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
      "Blue",
      "Red",
      "Green",
      "Pink",
    ]
  }
];

function testPrompts(){
  inq.prompt(questions).then(function(params) {
    console.log(params.username);
    console.log(params.color);
  })
}

function getPrompts() {
  inq
    .prompt(questions)
    .then(function (params) {
      const username = params.username;
      const queryUrl = `https://api.github.com/users/${username}`;

      axios.get(queryUrl).then(function (res) {
        // return generateHtML({
        //   color,
        //   res
        // )};
        console.log("profile pic URL: " + res.data.avatar_url);
        console.log("User name: " + res.data.name);
        console.log("Github profile:" + res.data.html_url);
        console.log("blog: " + res.data.blog);
        console.log("bio: " + res.data.bio);
        console.log("#public repositories" + res.data.repos_url); // maybe check class example
        console.log("# of followers" + res.data.followers);
        console.log("# Stars: " + res.data.starred_url);
        console.log("# following: " + res.data.following_url);

        // console.log(questions);
        // console.log(res);
        // const repoNames = res.data.name;
        // console.log(res.data.name);



        // fs.writeFile("profhtml.txt", generateHtML, function (err) {
        //   if (err) {
        //     throw err;
        //   }

        //   console.log(`Saved ${generateHtML} in txt file`);
        // });

        

      }).catch(err => {
        console.log(err);
      });
    });
};

// function writeToFile(generateHTML, params) {


//   return writeFileAsync("profile.html", generateHTML(questions[1]));


// }

function init() {
  getPrompts();
  // writeToFile(color);
}

init();
