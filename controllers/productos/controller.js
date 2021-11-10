import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js'

const queryAllProducts = async (callback)=>{
    const conexion = getDB()
    await conexion.collection('producto').find().toArray(callback);
}

const crearProducto = async (datosProducto, callback) => {
    if  (
        Object.keys(datosProducto).includes('descripcion') && 
        Object.keys(datosProducto).includes('valorUnitario') && 
        Object.keys(datosProducto).includes('estado')
    ) {
        const conexion = getDB()
        //implementar codigo para crear producto en la base de datos
        await conexion.collection('producto').insertOne(datosProducto, callback);
    } else {
       return "error";
    }
}

const consultarProducto = async (id, callback)=>{
    const conexion = getDB()
    await conexion.collection('producto').findOne({_id: new ObjectId(id)}, callback);
}


const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
       const operacion = {
        $set: edicion,
    };
    const conexion = getDB()
    await conexion
        .collection('producto')
        .findOneAndUpdate(
            filtroProducto, 
            operacion, 
            { upsert: true, returnOriginal: true }, callback);
}


const eliminarProducto = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id)};
    const conexion = getDB()
    await conexion.collection('producto').deleteOne(filtroProducto,callback)
}

export {queryAllProducts, crearProducto, consultarProducto, editarProducto, eliminarProducto}