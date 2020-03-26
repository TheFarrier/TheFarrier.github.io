const axios = require('axios');
const pdf = require('html-pdf');
const fs = require('fs');

const api = {
  async getUser(username) {
    const url = `https://api.github.com/users/${username}`;
    const result = await axios.get(url);
    return result;
  },
  async getStars(username) {
    const url = `https://api.github.com/users/${username}/starred`;
    const result = await axios.get(url);
    return result;
  },
  async createPdf(html,options,user) {
    pdf.create(html, options).toFile(`./pdf/${user.login}.pdf`, "utf8");
  },
  async writeToFile(filename,data) {
    await fs.writeFileSync(filename, data, function(err, res) {
      if (err){
        console.log(err);
      } else {
        return res;
      };
      })
      
    }
  }

  module.exports = {
    getUser: api.getUser,
    getStars: api.getStars,
    createPdf: api.createPdf,
    writeToFile: api.writeToFile
  };