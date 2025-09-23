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
    public Object getUsuarioById(@PathVariable Integer codigoUsuario){
        Usuario usuario = usuarioService.getUsuarioById(codigoUsuario);
        if (usuario == null){
            return "No se encontro el id del usuario";
        }
        return usuario;
    }

    @PostMapping
    public String createUsuario(@RequestBody Usuario usuario){
        if (usuario.getCodigoUsuario() != null) {
            return "No sea loko bro es un post no put";
        }
        try {
            Usuario result = usuarioService.saveUsuario(usuario);
            if ("error_espacio_vacio".equals(result.getContraseña())){
                return ("La contraseña no puede estar vacio");
            }

            if ("error_en_el_correo".equals(result.getCorreoUsuario())){
                return "El correo ya fue registrado previamente";
            }
            return "Usuario agregado correctamente";
        }catch (CorreoInvalido e){
            return e.getMessage();
        }

    }

    @PutMapping
    public String updateUsuario(){
        return "Ingrese el id para poder actualizar el usuario";

    }
    @PutMapping("/{codigoUsuario}")
    public String updateUsuario(@PathVariable Integer codigoUsuario, @RequestBody Usuario usuario) {
        try {
            Usuario result = usuarioService.updateUsuario(codigoUsuario, usuario);
            if (result == null) {
                return "El Usuario no se encontro";
            }

            if ("error_espacio_vacio".equals(result.getContraseña())){
                return ("La contraseña no puede estar vacio");
            }
            if ("error_en_el_correo".equals(result.getCorreoUsuario())) {
                return "El correo ya fue registrado previamente";
            }
            return "Usuario actualizado correctamente";
        }catch (CorreoInvalido e){
            return e.getMessage();
        }
    }
    @DeleteMapping
    public String deleteUsuario(){
        return "Ingrese el id para poder eliminar el usuario";

    }

    @DeleteMapping("/{codigoUsuario}")
    public String deleteUsuario(@PathVariable Integer codigoUsuario){

        Usuario usuario = usuarioService.getUsuarioById(codigoUsuario);
        if (usuario == null){
            return "No se encontro el usuario con ese id para ser eliminado";
        }
        usuarioService.deleteUsuario(codigoUsuario);
        return "Usuario eliminado correctamente";
    }
}
