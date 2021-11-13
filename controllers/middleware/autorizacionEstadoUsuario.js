import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js'
import jwt_decode from 'jwt-decode'

const autorizacionEstadoUsuario = async(req,res,next)=>{
    const token = req.headers.authorization.split('Bearer ')[1]
    const user = jwt_decode(token)['http://localhost/userData']
    console.log(user)

    const baseDeDatos = getDB()
    await baseDeDatos.collection('usuario').findOne({ email: user.email }, async (err, response)=>{
        console.log('response consulta bd', response)
        if(response) {
            console.log(response)
            if(response.estado==='rechazado'){
                return res.sendStatus(401)
                //res.end() //se agrega para correccion de bug no lo utilizo revisar si falla la creacion de usuarios
            }
            else{
                console.log('habilitado')
            }
        }
    })


 console.log('hola mundo soy middleware')
 next()
}

export default autorizacionEstadoUsuario