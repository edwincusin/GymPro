import *as SQLite from "expo-sqlite";

//FUNCION PARA INICIALIZAR LA BASE DE DATOS CREAR O INICIAR
export const initDatabase = async (db: SQLite.SQLiteDatabase) => {

    //ABRE LA BDD O CONECTA Y SI NO EXISTE LA CREA
    //const db = await SQLite.openDatabaseAsync('cazador.bd');

    //CREAR LA TABLA EJECUTANDO LAS SETENCIAS INTERNAS 
    await db.execAsync(
        `
         PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS routines (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            muscleGroup TEXT NOT NULL,
            duration INTEGER NOT NULL,
            createAt TEXT NOT NULL,
            featured INTEGER NOT NULL DEFAULT 0
        );
        `
    );
    console.log("Base de datos inicializada con exito!!")
}
