import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js'

const queryAllSales = async (callback)=>{
    const conexion = getDB()
    await conexion.collection('venta').find().toArray(callback);
}

const crearVenta = async (datosVenta, callback) => {
    if  (
        Object.keys(datosVenta).includes('descripcion') && 
        Object.keys(datosVenta).includes('valorUnitario') && 
        Object.keys(datosVenta).includes('estado')
    ) {
        const conexion = getDB()
        //implementar codigo para crear Venta en la base de datos
        await conexion.collection('venta').insertOne(datosVenta, callback);
    } else {
       return "error";
    }

}

const consultarVenta = async (id, callback)=>{
    const conexion = getDB()
    await conexion.collection('venta').findOne({_id: new ObjectId(id)}, callback);
}


const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = { _id: new ObjectId(edicion.id) };
       const operacion = {
        $set: edicion,
    };
    const conexion = getDB()
    await conexion
        .collection('venta')
        .findOneAndUpdate(
            filtroVenta, 
            operacion, 
            { upsert: true, returnOriginal: true }, callback);
}


const eliminarVenta = async (id, callback) => {
    const filtroVenta = { _id: new ObjectId(id)};
    const conexion = getDB()
    await conexion.collection('venta').deleteOne(filtroVenta,callback)
}

export {queryAllSales, crearVenta, consultarVenta, editarVenta, eliminarVenta}