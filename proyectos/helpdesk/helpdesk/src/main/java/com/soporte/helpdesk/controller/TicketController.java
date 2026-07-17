package com.soporte.helpdesk.controller;


import com.soporte.helpdesk.entity.Ticket;
import com.soporte.helpdesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public Ticket crearTicket(@RequestBody Ticket nuevoTicket){
        return  ticketService.crearTicket(nuevoTicket);
    }

    @GetMapping
    public List<Ticket> mostrarTickets(){
        return  ticketService.listarTickets();
    }
}
