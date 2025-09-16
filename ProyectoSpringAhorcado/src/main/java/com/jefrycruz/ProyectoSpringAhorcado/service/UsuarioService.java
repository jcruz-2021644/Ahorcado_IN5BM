package com.jefrycruz.ProyectoSpringAhorcado.service;

import com.jefrycruz.ProyectoSpringAhorcado.model.Usuario;

import java.util.List;

public interface UsuarioService {

    List<Usuario> getAllUsuarios();
    Usuario getUsuarioById(Integer codigoUsuario);
    Usuario saveUsuario(Usuario usuario);
    Usuario updateUsuario(Integer codigoCliente, Usuario usuario );
    void deleteUsuario(Integer codigoCliente);
}
