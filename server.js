import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv'
import {conectarBD, getDB} from './db/db.js'
import { MongoClient, ObjectId} from 'mongodb'

dotenv.config({path:'./.env'})







const app = Express();
app.use(Express.json());
app.use(Cors());

//codigo back productos

app.get('/productos',(req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    const conexion = getDB()
    conexion
    .collection('producto')
    .find({})
    .toArray((err, result) => {
        if(err) {
            res.status(500).send('error consultando productos');
        } else {
            res.json(result);
        }
    });
});

app.post('/productos', (req, res) =>{
    
const datosProducto = req.body;
console.log('llaves:', Object.keys(datosProducto));
try {
    if  (
        Object.keys(datosProducto).includes('descripcion') && 
        Object.keys(datosProducto).includes('valorUnitario') && 
        Object.keys(datosProducto).includes('estado')
    ) {
        const conexion = getDB()
        //implementar codigo para crear producto en la base de datos
        conexion.collection('producto').insertOne(datosProducto, (err, result)=>{
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


app.patch('/productos',(req, res)=> {
    const edicion = req.body;
    console.log(edicion);
    const filtroproducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB()
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


app.delete('/productos',(req, res) => {
    const filtroproducto = { _id: new ObjectId(req.body.id)};
    const conexion = getDB()
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


//codigo back ventas

app.get('/ventas',(req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    const conexion = getDB()
    conexion
    .collection('venta')
    .find({})
    .toArray((err, result) => {
        if(err) {
            res.status(500).send('error consultando ventas');
        } else {
            res.json(result);
        }
    });
});

app.post('/ventas', (req, res) =>{
    
const datosventa = req.body;
console.log('llaves:', Object.keys(datosventa));
try {
    if  (
        Object.keys(datosventa).includes('descripcion') && 
        Object.keys(datosventa).includes('valorUnitario') && 
        Object.keys(datosventa).includes('estado')
    ) {
        //implementar codigo para crear producto en la base de datos
        const conexion = getDB()
        conexion.collection('venta').insertOne(datosventa, (err, result)=>{
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


app.patch('/ventas',(req, res)=> {
    const edicion = req.body;
    console.log(edicion);
    const filtroventa = { _id: new ObjectId(edicion.id) };
    delete edicion.id
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB()
    conexion
        .collection('venta')
        .findOneAndUpdate(
            filtroproducto, 
            operacion, 
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if(err) {
                    console.error('error actualizando la venta:',err);
                    res.sendStatus(500);
                } else {
                    console.log('actualizada con exito');
                    res.sendStatus(200);
            }
        }
    );
})


app.delete('/ventas',(req, res) => {
    const filtroventa = { _id: new ObjectId(req.body.id)};
    const conexion = getDB()
    conexion.collection('venta').deleteOne(filtroventa,(err,result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);          
        }
        else{
            res.sendStatus(200)
        }
    })
})



//codigo back usuarios
app.get('/usuarios',(req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    const conexion = getDB()
    conexion
    .collection('usuario')
    .find({})
    .toArray((err, result) => {
        if(err) {
            res.status(500).send('error consultando usuarios');
        } else {
            res.json(result);
        }
    });
});

app.post('/usuarios', (req, res) =>{
    
const datosusuario = req.body;
console.log('llaves:', Object.keys(datosusuario));
try {
    if  (
        Object.keys(datosusuario).includes('descripcion') && 
        Object.keys(datosusuario).includes('valorUnitario') && 
        Object.keys(datosusuario).includes('estado')
    ) {
        //implementar codigo para crear producto en la base de datos
        const conexion = getDB()
        conexion.collection('usuario').insertOne(datosusuario, (err, result)=>{
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


app.patch('/usuarios',(req, res)=> {
    const edicion = req.body;
    console.log(edicion);
    const filtrousuario = { _id: new ObjectId(edicion.id) };
    delete edicion.id
    const operacion = {
        $set: edicion,
    };
    const conexion = getDB()
    conexion
        .collection('usuario')
        .findOneAndUpdate(
            filtrousuario, 
            operacion, 
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if(err) {
                    console.error('error actualizando el usuario:',err);
                    res.sendStatus(500);
                } else {
                    console.log('actualizado con exito');
                    res.sendStatus(200);
            }
        }
    );
})


app.delete('/usuarios',(req, res) => {
    const filtrousuario = { _id: new ObjectId(req.body.id)};
    const conexion = getDB()
    conexion.collection('usuario').deleteOne(filtrousuario,(err,result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);          
        }
        else{
            res.sendStatus(200)
        }
    })
})





//codigo main conectar base de datos

const main = ()=> {
    return app.listen(process.env.PORT,()=> {
        console.log(`escuchando puerto ${process.env.PORT}`);
        });
};

conectarBD(main)