var template;
var sos = false;
var isEditing = false;
var holdValue = '';

console.log('APP IS LOADED');

$.get('/api/list', function(data) {
    template = _.template($('#userTemplate').html());
    render(data);
});

function render(listItems) {
    $('#all-list').html(template({list: listItems}));
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
    var $span = $(event.target);
    $span.html(`<input id="edit-input" value="${$span.html()}">`);
    holdValue = $('#edit-input').val();
    console.log(holdValue);
    $('#edit-input').focus();
}

function doneEditing(event, itemId) {
    var $span = $(event.target.parentElement);

    if (event.target.value === '') {
        event.target.value = holdValue;
        $span.html(event.target.value);
    } else {
        $span.html(event.target.value);
    }

    isEditing = false;
    let currentId = $span.attr('data-itemId');
    fetch('/api/users/list/' + currentId, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({list: $span.html()})
    });
}

$('#all-list').on('click', 'span', editItem);

$('#all-list').on('keypress blur', '#edit-input', function(event) {
    if (event.type === 'blur' || event.type === 'focusout' || event.keyCode === 13) {
        let currentId = $('button', event.target).attr('data-itemId');
        doneEditing(event, currentId);
    }
});

document.getElementById('item').addEventListener('click', function() {
    $("#item").on('keypress blur', function(event) { 
        holdValue = $('#item').val();
        if (holdValue) {
            if (event.keyCode === 13) {
                addToDo();
            }
        }
    });
});

$('.dropdown-item').on('click', function(event) {
    event.preventDefault();
});