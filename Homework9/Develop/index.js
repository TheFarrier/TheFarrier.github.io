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
        await api.createPdf(html,options,user.data);
        console.log("File created!")
        await fs.open(`./pdf/${user.data.login}.pdf`, 'r', (err) => {
          if (err){
           console.log(err);
          }
        })
    }

  }
  catch (err) {
    console.log(err);
  }
};

init();