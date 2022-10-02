// Función para cargar las vistas de cada tabla de manera independiente
function direccionarPagina(id_pag){
    let page_name = ["clientes.html", "barcos.html", "mensajes.html"];
    $("#includeContent").load(page_name[id_pag]); 

    for (let index = 0; index < 3; index++) {
        if (id_pag == index){
            $("#pes_"+index).attr({'style':'background-color: #04AA6D'})
        }
        else{
            $("#pes_"+index).attr({'style':'background-color: #333'})
        }
        
    }
    
}

/******************************
** METODOS DE LA TABLA CLIENT *
*******************************/
// GET Clientes
function leerClientes(){
    $.ajax({
        url : 'localhost:8000/client/client',
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de clientes realizada con éxito');
            ordenarClientesxID(respuesta.items);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de clientes con status ' + status);
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de clientes completada');
        }
    });
}

// GET un cliente en particular
function datosCliente( id ){
    $.ajax({
        url : 'localhost:8000/client/client/' + id,
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de clientes realizada con exito');
            $("#update_form_c").attr({'style':'visibility: visible'})
            $("#id_update").val(respuesta.items[0].id);
            $("#name_update").val(respuesta.items[0].name);
            $("#email_update").val(respuesta.items[0].email);
            $("#age_update").val(respuesta.items[0].age);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de clientes con status ' + status);
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de clientes completada');
        }
    });
}

// Función para ordenar los elementos de la lista de elementos retornados por la base de datos por ID
function ordenarClientesxID(items){
    const listaOrdenada = items.sort(function(a, b){return a.id - b.id });
    listarClientes(items);
}

// Función para crear una tabla con los elementos ordenados en la vista
function listarClientes(items){
    let myTable = "<tr>\
                    <th>ID</th>\
                    <th>NAME</th>\
                    <th>EMAIL</th>\
                    <th>AGE</th>\
                    <th>BORRAR</th>\
                </tr>";
    
    $("#clientsTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td> <a href=\"javascript:datosCliente(" + items[i].id + ");\">" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable += "<td> <button class=\"btnDelete\" onclick='borrarCliente(" + items[i].id + ")'> Borrar </button></td>";
        myTable += "</tr>";        
    }

    $("#clientsTable").append(myTable);
}

// POST Clientes
function guardarInformacionClientes(){
    // Definición estructura de datos para recuperar valores desde el html
    let myData ={
        id: parseInt( $("#id").val(), 10),
        name: $("#name").val(),
        email: $("#email").val(),
        age: parseInt( $("#age").val(), 10),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : 'localhost:8000/client/client',
        type : 'POST',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");

            leerClientes();
            alert('Guardado exitoso de registro en tabla clientes');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en guardar un registro en la tabla clientes');
        },
        complete : function(result,status) {
            console.log('Guardado completado de registro en la tabla clientes');
        }
    });
}

// PUT Clientes
function actualizarInformacionClientes(){
    let myData ={
        id: parseInt( $("#id_update").val(), 10),
        name: $("#name_update").val(),
        email: $("#email_update").val(),
        age: parseInt( $("#age_update").val(), 10),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : 'localhost:8000/client/client',
        type : 'PUT',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id_update").val("");
            $("#name_update").val("");
            $("#email_update").val("");
            $("#age_update").val("");
            alert('Petición de actualización cliente realizada con éxito');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en actualizar cliente');
        },
        complete : function(result,status) {
            leerClientes();
            console.log('Actualizar cliente completado con status: ' + status);
        }
    });
}

// DELETE Clientes
function borrarCliente(idCliente){
    let myData={id: idCliente};
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url : 'localhost:8000/client/client',
        type : 'DELETE',
        data: dataToSend,
        dataType : 'JSON',
        contentType: 'application/json',
        success : function(respuesta) {
            alert('Eliminación exitosa de registro de la tabla clientes')
            leerClientes();
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema al eliminar registros de la tabla clientes');
        },
        complete : function(xhr, status) {
            console.log('Petición completada al eliminar un cliente');
        }
    });
}

