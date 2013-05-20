var Emitter = require('emitter')

module.exports = Model;

function Model(data){
  if (!(this instanceof Model)) return new Model(data);
  this.data = data;
  return Emitter(this);
}

Model.prototype.update = function(){
  this.emit('update', randomize(this.data) )
}

//
function randomize(input){
  var perms = permutes(input)
  return perms[ Math.floor(Math.random() * (perms.length + 1)) ];
}

function permutes(input){
  var permArr = [],
  usedChars = [];
  function main(input){
      var i, ch;
      for (i = 0; i < input.length; i++) {
          ch = input.splice(i, 1)[0];
          usedChars.push(ch);
          if (input.length == 0) {
              permArr.push(usedChars.slice());
          }
          main(input);
          input.splice(i, 0, ch);
          usedChars.pop();
      }
      return permArr;
  }
  return main(input);
}
