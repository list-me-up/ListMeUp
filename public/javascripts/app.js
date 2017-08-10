document.addEventListener("DOMContentLoaded", function() { 
  var items = document.getElementById('items');
  var newItem = document.getElementById('new-item');

  var table = document.getElementById('table');

  var num = 1;
  
  var socket = io();
  socket.on('add-message', function (data) {
    addMessage(data);
  });

  document.getElementById('btn-send-item').addEventListener('click', function() {
    socket.emit('add-message', {
      msg: newItem.value
    });
    newItem.value = '';
  });

  function addMessage(data) {
      // need to do a for every added data item, then append to a new 
    // table.innerHtml += "<tr>" + "<td class='col-xs-2'>" + "10" + "</td><td class='col-xs-8'>" + data.msg + 
    //     "</td><td class='col-xs-2><div class='checkbox'><label><input type='checkbox'" +
    //     "value=''></label></div></td></tr>";

    items.innerHTML += ["<hr>", num++ + " " + data.msg + "<label><input type='checkbox' value='' </label>"].join('');

  }
});
