import { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MovementType } from '../types'; // Tipos
import CustomInput from '../components/CustomInput'; // Input reutilizable
import CustomButton from './CustomButton'; // Botón reutilizable

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MovementForm'>;

export default function MovementFormScreen() {
  const navigation = useNavigation<NavProp>();
  
  // 1. ESTADOS: Guardan lo que el usuario escribe
  const [type, setType] = useState<MovementType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(''); // Guarda el mensaje de error

  // 2. VALIDACIÓN Y GUARDADO
  const handleSave = () => {
    // Validar que no estén vacíos
    if (!amount.trim() || !category.trim()) {
      setError('El monto y la categoría son obligatorios');
      return; // Detiene la ejecución
    }
    // Validar que el monto sea un número positivo
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('El monto debe ser un número mayor a 0');
      return;
    }
    
    // Si todo está bien, redirigimos de vuelta (por ahora)
    navigation.goBack(); 
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nuevo Movimiento</Text>

      {/* Selector visual para elegir Gasto o Ingreso */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeBtn, type === 'expense' && styles.activeExpense]}
          onPress={() => setType('expense')}
        >
          <Text style={[styles.typeText, type === 'expense' && styles.activeText]}>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeBtn, type === 'income' && styles.activeIncome]}
          onPress={() => setType('income')}
        >
          <Text style={[styles.typeText, type === 'income' && styles.activeText]}>Ingreso</Text>
        </TouchableOpacity>
      </View>

      {/* 3. USO DE COMPONENTES REUTILIZABLES */}
      <CustomInput
        label="Monto ($)"
        value={amount}
        onChangeText={setAmount}
        placeholder="Ej: 150.50"
        keyboardType="numeric"
        error={error} // Le pasamos el error al input para que se ponga rojo
      />

      <CustomInput
        label="Categoría"
        value={category}
        onChangeText={setCategory}
        placeholder="Ej: Comida, Transporte..."
      />

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
  activeExpense: { backgroundColor: '#FF3B30' }, // Rojo
  activeIncome: { backgroundColor: '#34C759' }, // Verde
  typeText: { fontWeight: 'bold', color: '#333' },
  activeText: { color: '#fff' },
});