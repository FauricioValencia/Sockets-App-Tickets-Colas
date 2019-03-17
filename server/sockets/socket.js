const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control.js');

const ticketControl = new TicketControl();


io.on('connection', (client) => {
    // Escuchar el cliente
    client.emit('siguienteTicket', {
        Ticket: ticketControl.ultimo
    })
    client.on('siguienteTicket', (data, callback) => {
        ticketControl.siguiente();
        callback(ticketControl.ultimo);
    });

    // emitir un envento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario :v'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio)
        callback(atenderTicket);

        //  Actualizar/ notificar cambios en los ultimos 4
        // emitir los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })

});