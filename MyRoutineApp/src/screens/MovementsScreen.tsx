import { View, Text, StyleSheet, FlatList } from 'react-native';

// Datos de prueba
const MOCK_DATA = [
  { id: '1', type: 'expense', amount: 15.50, category: 'Comida', date: '2023-11-15' },
  { id: '2', type: 'income', amount: 100.00, category: 'Salario', date: '2023-11-14' },
  { id: '3', type: 'expense', amount: 5.00, category: 'Transporte', date: '2023-11-14' },
];

export default function MovementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Movimientos</Text>
      
      {/* FlatList: Componente ideal para listas largas */}
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id} // Identificador único para cada fila
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            
            {/* Estilo condicional: Si es ingreso es verde, si es gasto es rojo */}
            <Text style={[
              styles.amount, 
              { color: item.type === 'income' ? '#34C759' : '#FF3B30' }
            ]}>
              {item.type === 'income' ? '+' : '-'} ${item.amount.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },

  title: 
  { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 40, 
    marginBottom: 20 
  },

  item: 
  {
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10,
    flexDirection: 'row', // Coloca los elementos en fila
    justifyContent: 'space-between', // Separa el texto a la izquierda y el monto a la derecha
    alignItems: 'center' // Centra verticalmente
  },

  itemLeft: 
  { 
    flexDirection: 'column' 
  },

  category: 
  { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  date: 
  { 
    fontSize: 12, 
    color: '#888', 
    marginTop: 4 
  },

  amount: 
  { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});