package Controlador;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import config.Conexion;
import modelo.Palabras;
import modelo.PalabrasDAO;
/**
 *
 * @author PC
 */
@WebServlet(name = "AhorcadoController", urlPatterns = {"/AhorcadoController"})
public class AhorcadoController extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        
        if ("obtenerPalabras".equals(action)) {
            obtenerPalabras(request, response);
        } else {
            // Redirigir a la página del juego
            request.getRequestDispatcher("/ahorcado.jsp").forward(request, response);
        }
    }
    
    private void obtenerPalabras(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            // Usar tu clase de conexión
            Conexion conn = new Conexion();
            Connection connection = conn.Conexion();
            PalabrasDAO dao = new PalabrasDAO(connection);
            
            List<Palabras> palabras = dao.obtenerTodasLasPalabras();
            
            // Construir JSON manualmente
            StringBuilder json = new StringBuilder();
            json.append("[");
            
            for (int i = 0; i < palabras.size(); i++) {
                Palabras palabra = palabras.get(i);
                json.append("{");
                json.append("\"codigoPalabra\":").append(palabra.getCodigoPalabra()).append(",");
                json.append("\"palabra\":\"").append(palabra.getPalabra()).append("\",");
                json.append("\"pista\":\"").append(palabra.getPista()).append("\"");
                json.append("}");
                
                if (i < palabras.size() - 1) {
                    json.append(",");
                }
            }
            
            json.append("]");
            
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json.toString());
            
        } catch (SQLException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Error al obtener las palabras\"}");
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
    
    @Override
    public String getServletInfo() {
        return "Servlet para el juego del ahorcado";
    }
}