package modelo;

import config.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UsuariosDAO {
    Conexion cn = new Conexion();
    Connection con; 
    PreparedStatement ps;     
    ResultSet rs;             
    
    public Usuarios validar(String correoUsuario, String contraseñaUsuario) {
        Usuarios usuarios = new Usuarios();

        String sql = "call sp_BuscarUsuarioLog(?, ?);"; 
        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, correoUsuario);      
            ps.setString(2, contraseñaUsuario);  
            rs = ps.executeQuery();

            while (rs.next()) {
                usuarios.setCodigoUsuario(rs.getInt("codigo_usuario"));
                usuarios.setContraseña(rs.getString("contraseña"));
                usuarios.setCorreoUsuario(rs.getString("correo_usuario"));
            }
        } catch (Exception e) {
            System.out.println("El usuario o contraseña son incorrectos");
            e.printStackTrace();
        }

        return usuarios;
    }

    public boolean registrar(String correo, String contraseña) {
        String sql = "call sp_AgregarUsuario(?, ?);";

        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, correo);
            ps.setString(2, contraseña);
            int filas = ps.executeUpdate();
            return filas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}