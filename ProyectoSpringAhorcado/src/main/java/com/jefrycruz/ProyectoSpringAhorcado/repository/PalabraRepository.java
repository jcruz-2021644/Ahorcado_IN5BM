package com.jefrycruz.ProyectoSpringAhorcado.repository;

import com.jefrycruz.ProyectoSpringAhorcado.model.Palabra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PalabraRepository extends JpaRepository<Palabra, Integer>{
}
