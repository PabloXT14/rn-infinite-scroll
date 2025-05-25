import { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { useSQLiteContext } from 'expo-sqlite'

import { ProductCard } from '@/components/product-card'
import { Loading } from '@/components/loading'

const ITEMS_PER_PAGE = 10

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)

  const database = useSQLiteContext()

  async function loadProducts() {
    if (isLoading) return

    try {
      setIsLoading(true)

      // Delay de teste (para simular um carregamento um pouco lento)
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result = await database.getAllAsync<Product>(
        `
        SELECT id, name FROM products LIMIT ? OFFSET ?
      `,
        [ITEMS_PER_PAGE, products.length]
      )

      if (result.length <= 0) {
        setHasMoreProducts(false)
        return
      }

      setProducts(prevState => {
        const existingIds = new Set(prevState.map(product => product.id))

        const newItems = result.filter(product => !existingIds.has(product.id))

        return [...prevState, ...newItems]
      })
    } catch (error) {
      console.log(error)

      Alert.alert('Erro ao carregar produtos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 48,
        paddingHorizontal: 16,
      }}
    >
      <FlatList
        data={products}
        keyExtractor={item => String(new Date().getTime() * Math.random())}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={{ gap: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (!isLoading && hasMoreProducts) {
            loadProducts()
          }
        }}
        ListFooterComponent={() => (isLoading ? <Loading /> : null)}
      />
    </View>
  )
}
