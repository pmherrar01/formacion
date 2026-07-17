package com.soporte.helpdesk.controller;


import com.soporte.helpdesk.entity.Ticket;
import com.soporte.helpdesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public Ticket creatTicket(@RequestBody Ticket nuevoTicket){
        return  ticketService.crearTicket(nuevoTicket);
    }

}
