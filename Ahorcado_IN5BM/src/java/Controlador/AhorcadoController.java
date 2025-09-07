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
        //capturamos el paramtero action (?action=obtenerPalabras)
        String action = request.getParameter("action");
        
        //si obtenerPalabras es igual al parametro de accion  entonces lo usamos para que haga json
        if ("obtenerPalabras".equals(action)) {
            obtenerPalabras(request, response);
        } else {
            // si no la peticion HTTP se queda en el Jsp y la vista no cambia solo carga lo principal
            request.getRequestDispatcher("/ahorcado.jsp").forward(request, response);
        }
    }
    
    private void obtenerPalabras(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            // Mandamos a traer nuestra conexion a la db
            Conexion conn = new Conexion();
            Connection connection = conn.Conexion();
            // traemos nuestro modelo DAO de palabras
            PalabrasDAO dao = new PalabrasDAO(connection);
            //Creamos una lista de Palabras que se llame palabras el cual va a traer al dao el metodo obtener palabtras donde esta 
            //el sp de listarPalabras
            List<Palabras> palabras = dao.obtenerTodasLasPalabras();
            
            // Construir JSON manualmente
            StringBuilder json = new StringBuilder();
            // como es manuel tenemos que abrir nuestro arreglo con [
            json.append("[");
            
            // iteramos por la lista o sea por cada palabra agrego un objeto de tipo Json
            for (int i = 0; i < palabras.size(); i++) {
                //traemos nuestra palabra en la posicion i de la lista palabras
                Palabras palabra = palabras.get(i);
                // abrimos nuestro objeto json 
                json.append("{");
                // a nuestro json le añadimos nuestro codigo de palabra que nos servira despues
                // entonces es que añadimos el codigo palabra y a eso le añadimos el codigo de la palabra que traemos por el .get(i)
                json.append("\"codigoPalabra\":").append(palabra.getCodigoPalabra()).append(",");
                // luego en esta parte lo mismo traemos la palabra por emdio del .getpalabra que se aloja en el palabra que tiene el .get(i)
                json.append("\"palabra\":\"").append(palabra.getPalabra()).append("\",");
                // lo mismo de lo de arriba
                json.append("\"pista\":\"").append(palabra.getPista()).append("\"");
                //cerramos nuesto objeto json
                json.append("}");
                
                // si no es el ultimo objeto entonces agregamos una coma mas 
                if (i < palabras.size() - 1) {
                    json.append(",");
                }
            }
            // Cerramos nuestro arreglo json
            json.append("]");
            // esta linea es para el el cliente interprete bien la aplicacion de el json
            response.setContentType("application/json");
            // como lo dije no de donde es para que podamos usar tildes y la ñ o sea para leeer caracteres en español
            response.setCharacterEncoding("UTF-8");
            // escribimos el json en un cuerpo tipo toString o sea en un tipo de respuesta
            response.getWriter().write(json.toString());
            
        } catch (SQLException e) {
            // nuestra exception donde nos responde con el error 500 que seria si ocurre un error en la db
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            //Devolvemos el valor de error 
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