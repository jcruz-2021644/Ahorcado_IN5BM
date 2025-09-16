package com.jefrycruz.ProyectoSpringAhorcado.controller;

public class CorreoInvalido extends RuntimeException {
    public CorreoInvalido(String message) {
        super(message);
    }
}
