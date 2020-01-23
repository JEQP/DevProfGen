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
              ...res,
              totalStars
            });
          }).catch()
        })



        .then(htmlData => {
          console.log(htmlData);
          console.log("type of data: " + typeof htmlData);

          // console.log(htmlData);
          var conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
          });

          const htmlTrial = `<h1>${username}</h1>`;
          // conversion({ html: htmlTrial }, (err, result) => {
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
      // pdf.create(html).toStream(function(err, stream){
      //   stream.pipe(fs.createWriteStream('./foo.pdf'));
      // });

      // pdf.create(generateHtML).toFile('./profile.pdf', function(err, htmlData) {
      //   if (err) return console.log(err);
      //   console.log("second:" + htmlData); 

    })



    .catch(err => {
      console.log(err);
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




// console.log("profile pic URL: " + res.data.avatar_url);
        // console.log("User name: " + res.data.name);
        // console.log("Github profile:" + res.data.html_url);
        // console.log("blog: " + res.data.blog);
        // console.log("bio: " + res.data.bio);
        // console.log("#public repositories" + res.data.repos_url); // maybe check class example
        // console.log("# of followers" + res.data.followers);
        // console.log("# Stars: " + res.data.starred_url);
        // console.log("# following: " + res.data.following_url);

        // console.log(questions);
        // console.log(res);
        // const repoNames = res.data.name;
        // console.log(res.data.name);

        //   .then(htmlData => {
        //     // console.log(htmlData);
        //     var conversion = convertFactory({
        //         converterPath: convertFactory.converters.PDF
        //     });

        //     const htmlTrial = `<h1>${username}</h1>`;
        //     // conversion({ html: htmlTrial }, (err, result) => {
        //     conversion({ html: htmlData }, (err, result) => {

        //         if (err) {
        //             return console.error(err);
        //         }

        //         console.log(result.numberOfPages);
        //         // console.log(result.logs);
        //         console.log('Success');
        //         result.stream.pipe(fs.createWriteStream(`./${username}.pdf`));
        //         conversion.kill(); // necessary if you use the electron-server strategy, see below for details
        //     open(`./${userName}.pdf`);
        //     });
        // })
        // const userColor = params.color;
        // return generateHTML({stars, color, ...res.data});


            //   return generateHTML({ userColor, ...res});
      // }).then(

      //   // htmlFile = function(params, res){
      //   //   return generateHtML.fun1(params, res);
      //   // };
      //   // console.log("htmlFile: " + htmlFile);

      //   // fs.writeFile("profhtml.txt", htmlFile, function (err) {
      //   //   if (err) {
      //   //     throw err;
      //   //   }

      //     console.log(`Saved ${htmlFile} in txt file`);
      //   );
      // )