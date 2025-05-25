import type { SQLiteDatabase } from 'expo-sqlite'
import { databaseSeed } from './seed'

export async function databaseInit(database: SQLiteDatabase) {
  // Verificar se a tabela já exite
  const result = await database.getFirstAsync<Product>(`
    SELECT name
    FROM sqlite_master
    WHERE type='table' AND name='products';
  `)
  // sqlite_master é uma tabela que contém o nome das tabelas criadas

  // Criar tabela se ela não existir
  if (!result) {
    await database.execAsync(`
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );  
    `)

    await databaseSeed(database)
  }
}
