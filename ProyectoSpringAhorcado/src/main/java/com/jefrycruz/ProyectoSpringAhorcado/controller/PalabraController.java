package com.jefrycruz.ProyectoSpringAhorcado.controller;

import com.jefrycruz.ProyectoSpringAhorcado.model.Palabra;
import com.jefrycruz.ProyectoSpringAhorcado.service.PalabraService;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/Palabras")
public class PalabraController {
    private final PalabraService palabraService;

    public PalabraController(PalabraService palabraService) {
        this.palabraService = palabraService;
    }

    @GetMapping
    public List<Palabra> getAllPalabras(){
        return palabraService.getAllPalabras();
    }

    @GetMapping("/{codigoPalabra}")
    public Object getPalabraById(@PathVariable Integer codigoPalabra){
        Palabra palabra = palabraService.getPalabraById(codigoPalabra);
        if (palabra == null){
            return "No se encontro ninguna palabra con ese id";
        }
        return palabra;
    }

    @PostMapping
    public String createPalabra(@RequestBody Palabra palabra){

        try {
            Palabra result = palabraService.savePalabra(palabra);
            if ("error_espacio_vacio".equals(result.getPalabra())){
                return ("La Palabra no puede estar vacio");
            }
            if ("error_espacio_vacio".equals(result.getPista())){
                return ("La Pista no puede estar vacio");
            }
            if ("error_en_la_palabra".equals(result.getPalabra())){
                return "La palabra ya fue registrado previamente";
            }
            if ("error_en_la_pista".equals(result.getPista())){
                return "La pista ya fue registrado previamente";
            }
            return "Palabra y pista agregadas correctamente";
        }catch (CorreoInvalido e){
            return e.getMessage();
        }

    }

    @PutMapping("/{codigoPalabra}")
    public String updatePalabra(@PathVariable Integer codigoPalabra, @RequestBody Palabra palabra) {
        if (palabra.getCodigoPalabra() != null) {
            return "No sea loko bro es un post no put";
        }

        try {
            Palabra result = palabraService.updatePalabra(codigoPalabra, palabra);
            if (result == null) {
                return "La palabra no se encontro";
            }
            if ("error_espacio_vacio".equals(result.getPalabra())){
                return ("La Palabra no puede estar vacio");
            }
            if ("error_espacio_vacio".equals(result.getPista())){
                return ("La Pista no puede estar vacio");
            }
            if ("error_en_la_palabra".equals(result.getPalabra())){
                return "La palabra ya fue registrado previamente";
            }
            if ("error_en_la_pista".equals(result.getPista())){
                return "La pista ya fue registrado previamente";
            }
            return "Palabra actualizado correctamente";
        }catch (CorreoInvalido e){
            return e.getMessage();
        }
    }

    @DeleteMapping("/{codigoPalabra}")
    public String deletePalabra(@PathVariable Integer codigoPalabra){
        Palabra palabra = palabraService.getPalabraById(codigoPalabra);
        if (palabra == null){
            return "No se encontro ninguna palabra con ese id para eliminar";
        }
        palabraService.deletePalabra(codigoPalabra);
        return "Palabra y pista eliminada correctamente";
    }
}