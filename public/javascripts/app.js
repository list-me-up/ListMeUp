var template;

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
        body: JSON.stringify({list: $('#item').val()})
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