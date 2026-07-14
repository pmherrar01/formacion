package com.soporte.helpdesk.service;


import com.soporte.helpdesk.entity.EstadoTicket;
import com.soporte.helpdesk.entity.Ticket;
import com.soporte.helpdesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public Ticket crearTicket(Ticket ticketACrear){
       ticketACrear.setReportDate(LocalDateTime.now());
       ticketACrear.setEstado(EstadoTicket.ABIERTO);
       return ticketRepository.save(ticketACrear);
    }

}
