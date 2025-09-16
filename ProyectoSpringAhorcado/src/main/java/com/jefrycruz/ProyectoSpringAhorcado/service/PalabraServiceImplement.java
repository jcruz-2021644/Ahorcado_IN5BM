package com.jefrycruz.ProyectoSpringAhorcado.service;

import com.jefrycruz.ProyectoSpringAhorcado.controller.ValidacionCorreo;
import com.jefrycruz.ProyectoSpringAhorcado.model.Palabra;
import com.jefrycruz.ProyectoSpringAhorcado.repository.PalabraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PalabraServiceImplement implements PalabraService{

    private final PalabraRepository palabraRepository;

    public PalabraServiceImplement(PalabraRepository palabraRepository) {
        this.palabraRepository = palabraRepository;
    }

    @Override
    public List<Palabra> getAllPalabras() {
        return palabraRepository.findAll();
    }

    @Override
    public Palabra getPalabraById(Integer codigoPalabra) {
        return palabraRepository.findById(codigoPalabra).orElse(null);
    }

    @Override
    public Palabra savePalabra(Palabra palabra) {
        List<Palabra> lista = palabraRepository.findAll();
        for (Palabra u : lista) {
            if (u.getPalabra().equalsIgnoreCase(palabra.getPalabra())) {
                palabra.setPalabra("error_en_la_palabra");
                return palabra;
            }
            if (u.getPista().equalsIgnoreCase(palabra.getPista())) {
                palabra.setPista("error_en_la_pista");
                return palabra;
            }

        }
        return palabraRepository.save(palabra);
    }

    @Override
    public Palabra updatePalabra(Integer codigoPalabra, Palabra palabra) {
        Palabra existePalabra = palabraRepository.findById(codigoPalabra).orElse(null);
        if (existePalabra != null) {
            List<Palabra> lista = palabraRepository.findAll();
            for (Palabra u : lista) {
                if (!u.getCodigoPalabra().equals(codigoPalabra)) {
                    if (u.getPalabra().equalsIgnoreCase(palabra.getPalabra())) {
                        palabra.setPalabra("error_en_la_palabra");
                        return palabra;
                    }
                    if (u.getPista().equalsIgnoreCase(palabra.getPista())) {
                        palabra.setPista("error_en_la_pista");
                        return palabra;
                    }
                }
            }
            existePalabra.setPalabra(palabra.getPalabra());
            existePalabra.setPista(palabra.getPista());
            return palabraRepository.save(existePalabra);
        }
        return null;
    }

    @Override
    public void deletePalabra(Integer codigoPalabra) {
        palabraRepository.deleteById(codigoPalabra);
    }

}
