var template;
var sos = false;
var isEditing = false;

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

function editItem(event) {
    if (isEditing) return;
    isEditing = true;
    var $p = $(event.target);
    $p.html(`<input id="edit-input" value="${$p.html()}">`);
    $('#edit-input').focus();
}

function doneEditing(event, itemId) {
    var $p = $(event.target.parentElement);
    $p.html(event.target.value);
    isEditing = false;
    let currentId = $p.attr('data-itemId');
    fetch('/api/users/list/' + currentId, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({list: $p.html()})
    });
}

$('#all-list').on('click', 'span', editItem);

$('#all-list').on('keypress blur', '#edit-input', function(event) {
    if (event.type === 'blur' || event.type === 'focusout' || event.keyCode === 13) {
        let currentId = $('button', event.target).attr('data-itemId');
        doneEditing(event, currentId);
    }
});

$('.dropdown-item').on('click', function(event) {
    event.preventDefault();
});