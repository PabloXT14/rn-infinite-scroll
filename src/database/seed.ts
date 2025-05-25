import type { SQLiteDatabase } from 'expo-sqlite'

const productNames: string[] = [
  'Arroz',
  'Feijão',
  'Macarrão',
  'Açúcar',
  'Sal',
  'Óleo de soja',
  'Café',
  'Leite',
  'Farinha de trigo',
  'Farinha de mandioca',
  'Pão de forma',
  'Biscoito',
  'Manteiga',
  'Margarina',
  'Queijo',
  'Presunto',
  'Ovos',
  'Batata',
  'Cebola',
  'Alho',
  'Tomate',
  'Cenoura',
  'Beterraba',
  'Abobrinha',
  'Chuchu',
  'Alface',
  'Couve',
  'Espinafre',
  'Repolho',
  'Maçã',
  'Banana',
  'Laranja',
  'Mamão',
  'Melancia',
  'Uva',
  'Pera',
  'Abacaxi',
  'Limão',
  'Morango',
  'Iogurte',
  'Requeijão',
  'Creme de leite',
  'Leite condensado',
  'Molho de tomate',
  'Extrato de tomate',
  'Milho verde',
  'Ervilha',
]

export async function databaseSeed(database: SQLiteDatabase) {
  await database.withTransactionAsync(async () => {
    for (const name of productNames) {
      await database.runAsync('INSERT INTO products (name) VALUES (?);', [name])
    }
  })
}
