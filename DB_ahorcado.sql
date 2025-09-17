-- Creación de la base de datos
Drop Database if exists DB_ahorcado; 
Create Database DB_ahorcado;
Use DB_ahorcado;

create table Usuarios(
	codigo_usuario int auto_increment,
    correo_usuario varchar(100) not null,
    contraseña varchar(100) not null,
    primary key PK_codigo_usuario(codigo_usuario)
);

create table Palabras(
	codigo_palabra int auto_increment,
    palabra varchar(100) not null,
    pista varchar(200) not null,
    primary key PK_codigo_palabra(codigo_palabra)
);

-- La implementacion de los datos de los usuarios
Delimiter //
	Create Trigger tr_Before_Insert_CorreoUsuarios
	Before Insert on Usuarios
    For each row
		Begin
			If (new.correo_usuario not like '%@gmail.com' and new.correo_usuario not like '%@kinal.edu.gt')  Then
				Signal Sqlstate '45000' 
				set Message_text = 'El correo electrónico debe tener el dominio @gmail.com o @kinal.edu.gt';
			end if;
        End//
Delimiter ;
 
Delimiter //
	Create Trigger tr_Before_Update_CorreoUsuarios
	Before Update on Usuarios
    For each row
		Begin
			If (new.correo_usuario not like '%@gmail.com' and new.correo_usuario not like '%@kinal.edu.gt')  Then
				Signal Sqlstate '45000' 
				set Message_text = 'El correo electrónico debe tener el dominio @gmail.com o @kinal.edu.gt';
			end if;
        End//
Delimiter ;


-- CRUD USUARIOS
Delimiter //
	Create procedure sp_AgregarUsuario( 
    in correo_usuario varchar(100), 
    in contraseña varchar(100))
		Begin
			Insert into Usuarios(correo_usuario, contraseña)
				Values(correo_usuario, contraseña);
        End //
Delimiter ;
call sp_AgregarUsuario('Roberto@kinal.edu.gt', '1');
call sp_AgregarUsuario('ana.gomez@gmail.com', 'AGomez*88');
call sp_AgregarUsuario('luis.martinez@gmail.com',  'LMartinez@11');
call sp_AgregarUsuario('maria.fernandez@gmail.com',  'MFernandez#01');
call sp_AgregarUsuario('jefryyu67@gmail.com', 'Jcruz');
call sp_AgregarUsuario('pedroLopez@gmail.com', 'PLopez');
call sp_AgregarUsuario('Humbertohor@gmail.com', 'Hhor');
call sp_AgregarUsuario('calanchetzi@gmail.com', 'Ctzi');
call sp_AgregarUsuario('PabloCalderon@gmail.com', 'PCalderon');
call sp_AgregarUsuario('PabloDeLeon@gmail.com', 'PLeon');


Delimiter //
	Create procedure sp_ListarUsuario()
		Begin
			select codigo_usuario, correo_usuario, contraseña from Usuarios;
        End //
Delimiter ;
call sp_ListarUsuario();

Delimiter //
	Create procedure sp_EliminarUsuarios(
    in _codigo_usuario int)
		Begin
			set foreign_key_checks = 0;
				Delete from Usuarios
					where codigo_usuario = _codigo_usuario;
				Select row_count() as filasEliminadas;
			set foreign_key_checks = 1;
        End//
Delimiter ;
-- call sp_EliminarUsuarios(1);

Delimiter //
	Create procedure sp_BuscarUsuario(
    in _codigo_usuario int)
		Begin
			Select codigo_usuario, correo_usuario, contraseña from Usuarios
				where codigo_usuario = _codigo_usuario;
        End //
Delimiter ;
call sp_BuscarUsuario(1);

Delimiter //
	Create procedure sp_BuscarUsuarioLog(
    in _correo_usuario varchar(100), 
    in _contraseña varchar(100))
		Begin
			Select codigo_usuario, correo_usuario, contraseña from Usuarios
				where correo_usuario = _correo_usuario and contraseña = _contraseña;
        End //
Delimiter ;
call sp_BuscarUsuarioLog('1', '1');

Delimiter //
	Create procedure sp_EditarUsuario(
    in _codigo_usuario int, 
    in _correo_usuario varchar(100),
    in _contraseña varchar(100))
		Begin
			Update Usuarios
				set correo_usuario = _correo_usuario,
                    contraseña = _contraseña
					where codigo_usuario = _codigo_usuario;
        End //
Delimiter ;

-- CRUD PALABRAS
Delimiter //
	Create procedure sp_AgregarPalabra(
    in palabra varchar(100), 
    in pista varchar(200))
		Begin
			Insert into Palabras(palabra, pista)
				Values(palabra, pista);
        End //
Delimiter ;
call sp_AgregarPalabra('TORREFACTO', 'Negro como la noche, en taza me encontrarás, si me pruebas con azúcar, ¿sabes cómo me llamarás?');
call sp_AgregarPalabra('SEPTIEMBRE', 'Entre el calor que se apaga y el frío que viene ligero, traigo la patria en bandera y otoño en mi sombrero.');
call sp_AgregarPalabra('MANZANILLA', 'Soy una flor sencilla y pequeña, me buscan por mi sabor, en infusiones me toman para calmar el dolor.');
call sp_AgregarPalabra('PRECIDENTE', 'Soy uno de los que dio taco de banano');
call sp_AgregarPalabra('RAM', 'Es lo que le hace falta a Jimenez.');
call sp_AgregarPalabra('MOTO', 'Es lo que tiene Rhandy.');
call sp_AgregarPalabra('ETICA', 'La clase de Balan.');
call sp_AgregarPalabra('HOR', 'El mejor profe de info de 5to.');
call sp_AgregarPalabra('TECLADO', 'Me usan para escribir en la pc.');
call sp_AgregarPalabra('JULIO', 'Es uno de los hermanos gemelos no es de info.');

Delimiter //
	Create procedure sp_ListarPalabra()
		Begin
			select codigo_palabra, palabra, pista from Palabras;
        End //
Delimiter ;
call sp_ListarPalabra();

Delimiter //
	Create procedure sp_EliminarPalabra(
    in _codigo_palabra int)
		Begin
			set foreign_key_checks = 0;
				Delete from Palabras
					where codigo_palabra = _codigo_palabra;
				Select row_count() as filasEliminadas;
			set foreign_key_checks = 1;
        End//
Delimiter ;
-- call sp_EliminarPalabra(1);

Delimiter //
	Create procedure sp_BuscarPalabra(
    in _codigo_palabra int)
		Begin
			Select codigo_palabra, palabra, pista from Palabras
				where codigo_palabra = _codigo_palabra;
        End //
Delimiter ;
call sp_BuscarPalabra(2);

Delimiter //
	Create procedure sp_EditarPalabra(
    in _codigo_palabra int,
    in _palabra varchar(100), 
    in _pista varchar(100))
		Begin
			Update Palabras
				set palabra = _palabra,
					pista = _pista
					where codigo_palabra = _codigo_palabra;
        End //
Delimiter ;
-- call sp_EditarPalabra(2, 'HOLA', 'HOLA');