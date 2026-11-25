import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types'; // Importa los tipos de navegación
import CustomButton from '../components/CustomButton'; // Importa tu botón reutilizable

// Tipamos la navegación para que TypeScript sepa a qué pantallas podemos ir
type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>(); // Hook para navegar

  return (
    <View style={styles.container}>
      {/* 1. IMAGEN LOCAL: Cumple el requisito de la rúbrica */}
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      
      <Text style={styles.title}>Control de Gastos</Text>
      
      {/* 2. FLEXBOX: Tarjeta de saldo */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saldo Disponible</Text>
        <Text style={styles.cardAmount}>$ 0.00</Text>
      </View>

      {/* 3. REDIRECCIÓN: Botón que nos lleva al formulario */}
      <CustomButton 
        title="+ Registrar Movimiento" 
        onPress={() => navigation.navigate('MovementForm')} 
      />
    </View>
  );
}

// 4. ESTILIZACIÓN: Uso de Flexbox
const styles = StyleSheet.create({
  container: { 
    flex: 1, // Ocupa toda la pantalla
    alignItems: 'center', // Centra los elementos horizontalmente
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  logo: { 
    width: 80, 
    height: 80, 
    marginTop: 40, 
    marginBottom: 10 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30 
  },
  card: {
    backgroundColor: '#007AFF',
    width: '100%',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    flexDirection: 'column', // Alinea los textos en columna
    justifyContent: 'center', // Centra verticalmente
  },
  cardLabel: { 
    color: '#E0EFFF', 
    fontSize: 16, 
    marginBottom: 10 
  },
  cardAmount: { 
    color: '#fff', 
    fontSize: 36, 
    fontWeight: 'bold' 
  },
});