import { Text, View } from 'react-native'
import { styles } from './styles'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.id}</Text>
      <Text style={styles.title}>{product.name}</Text>
    </View>
  )
}
