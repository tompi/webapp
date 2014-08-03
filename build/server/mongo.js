var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var EventEmitter = require('events').EventEmitter;

// Passports unified user schema
var UserSchema = new Schema({
  id: String,
  provider:String,
  displayName:String,
  name:{familyName:String,givenName:String,middleName:String},
  email:String,
  photo:String
});

var TodoSchema = new Schema({
  text:String,
  done:Boolean,
  created: { type: Date, default: Date.now }
});

var me = new EventEmitter();

me.User = mongoose.model('User', UserSchema);
me.Todo = mongoose.model('Todo', TodoSchema);

TodoSchema.post('save', function (doc) {
    me.emit('newTodo', doc);
});

module.exports = me;
