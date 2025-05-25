import { useEffect } from 'react'
import { Alert, Text, View } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite'

export function Home() {
  const database = useSQLiteContext()

  async function loadProducts() {
    try {
      const result = await database.getAllAsync<Product>(`
        SELECT * FROM products
      `)

      console.log(result)
    } catch (error) {
      console.log(error)

      Alert.alert('Erro ao carregar produtos')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  )
}
