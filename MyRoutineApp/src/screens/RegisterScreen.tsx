import { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleRegister = () => {
    let newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!emailRegex.test(email)) newErrors.email = 'Correo inválido';
    if (!phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    else if (isNaN(Number(phone)) || phone.length < 8) newErrors.phone = 'Ingresa un teléfono válido (mín. 8 números)';
    if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Crear Cuenta</Text>

        <CustomInput label="Nombre Completo" value={name} onChangeText={setName} placeholder="Ej: Juan Pérez" error={errors.name} />
        <CustomInput label="Correo Electrónico" value={email} onChangeText={setEmail} placeholder="ejemplo@correo.com" keyboardType="email-address" error={errors.email} />
        <CustomInput label="Teléfono" value={phone} onChangeText={setPhone} placeholder="Ej: 88888888" keyboardType="phone-pad" error={errors.phone} />
        <CustomInput label="Contraseña" value={password} onChangeText={setPassword} placeholder="Mínimo 6 caracteres" secureTextEntry={true} error={errors.password} />

        <CustomButton title="Registrarse" onPress={handleRegister} />
        
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia Sesión</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 30 },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#666', fontSize: 14 },
  linkBold: { color: '#007AFF', fontWeight: 'bold' },
});