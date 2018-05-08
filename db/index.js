var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Donate')
// mongoose.connect('mongodb://admin:admin@ds113700.mlab.com:13700/g-db')
var db = mongoose.connection

db.on('error', function () {
  console.log('mongoose connection error')
})

db.once('open', function () {
  console.log('mongoose connected successfully')
})

var Schema = mongoose.Schema

var userDonater = new Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String},
  image: {type: String}
})
var userCompany = new Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String},
  image: {type: String}
})

const messageSchema = new Schema({
  sender:{
    type: String,
    required: true
  },
  reciver:  {
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  }
  
});

userCompany = mongoose.model('userCompany', userCompany)
userDonater = mongoose.model('userDonater', userDonater)
MessageSchema = mongoose.model('MessageSchema', messageSchema)

module.exports.userDonater = userDonater
module.exports.userCompany = userCompany
module.exports.MessageSchema = MessageSchema