/****************************
** METODOS DE LA TABLA BOAT *
*****************************/
// GET Barcos
function leerBarcos(){
    $.ajax({
        url : 'localhost:8000/boat/boat',
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de tabla barcos realizada con éxito');
            ordenarBarcosxID(respuesta.items);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema em lectura de tabla barcos con status ' + status);
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de tabla barcos completada');
        }
    });
}

// GET un barco en particular
function datosBarco( id ){
    $.ajax({
        url : 'localhost:8000/boat/boat/' + id,
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            $("#update_form_b").attr({'style':'visibility: visible'})
            $("#id_update").val(respuesta.items[0].id);
            $("#brand_update").val(respuesta.items[0].brand);
            $("#model_update").val(respuesta.items[0].model);
            $("#category_id_update").val(respuesta.items[0].category_id);
            $("#name_update").val(respuesta.items[0].name);
            alert('Lectura de barco realizado con éxito');
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de barcos con status ' + status);
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de barcos completada');
        }
    });
}

// Función para ordenar los elementos de la lista de elementos retornados por la base de datos por ID
function ordenarBarcosxID(items){
    const listaOrdenada = items.sort(function(a, b){return a.id - b.id });
    listarBarcos(items);
}

// Función para crear una tabla con los elementos ordenados en la vista
function listarBarcos(items){
    let myTable =  '<tr>\
                        <th>ID</th>\
                        <th>NAME</th>\
                        <th>BRAND</th>\
                        <th>MODEL</th>\
                        <th>CATEGORY_ID</th>\
                        <th>BORRAR</th>\
                    </tr>';
    $("#boatsTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td> <a href=\"javascript:datosBarco(" + items[i].id + ");\">" + items[i].name + "</td>";
        myTable += "<td>" + items[i].brand + "</td>";
        myTable += "<td>" + items[i].model + "</td>";
        myTable += "<td>" + items[i].category_id + "</td>";
        myTable += "<td> <button class=\"btnDelete\" onclick='borrarBarco(" + items[i].id + ")'> Borrar </button></td>";
        myTable += "</tr>";        
    }

    $("#boatsTable").append(myTable);
}

// POST Barcos
function guardarInformacionBarcos(){
    // Definición estructura de datos para recuperar valores desde el html
    let myData ={
        id: parseInt( $("#id").val(), 10),
        name: $("#name").val(),
        brand: $("#brand").val(),
        model: parseInt( $("#model").val(), 10),
        category_id: parseInt( $("#category_id").val(), 10),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : 'localhost:8000/boat/boat',
        type : 'POST',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id").val("");
            $("#name").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");

            leerBarcos();
            alert('Guardado exitoso de registro en tabla barcos');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en guardar un registro en la tabla barcos');
        },
        complete : function(result,status) {
            console.log('Guardado completado de registro en la tabla barcos');
        }
    });
}

// PUT Barcos
function actualizarInformacionBarcos(){
    let myData ={
        id: parseInt( $("#id_update").val(), 10),
        name: $("#name_update").val(),
        brand: $("#brand_update").val(),
        model: parseInt( $("#model_update").val(), 10),
        category_id: parseInt( $("#category_id_update").val(), 10),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : 'localhost:8000/boat/boat',
        type : 'PUT',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id_update").val("");
            $("#name_update").val("");
            $("#brand_update").val("");
            $("#model_update").val("");
            $("#category_id_update").val("");
            alert('Petición de actualización barco realizada con éxito');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en actualizar barco');
        },
        complete : function(result,status) {
            leerBarcos();
            console.log('Actualizar barco completado con status: ' + status);
        }
    });
}

// DELETE Barcos
function borrarBarco(idBarco){
    let myData={id: idBarco};
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url : 'localhost:8000/boat/boat',
        type : 'DELETE',
        data: dataToSend,
        dataType : 'JSON',
        contentType: 'application/json',
        success : function(respuesta) {
            alert('Eliminación exitosa de registro de la tabla barcos')
            leerBarcos();
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema al eliminar registros de la tabla barcos');
        },
        complete : function(xhr, status) {
            console.log('Petición completada al eliminar un barco');
        }
    });
}

