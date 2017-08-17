const User = require('../models/user');
const schedule = require('node-schedule');

schedule.scheduledJob('00 * * * *', function () {
  User.find({}, function(error, users) {
    users.forEach(function(user) {
      if (user.weatherLocation) user.getCurrentWeather().then(weather => { user.currentWeather = weather })
    })
  })
})

schedule.scheduleJob('0 * * * * *', function () {
  let currentTime = new Date()
  currentTime = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let formattedTime = currentTime.replace(/ /, '')
  
  User.find({time: formattedTime},
    function (error, users) {
      users.forEach(function (user) {
        console.log(user)
        user.sendMessage()
      })
    })
});