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
    private Persona affectedPerson;

    @Enumerated(EnumType.STRING)
    private EstadoTicket estado;

    @Enumerated(EnumType.STRING)
    private PrioridadTicket priority;

    @Enumerated(EnumType.STRING)
    private CategoriaTicket category;

    @ManyToOne
    private Persona technician;

    private LocalDateTime reportDate;
    private LocalDateTime resolutionDate;

    public Ticket() {}

    public Ticket(String title, String description, Persona affectedPerson, EstadoTicket estado, PrioridadTicket priority, CategoriaTicket category, Persona technician) {
        this.title = title;
        this.description = description;
        this.affectedPerson = affectedPerson;
        this.estado = estado;
        this.priority = priority;
        this.category = category;
        this.technician = technician;
        this.reportDate = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Persona getAffectedPerson() { return affectedPerson; }
    public void setAffectedPerson(Persona affectedPerson) { this.affectedPerson = affectedPerson; }
    public EstadoTicket getEstado() { return estado; }
    public void setEstado(EstadoTicket estado) { this.estado = estado; }
    public PrioridadTicket getPriority() { return priority; }
    public void setPriority(PrioridadTicket priority) { this.priority = priority; }
    public CategoriaTicket getCategory() { return category; }
    public void setCategory(CategoriaTicket category) { this.category = category; }
    public Persona getTechnician() { return technician; }
    public void setTechnician(Persona technician) { this.technician = technician; }
    public LocalDateTime getReportDate() { return reportDate; }
    public void setReportDate(LocalDateTime reportDate) { this.reportDate = reportDate; }
    public LocalDateTime getResolutionDate() { return resolutionDate; }
    public void setResolutionDate(LocalDateTime resolutionDate) { this.resolutionDate = resolutionDate; }
}