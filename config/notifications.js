const User = require('../models/user');
const schedule = require('node-schedule');

schedule.scheduleJob('0 * * * * *', function () {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let currentTime = `${hour}${minute}`

  User.find({time: currentTime},
    function (error, users) {
      users.forEach(function (user) {
        user.sendMessage()
      })
    })
});