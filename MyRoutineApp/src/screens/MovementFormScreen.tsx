import { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MovementType } from '../utils/types';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function MovementFormScreen() {
  const navigation = useNavigation<NavProp>();
  const [type, setType] = useState<MovementType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!amount || !category) {
      setError('El monto y la categoría son obligatorios');
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nuevo Movimiento</Text>
      <View style={styles.typeSelector}>
        <TouchableOpacity style={[styles.typeBtn, type === 'expense' && styles.activeExpense]} onPress={() => setType('expense')}>
          <Text style={[styles.typeText, type === 'expense' && styles.activeText]}>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === 'income' && styles.activeIncome]} onPress={() => setType('income')}>
          <Text style={[styles.typeText, type === 'income' && styles.activeText]}>Ingreso</Text>
        </TouchableOpacity>
      </View>
      <CustomInput label="Monto (L)" value={amount} onChangeText={setAmount} placeholder="Ej: 150.50" keyboardType="numeric" error={error} />
      <CustomInput label="Categoría" value={category} onChangeText={setCategory} placeholder="Ej: Comida..." />
      <CustomButton title="Guardar" onPress={handleSave} />
      <CustomButton title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  typeSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  typeBtn: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#e0e0e0', marginHorizontal: 5, borderRadius: 10 },
  activeExpense: { backgroundColor: '#FF3B30' },
  activeIncome: { backgroundColor: '#34C759' },
  typeText: { fontWeight: 'bold', color: '#333' },
  activeText: { color: '#fff' },
});