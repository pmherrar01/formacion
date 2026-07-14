package com.soporte.helpdesk.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @ManyToOne
    private Persona affetedPerson;
    @Enumerated(EnumType.STRING)
    private EstadoTicket estado;
    @ManyToOne
    private Persona technician;
    private LocalDateTime reportDate;
    private LocalDateTime resolutionDate;

    public Ticket() {
    }

    public Ticket(String title, String description, Persona affetedPerson, EstadoTicket estado, Persona technician, LocalDateTime reportDate, LocalDateTime resolutionDate) {
        this.title = title;
        this.description = description;
        this.affetedPerson = affetedPerson;
        this.estado = estado;
        this.technician = technician;
        this.reportDate = reportDate;
        this.resolutionDate = resolutionDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Persona getAffetedPerson() {
        return affetedPerson;
    }

    public void setAffetedPerson(Persona affetedPerson) {
        this.affetedPerson = affetedPerson;
    }

    public EstadoTicket getEstado() {
        return estado;
    }

    public void setEstado(EstadoTicket estado) {
        this.estado = estado;
    }

    public Persona getTechnician() {
        return technician;
    }

    public void setTechnician(Persona technician) {
        this.technician = technician;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }

    public LocalDateTime getResolutionDate() {
        return resolutionDate;
    }

    public void setResolutionDate(LocalDateTime resolutionDate) {
        this.resolutionDate = resolutionDate;
    }
}
