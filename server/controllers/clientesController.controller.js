const BD = require('../config/conexion');

exports.insertarCliente = async(req,res)=>{
    const{nombre1,nombre2,apellido1,apellido2,apellido_casada,direccion,telefono1,telefono2,identificacion,fecha}=req.body
    console.log(req.body)
    try{
        let sqlInsertar = `exec insert_cliente '${nombre1}','${nombre2}','${apellido1}','${apellido2}','${apellido_casada}','${direccion}',${telefono1},${telefono2},'${identificacion}','${fecha}';`
        await BD.Open(sqlInsertar);
        res.json({"Info": "Cliente creado exitosamente"})
    }catch(error){
        res.json({"Info": "Cliente No se creo"})
    }
}

exports.modificarCliente = async(req,res)=>{
    const{direccion,telefono1,codigo}=req.body
    console.log(req.body)
    try{
        let sqlInsertar = `exec modificar_cliente ${telefono1},'${direccion}',${codigo};`
        await BD.Open(sqlInsertar);
        res.json({"Info": "Cliente modificado exitosamente"})
    }
    catch(error){
        res.json({"Info": "Cliente no modificado"})
    }
}

exports.eliminarCliente = async(req,res)=>{
    const { codigo } = req.params;
    console.log(req.params)
    try{
        let sqlInsertar = `exec eliminar_cliente ${codigo};`
        await BD.Open(sqlInsertar);
        res.json({"Info": "Cliente eliminado exitosamente"})
    }catch(error){
        res.json({"Info": "Cliente no eliminado"})
    }
}

exports.obtenerCliente = async(req,res)=>{
    const { codigo, identificacion } = req.params;
    console.log(req.params)
    try{
        let sqlInsertar = `exec consultar_indices ${codigo},'${identificacion}';`
        let resultCliente = await BD.Open(sqlInsertar);
        let clientes = []
        for (let i = 0; i < resultCliente.length; i++) {
            clientes.push(resultCliente[i]);
        }
        
        res.json(clientes)
    }catch(error){
        res.json(error)
    }
}

exports.obtenerClientes = async(req,res)=>{
    const { nombre, apellido } = req.body;
    console.log(req.body)
    try{
        let sqlInsertar = `exec consultar_nombre_apellido '${nombre}','${apellido}';`
        let resultCliente = await BD.Open(sqlInsertar);
        let clientes = []
        for (let i = 0; i < resultCliente.length; i++) {
            clientes.push(resultCliente[i]);
        }
        
        res.json(clientes)
    }catch(error){
        res.json(error)
    }
}

exports.obtenerTodo = async(req,res)=>{
    try{
        let sqlInsertar = `Select * from clientes;`
        let resultCliente = await BD.Open(sqlInsertar);
        let clientes = []
        for (let i = 0; i < resultCliente.length; i++) {
            clientes.push(resultCliente[i]);
        }
        
        res.json(clientes)
    }catch(error){
        res.json(error)
    }
}