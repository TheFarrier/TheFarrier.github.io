// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  var lower = 'abcdefghijklmnopqrstuvwxyz';
  var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var num = '0123456789';
  var spec = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  var options = [];
  var select;
  var pass ='';
  var length = 0;

  do{
    length = parseInt(prompt("Choose a password length longer than 8 characters and shorter than 128 characters"));
  }
  while(length < 8 || length > 128)

  if(select = confirm("Lower Case?") ){
    options.push(lower);
  }

  if(select = confirm("Upper Case?")){
    options.push(upper);
  }

  if(select = confirm("Numbers?")){
    options.push(num);
  }

  if(select = confirm("Special Characeters?")){
    options.push(spec);
  }

  for(i=0; i<options.length; i++){
    console.log("Enabled " + options[i])
  }
  
  for(i=0; i<length; i++){
    let x = Math.floor(Math.random()*options.length);
    let y = Math.floor(Math.random()*options[x].length);

    pass = pass + options[x][y];
  }

  return pass;

}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
