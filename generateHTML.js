const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(params) {
  
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[params.color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[params.color].headerBackground};
         color: ${colors[params.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[params.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           width: 40%;
           padding: 20px;
           padding-right: 10px;
           border-radius: 6px;
           background-color: ${colors[params.color].headerBackground};
           color: ${colors[params.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
    </head>
    <body>
    <div class="wrapper">
        <div class="photo-header">
          <img src="${params.avatar_url}" alt="avatar">
            <h1 style="text-align: center;">
              ${params.name}: A Profile 
            </h1>
        </div>
        <div class="row">
        </div>
    <div class="row">
      <div class="links-nav">
        <h4>
          <a href="http://maps.google.com/maps?q=+${params.location}" class="nav-link" target="_blank">Location</a>  || <a href="https://github.com/${params.username}" alt="Github link" class="nav-link" target="_blank">&nbsp; &nbsp;Github&nbsp; &nbsp;</a>  || <a href="http://${params.blog}" alt="Blog Link" class="nav-link" target="_blank">Blog</a>
        </h4>
      </div>
    </div>
    
        <div class = "container">
          <div class="row">
            
            <div class = "container">
                <p>
                  <h2 style="text-align: center;">Bio</h2>
                  <h4 style="text-align: center; font=Arial; ">${params.bio}</h4>
                </p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-5 card">
              <h3><b>Public Repositories</b></h3>
              <h3><b>${params.public_repos}</b></h3>
            </div>
            <div class="col-sm-12 col-md-5 card">
              <h3><b>GitHub Stars</b></h3>
              <h3><b>${params.totalStars}</b></h3>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-5 card">
              <h3><b>Followers</b></h3>
              <h3><b>${params.followers}</b></h3>
            </div>
            <div class="col-sm-12 col-md-5 card">
              <h3><b>Following</b></h3>
              <h3><b>${params.following}</b></h3>
            </div>
          </div>
        </div>
    </div>
    </body>`
}

module.exports = generateHTML;
      //   module.exports = function(options){
      //     console.log(options);
      //     return {
      //     fun1:  generateHTML(params, res)
      //   }
      // }
        // {
        //   console.log(options);
        //   return {
        //     fun1: function(params, res) {
        //         // can access options.key here
        //         // something here
        //     }
        //   }
        // };