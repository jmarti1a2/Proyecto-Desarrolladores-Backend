import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js'

const queryAllUsers = async (callback)=>{
    const conexion = getDB()
    await conexion.collection('usuario').find().toArray(callback);
}

const crearUsuario = async (datosUsuario, callback) => {
        const conexion = getDB()
        await conexion.collection('usuario').insertOne(datosUsuario, callback);
  

}

const consultarUsuario = async (id, callback)=>{
    const conexion = getDB()
    await conexion.collection('usuario').findOne({_id: new ObjectId(id)}, callback);
}


const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(edicion.id) };
       const operacion = {
        $set: edicion,
    };
    const conexion = getDB()
    await conexion
        .collection('usuario')
        .findOneAndUpdate(
            filtroUsuario, 
            operacion, 
            { upsert: true, returnOriginal: true }, callback);
}


const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id)};
    const conexion = getDB()
    await conexion.collection('usuario').deleteOne(filtroUsuario,callback)
}

export {queryAllUsers, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario}