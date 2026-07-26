package com.soporte.helpdesk.controller;

import com.soporte.helpdesk.entity.EstadoTicket;
import com.soporte.helpdesk.entity.Ticket;
import com.soporte.helpdesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<Ticket> mostrarTickets(){
        return ticketService.listarTickets();
    }

    @GetMapping("/{id}")
    public Ticket obtenerTicket(@PathVariable Long id) {
        return ticketService.obtenerPorId(id);
    }

    @PostMapping
    public Ticket crearTicket(@RequestBody Ticket nuevoTicket){
        return ticketService.crearTicket(nuevoTicket);
    }

    @PutMapping("/{id}/estado")
    public Ticket actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        EstadoTicket estado = EstadoTicket.valueOf(body.get("estado"));
        return ticketService.actualizarEstado(id, estado);
    }
}