package modelo;

import config.Conexion;
import java.sql.CallableStatement;
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
        String sql = "SELECT * FROM usuarios WHERE correoUsuario = ? AND contraseñaUsuario = ?";

        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, correoUsuario);
            ps.setString(2, contraseñaUsuario);
            rs = ps.executeQuery();

            if (rs.next()) {
                usuarios.setCodigoUsuario(rs.getInt("codigoUsuario"));
                usuarios.setNombreUsuario(rs.getString("nombreUsuario"));
                usuarios.setApellidoUsuario(rs.getString("apellidoUsuario"));
                usuarios.setCorreoUsuario(rs.getString("correoUsuario"));
                usuarios.setContraseñaUsuario(rs.getString("contraseñaUsuario"));
                return usuarios;
            }
        } catch (Exception e) {
            System.out.println("Error al validar usuario: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public boolean registrar(String correoUsuario, String contraseñaUsuario) {
        String sql = "call sp_AgregarUsuario1(?,?);";
        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            ps.setString(1, correoUsuario);
            ps.setString(2, contraseñaUsuario);
            int filas = ps.executeUpdate();
            return filas > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
