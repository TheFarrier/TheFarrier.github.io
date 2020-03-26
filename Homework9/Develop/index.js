const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const generateHtml = require('./generateHTML.js');
const api = require('./api.js');

const questions = [
  {
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    message: "Your favorite color:",
    name: "color"
  }
];


// async function init() {
//   try {
//     const url = "";
//     const result = await axios.get(url);
//     const markdown = await generateHTML(result.data.whatever);
//   }
//   catch (err){
//     console.log("Error")
//   }
// };

// generateMarkdown

// init();



// inquirer
//   .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
//   })
//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//     axios.get(queryUrl).then(function(res) {
      
//       console.log(res.data[0].owner);

//     });
//   });

async function init(){
  try {
    const inquiry = await inquirer.prompt(questions);
    const user = await api.getUser(inquiry.username);
    const star = await api.getStars(inquiry.username);
    const generate = await generateHtml.generateHTML(inquiry.color, user, star);
    await cb();
    async function cb() {
        await api.writeToFile('index.html', generate);
        const html = fs.readFileSync('index.html','utf8');
        const options = {format: 'letter'};
        console.log(user.data)
        await api.createPdf(html,options,user.data);
        // await open(`./pdf/${user.login}.pdf`, {wait:true})
    }

  }
  catch (err) {
    console.log(err);
  }
};

init();