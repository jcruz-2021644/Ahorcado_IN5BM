package com.jefrycruz.ProyectoSpringAhorcado.controller;


import com.jefrycruz.ProyectoSpringAhorcado.model.Usuario;
import com.jefrycruz.ProyectoSpringAhorcado.service.UsuarioService;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@RestController
@RequestMapping("/api/Usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> getAllUsuarios(){
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{codigoUsuario}")
    public Usuario getUsuarioById(@PathVariable Integer codigoUsuario){
        return usuarioService.getUsuarioById(codigoUsuario);
    }

    @PostMapping
    public String createUsuario(@RequestBody Usuario usuario){
        try {
            Usuario result = usuarioService.saveUsuario(usuario);

            if ("error_en_el_correo".equals(result.getCorreoUsuario())){
                return "El correo ya fue registrado previamente";
            }
            return "Usuario agregado correctamente";
        }catch (CorreoInvalido e){
            return e.getMessage();
        }

    }

    @PutMapping("/{codigoUsuario}")
    public String updateUsuario(@PathVariable Integer codigoUsuario, @RequestBody Usuario usuario) {
        try {
            Usuario result = usuarioService.updateUsuario(codigoUsuario, usuario);
            if (result == null) {
                return "El Usuario no se encontro";
            }
            if ("error_en_el_correo".equals(result.getCorreoUsuario())) {
                return "El correo ya fue registrado previamente";
            }
            return "Usuario actualizado correctamente";
        }catch (CorreoInvalido e){
            return e.getMessage();
        }
    }

    @DeleteMapping("/{codigoUsuario}")
    public String deleteUsuario(@PathVariable Integer codigoUsuario){
        usuarioService.deleteUsuario(codigoUsuario);
        return "Usuario eliminado correctamente";
    }
}
