// import {getConection} from '../database/connection'
import { query } from "mssql";
import { getConection, sql } from "../database";
export const getPersonas = async (req, res) => {
  try {
    const pool = await getConection();
    const result = await pool.request().query("SELECT * FROM personasdb");
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const createNewPersona = async (req, res) => {
  // console.log(req.body)
  const { nombre, pais } = req.body;
  try {
    const pool = await getConection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("pais", sql.VarChar, pais)
      .query("INSERT INTO personasdb (nombre,pais) VALUES (@nombre,@pais)");
    // res.json({ nombre, pais });
    res.json({
      status: "Persona Guardada",
      data: {
        nombre,
        pais,
      },
    });
  } catch (error) {}
};

export const getPersonaById = async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const pool = await getConection();
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT  * FROM personasdb where id =@id");
    console.log(result);
    res.send(result.recordset[0]);
  } catch (error) {
    console.log(error);
  }
};

export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, pais } = req.body;
    const pool = await getConection();
    const result = await pool
      .request()
      .input("id", id)
      .input("nombre", sql.VarChar, nombre)
      .input("pais", sql.VarChar, pais)
      .query(
        "UPDATE personasdb SET nombre = @nombre, pais= @pais WHERE id = @id"
      );
    console.log(result);
    res.json({
      status: "Persona Actualizada",
    });
  } catch (error) {
    console.log(error);
  }
};


export const deletePersona = async(req,res) =>{
    const { id } = req.params;
    const pool = await getConection()
    await pool
        .request()
        .input("id",id)
        .query('DELETE FROM personasdb WHERE id=@id')
    res.json('Persona Eliminada')

}