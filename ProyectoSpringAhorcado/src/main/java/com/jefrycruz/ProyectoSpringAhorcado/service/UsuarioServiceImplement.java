package com.jefrycruz.ProyectoSpringAhorcado.service;

import com.jefrycruz.ProyectoSpringAhorcado.controller.ValidacionCorreo;
import com.jefrycruz.ProyectoSpringAhorcado.repository.UsuarioRepository;
import com.jefrycruz.ProyectoSpringAhorcado.model.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImplement implements UsuarioService {


    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImplement(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario getUsuarioById(Integer codigoUsuario) {
        return usuarioRepository.findById(codigoUsuario).orElse(null);
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        ValidacionCorreo.validarCorreo(usuario.getCorreoUsuario());
        if (usuario.getContraseña() == null || usuario.getContraseña().trim().isEmpty()){
            usuario.setContraseña("error_espacio_vacio");
            return usuario;
        }

        List<Usuario> lista = usuarioRepository.findAll();
        for (Usuario u : lista) {
            if (u.getCorreoUsuario().equalsIgnoreCase(usuario.getCorreoUsuario())) {
                usuario.setCorreoUsuario("error_en_el_correo");
                return usuario;
            }
            if (u.getCodigoUsuario() == usuario.getCodigoUsuario()) {
                usuario.setCorreoUsuario("error_en_el_id");
                return usuario;
            }

        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Integer codigoUsuario, Usuario usuario) {
        ValidacionCorreo.validarCorreo(usuario.getCorreoUsuario());
        if (usuario.getContraseña() == null || usuario.getContraseña().trim().isEmpty()){
            usuario.setContraseña("error_espacio_vacio");
            return usuario;
        }
        Usuario existeUsuario = usuarioRepository.findById(codigoUsuario).orElse(null);
        if (existeUsuario != null) {
            List<Usuario> lista = usuarioRepository.findAll();
            for (Usuario u : lista) {
                if (!u.getCodigoUsuario().equals(codigoUsuario)) {
                    if (u.getCorreoUsuario().equalsIgnoreCase(usuario.getCorreoUsuario())) {
                        usuario.setCorreoUsuario("error_en_el_correo");
                        return usuario;
                    }
                }
            }
            existeUsuario.setCorreoUsuario(usuario.getCorreoUsuario());
            return usuarioRepository.save(existeUsuario);
        }
        return null;
    }

    @Override
    public void deleteUsuario(Integer codigoUsuario) {
        usuarioRepository.deleteById(codigoUsuario);
    }


}
