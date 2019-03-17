var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');

}

var escritorio = searchParams.get('escritorio');
$('h1').text(`Escritorio: ${escritorio}`);

$('button').on('click', () => {
    socket.emit('atenderTicket', {
        escritorio
    }, (resp) => {

        if (resp == "No hay tickets") {
            alert(resp);
            label.text('Ya no hay mas tickets perrito :D');
            return;
        }
        label.text(resp.numero);
    });
})