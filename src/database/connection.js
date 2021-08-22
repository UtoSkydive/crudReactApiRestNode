import sql from 'mssql'
//developer

// const dbSettings = {
//     user: 'uto',
//     password :'123456',
//     server:'localhost',
//     database: 'tesdb',
//     options:{
//         encrypt:false,
//         trusServerCertificate:true,
//     }

// }

//produccion
const dbSettings = {
    user: 'Administrador',
    password :'18342020A#',
    server:'prueba-server2021.database.windows.net',
    database: 'tesdb',
    options:{
        encrypt:true,
        trusServerCertificate:true,
    }

}
 export const getConection = async()=>{
     try {
         const pool = await sql.connect(dbSettings)
         //probando coneccion
        //  const result = await pool.request().query('SELECT 1')
        //  console.log(result)
         
         return pool;
     } catch (error) {
         console.log(error)
     }
 }
// getConection()
 export {sql}