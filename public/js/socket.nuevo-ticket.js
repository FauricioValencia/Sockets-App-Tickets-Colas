//  comando para establecer la conexion

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('se coencto al servidor :D')
});
socket.on('disconnect', () => {
    console.log('se desconecto perro :c')
});

socket.on('estadoActual', (estadoActual)=>label.text(estadoActual.actual))

$('button').on('click', function () {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    })
})