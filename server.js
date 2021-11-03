//hacer el import de express tradicional
//const express = require('express');

import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';


const stringConexion = 
'mongodb+srv://jmarti1a2:maticomartinez@proyectotic.lkgju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringConexion, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

let conexion;

const app = Express();
app.use(Express.json());
app.use(Cors());

app.get('/productos',(req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    conexion
    .collection('producto')
    .find({})
    .limit(50)
    .toArray((err, result) => {
        if(err) {
            res.status(500).send('error consultando productos');
        } else {
            res.json(result);
        }
    });
});

app.post('/productos/nuevo', (req, res) =>{
    
const datosproducto = req.body;
console.log('llaves:', Object.keys(datosproducto));
try {
    if  (
        Object.keys(datosproducto).includes('id') && 
        Object.keys(datosproducto).includes('descripcion') && 
        Object.keys(datosproducto).includes('valorUnitario') && 
        Object.keys(datosproducto).includes('estado')
    ) {
        //implementar codigo para crear producto en la base de datos
        conexion.collection('producto').insertOne(datosproducto, (err, result)=>{
            if(err) {
                console.error(err)
                res.sendStatus(500);
            }
            else{
                console.log(result);
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(500);
    }
} catch {
    res.sendStatus(500);
}
});


app.patch('/productos/editar',(req, res)=> {
    const edicion = req.body;
    console.log(edicion);
    const filtroproducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id
    const operacion = {
        $set: edicion,
    };
    conexion
        .collection('producto')
        .findOneAndUpdate(
            filtroproducto, 
            operacion, 
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if(err) {
                    console.error('error actualizando el producto:',err);
                    res.sendStatus(500);
                } else {
                    console.log('actualizado con exito');
                    res.sendStatus(200);
            }
        }
    );
})


app.delete('/productos/eliminar',(req, res) => {
    const filtroproducto = { _id: new ObjectId(req.body.id)};
    conexion.collection('producto').deleteOne(filtroproducto,(err,result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);          
        }
        else{
            res.sendStatus(200)
        }
    })
})


const main = ()=> {
    client.connect((err,db)=>{
        if(err){
            console.error('Error conectando a la base de datos');
        }
        conexion = db.db('coleccionproductos') 
        console.log('conexion exitosa')
        return app.listen(5000,()=> {
        console.log('escuchando puerto 5000');
        });
    });
};

main();