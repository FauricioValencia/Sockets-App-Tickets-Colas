const socket = io();
const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const audio= new Audio('audio/new-ticket.mp3');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]

socket.on('estadoActual', (data) => {
    actualizarHtml(data.ultimos4)
});

    socket.on('ultimos4', (data)=>{
        actualizarHtml(data.ultimos4);
        audio.play();
    })


const actualizarHtml = (ultimos4) => {
    for (let i = 0; i <= ultimos4.length - 1; i += 1) {
        lblTickets[i].text(`Ticket ${ultimos4[i].numero}`);
        lblEscritorios[i].text(`Ticket ${ultimos4[i].escritorio}`);
    }
};