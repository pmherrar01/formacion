package com.soporte.helpdesk.repository;

import com.soporte.helpdesk.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepository extends JpaRepository<Persona, Long> {}
