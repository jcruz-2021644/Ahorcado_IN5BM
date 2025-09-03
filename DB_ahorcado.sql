-- Creación de la base de datos
Drop Database if exists DB_ahorcado; 
Create Database DB_ahorcado;
Use DB_ahorcado;

Create table Usuarios(
	codigoUsuario int auto_increment,
	nombreUsuario varchar(100),
	apellidoUsuario varchar(100), 	
    correoUsuario varchar(150),
    contraseñaUsuario varchar(100),
	primary key PK_codigoUsuario (codigoUsuario)
);

-- --------------------------- Entidad Usuarios --------------------------- 
-- Agregar Usuario
Delimiter //
	Create procedure sp_AgregarUsuario(
    in nombreUsuario varchar(100),
    in apellidoUsuario varchar(100), 
    in correoUsuario varchar(150), 
    in contraseñaUsuario varchar(100))
		Begin
			Insert into Usuarios(nombreUsuario, apellidoUsuario, correoUsuario, contraseñaUsuario)
				Values(nombreUsuario, apellidoUsuario, correoUsuario, contraseñaUsuario);
        End //
Delimiter ;
call sp_AgregarUsuario('Carlos', 'Ramírez', '1', '1');
call sp_AgregarUsuario('Ana', 'Gómez', 'ana.gomez@gmail.com', 'AGomez*88');
call sp_AgregarUsuario('Luis', 'Martínez', 'luis.martinez@gmail.com',  'LMartinez@11');
call sp_AgregarUsuario('María', 'Fernández', 'maria.fernandez@gmail.com',  'MFernandez#01');
call sp_AgregarUsuario('Jorge', 'Lopez', 'jorge.lopez@gmail.com', 'JLopez@45');

-- Listar Usuarios
Delimiter //
	Create procedure sp_ListarUsuarios()
		Begin
			Select codigoUsuario, nombreUsuario, apellidoUsuario, correoUsuario, contraseñaUsuario from Usuarios;
        End //
Delimiter ;
call sp_ListarUsuarios();

-- Eliminar Usuarios
Delimiter //
	Create procedure sp_EliminarUsuario(
    in _codigoUsuario int)
		Begin
			set foreign_key_checks = 0;
				Delete from Usuarios
					where codigoUsuario = _codigoUsuario;
				Select row_count() as filasEliminadas;
			set foreign_key_checks = 1;
        End//
Delimiter ;
call sp_EliminarUsuario(5);


-- Buscar Usuarios
Delimiter //
	Create procedure sp_BuscarUsuarios(
    in _codigoUsuario int)
		Begin
			Select codigoUsuario, nombreUsuario, apellidoUsuario, correoUsuario, contraseñaUsuario from Usuarios
				where codigoUsuario = _codigoUsuario;
        End //
Delimiter ;
call sp_BuscarUsuarios(1);

-- Editar Usuario
Delimiter //
	Create procedure sp_EditarUsuario(
    in _codigoUsuario int,
	in _nombreUsuario varchar(100),
    in _apellidoUsuario varchar(100), 
    in _correoUsuario varchar(150), 
    in _contraseñaUsuario varchar(100)) 
		Begin
			Update Usuarios
				set nombreUsuario = _nombreUsuario,
				apellidoUsuario = _apellidoUsuario,
				correoUsuario = _correoUsuario,
                contraseñaUsuario = _contraseñaUsuario
					where codigoUsuario = _codigoUsuario;
        End //
Delimiter ;
call sp_AgregarUsuario('Rene', 'Ranas', 'rene1', 'rene1');

-- RegistrarseLogin
Delimiter //
	Create procedure sp_RegistroLogin(
    in correoUsuario varchar(150), 
    in contraseñaUsuario varchar(100),
    out filas int)
		Begin
			Insert into Usuarios(correoUsuario, contraseñaUsuario)
				Values(correoUsuario, contraseñaUsuario);
                
			Set filas = row_count();
        End //
Delimiter ;
-- call sp_RegistroLogin();


Create table Palabras(
	codigoPalabra int auto_increment,
	palabra varchar(100),
	pista varchar(200), 	
	primary key PK_codigoPalabra (codigoPalabra)
);

-- --------------------------- Entidad Palabras --------------------------- 
-- Agregar Palabras
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
call sp_AgregarPalabra('ABECEDARIO', 'De la A a la Z me puedes recitar, con mis letras se construyen las palabras al hablar.');


-- Listar Usuarios
Delimiter //
	Create procedure sp_ListarPalabra()
		Begin
			Select codigoPalabra, palabra, pista from Palabras;
        End //
Delimiter ;
call sp_ListarPalabra();

-- Eliminar Usuarios
Delimiter //
	Create procedure sp_EliminarPalabra(
    in _codigoPalabra int)
		Begin
			set foreign_key_checks = 0;
				Delete from Palabras
					where codigoPalabra = _codigoPalabra;
				Select row_count() as filasEliminadas;
			set foreign_key_checks = 1;
        End//
Delimiter ;
call sp_EliminarPalabra(5);

-- Buscar Usuarios
Delimiter //
	Create procedure sp_BuscarPalabras(
    in _codigoPalabra int)
		Begin
			Select codigoPalabra, palabra, pista from Palabras
				where codigoPalabra = _codigoPalabra;
        End //
Delimiter ;
call sp_BuscarPalabras(1);

-- Editar Usuario
Delimiter //
	Create procedure sp_EditarPalabra(
    in _codigoPalabra int,
	in _palabra varchar(100),
    in _pista varchar(200)) 
		Begin
			Update Palabras
				set palabra = _palabra,
				pista = _pista
                where codigoPalabra = _codigoPalabra;
        End //
Delimiter ;
call sp_EditarPalabra(4, 'Letras', 'Las palabras estan formadas por' );