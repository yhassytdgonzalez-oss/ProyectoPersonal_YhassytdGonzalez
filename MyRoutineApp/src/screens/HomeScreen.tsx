import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import CustomButton from '../components/CustomButton';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Control de Gastos</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saldo Disponible</Text>
        <Text style={styles.cardAmount}>L 0.00</Text>
      </View>

      <CustomButton title="+ Registrar Movimiento" onPress={() => navigation.navigate('MovementForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 80, height: 80, marginTop: 40, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  card: { backgroundColor: '#007AFF', width: '100%', padding: 30, borderRadius: 15, alignItems: 'center', marginBottom: 30, flexDirection: 'column' },
  cardLabel: { color: '#E0EFFF', fontSize: 16, marginBottom: 10 },
  cardAmount: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
});