/*******************************
** METODOS DE LA TABLA MESSAGE *
********************************/
// GET Mensajes
function leerMensajes(){
    $.ajax({
        url : 'localhost:8000/message/message',
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            alert('Lectura de tabla mensajes realizada con éxito');
            ordenarMensajesxID(respuesta.items);
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema em lectura de tabla mensajes con status ' + status);
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de tabla mensajes completada');
        }
    });
}

// GET un mensaje en particular
function datosMensaje( id ){
    $.ajax({
        url : 'localhost:8000/message/message/' + id,
        type : 'GET',
        dataType : 'JSON',
        success : function(respuesta) {
            $("#update_form_m").attr({'style':'visibility: visible'})
            $("#id_update").val(respuesta.items[0].id);
            $("#message_text_update").val(respuesta.items[0].messagetext);

            alert('Lectura de mensaje realizado con éxito');
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema en lectura de mensajes con status ' + status);
        },
        complete : function(xhr, status) {
            console.log('Petición de lectura de mensajes completada');
        }
    });
}

// Función para ordenar los elementos de la lista de elementos retornados por la base de datos por ID
function ordenarMensajesxID(items){
    const listaOrdenada = items.sort(function(a, b){return a.id - b.id });
    listarMensajes(items);
}

// Función para crear una tabla con los elementos ordenados en la vista
function listarMensajes(items){
    let myTable =  '<tr>\
                        <th>ID</th>\
                        <th>MESSAGE TEXT</th>\
                        <th>BORRAR</th>\
                    </tr>'

    $("#messagesTable").empty();

    for ( i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].id + "</td>";
        myTable += "<td> <a href=\"javascript:datosMensaje(" + items[i].id + ");\">" + items[i].messagetext + "</td>";
        myTable += "<td> <button class=\"btnDelete\" onclick='borrarMensaje(" + items[i].id + ")'> Borrar </button></td>";
        myTable += "</tr>";        
    }

    $("#messagesTable").append(myTable);
}

// POST Mensajes
function guardarInformacionMensajes(){
    // Definición estructura de datos para recuperar valores desde el html
    let myData ={
        id: parseInt( $("#id").val(), 10),
        messagetext: $("#message_text").val(),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : 'localhost:8000/message/message',
        type : 'POST',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id").val("");
            $("#message_text").val("");

            leerMensajes();
            alert('Guardado exitoso de registro en tabla mensajes');
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en guardar un registro en la tabla mensajes');
        },
        complete : function(result,status) {
            console.log('Guardado completado de registro en la tabla mensajes');
        }
    });
}


// PUT Mensajes
function actualizarInformacionMensajes(){
    let myData ={
        id: parseInt( $("#id_update").val(), 10),
        messagetext: $("#message_text_update").val(),
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url : 'localhost:8000/message/message',
        type : 'PUT',
        dataType: '',
        data: dataToSend,
        contentType: 'application/json',

        success : function(result,status,xhr) {
            $("#id_update").val("");
            $("#message_text_update").val("");

            alert('Petición de actualización mensaje realizada con éxito');
            leerMensajes();
        },
        error : function(xhr,status,error) {
            alert('Ha sucedido un problema en actualizar mensaje');
        },
        complete : function(result,status) {
            console.log('Actualizar mensaje completado con status: ' + status);
        }
    });
}


// DELETE Mensajes
function borrarMensaje(idMensaje){
    let myData={id: idMensaje};
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url : 'localhost:8000/message/message',
        type : 'DELETE',
        data: dataToSend,
        dataType : 'JSON',
        contentType: 'application/json',

        success : function(respuesta) {
            alert('Eliminación exitosa de registro de la tabla mensajes')
            leerMensajes();
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema al eliminar registros de la tabla mensajes');
        },
        complete : function(xhr, status) {
            console.log('Petición completada al eliminar un mensaje');
        }
    });
}
