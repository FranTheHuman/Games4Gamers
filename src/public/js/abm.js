document.getElementById('titulo').focus()
document.getElementById('delete').addEventListener('click', function (e) {
    let response  = confirm('estas seguro de eliminarlo?')
        if(!response) {
            e.preventDefault();
        }
})