const User = require('../models/user');
const schedule = require('node-schedule');

schedule.scheduleJob('00 * * * *', function () {
  let date = new Date()
  let hour = date.getHours()

  User.find({time: hour},
    function (error, users) {
      users.forEach(function (user) {
        user.sendMessage()
      })
    })
});