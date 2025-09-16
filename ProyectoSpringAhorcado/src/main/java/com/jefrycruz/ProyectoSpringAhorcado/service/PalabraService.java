package com.jefrycruz.ProyectoSpringAhorcado.service;

import com.jefrycruz.ProyectoSpringAhorcado.model.Palabra;

import java.util.List;

public interface PalabraService {

    List<Palabra> getAllPalabras();
    Palabra getPalabraById(Integer codigoPalabra);
    Palabra savePalabra(Palabra palabra);
    Palabra updatePalabra(Integer codigoPalabra, Palabra palabra );
    void deletePalabra(Integer codigoPalabra);
}
