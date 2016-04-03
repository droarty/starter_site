var mysqlModel = require('mysql-model');

var MyAppModel = mysqlModel.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'droarty',
  database: 'pnet'
});

var User = MyAppModel.extend({
  tableName: "users",
});

User.findById = function(id, callback) {
  var user = new User();
  user.find('first', {where: 'id='+id}, callback);
}

module.exports = User;


// create a user model
// var User = mongoose.model('User', {
//   oauthID: Number,
//   name: String,
//   created: Date
// });
