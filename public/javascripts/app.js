var template;
var sos = false;

console.log('APP IS LOADED');

$.get('/api/list', function(data) {
    template = _.template($('#userTemplate').html());
    // console.log(JSON.stringify(data));
    render(data);
});

function render(listItems) {
    $('#all-list').html(template({list: listItems}))
}

function addToDo() {
    fetch('/api/users/list', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include', 
        body: JSON.stringify({
            text: $('#item').val(),
            sos: sos
        })
    }).then(res => res.json()).then(data => render(data.list)).then({list: $('#item').val('')});
}

$('#all-list').submit(function(event) {
    event.preventDefault();
    let currentId = $('button', event.target).attr('data-itemId');
    removeToDo(currentId);
});

function removeToDo(itemId) {
    fetch('/api/users/list/' + itemId, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({list: $('#item').val()})
    }).then(res => res.json()).then(data => render(data));
}

document.getElementById('normal').addEventListener('click', function() {
    $('#item').css({'color': '#8b8378'});
    $('#dropdown').css({'color': 'white'});
    sos = false;
});

document.getElementById('help').addEventListener('click', function() {  
    $('#item').css({'color': 'red'});
    $('#dropdown').css({'color': 'red'});
    sos = true;
});

$('.dropdown-item').on('click', function(e) {
    e.preventDefault();
});