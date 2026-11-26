import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { RootStackParamList } from '../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function LoginScreen() {
  const navigation = useNavigation<any>(); // Usamos 'any' temporalmente para no tocar los tipos aún

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Función de validación
  const handleLogin = () => {
    let newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email

    if (!email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Ingresa un correo válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    setErrors(newErrors);

    // Si no hay errores (el objeto está vacío), pasamos a la siguiente pantalla
    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('MainTabs'); // Simulamos inicio de sesión
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para controlar tus gastos</Text>

        <CustomInput
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          error={errors.email}
        />

        <CustomInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry={true}
          error={errors.password}
        />

        <CustomButton title="Iniciar Sesión" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
          <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  scrollContent: 
  { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  logo: 
  { 
    width: 100, 
    height: 100, 
    alignSelf: 'center', 
    marginBottom: 20 
  },
  title: 
  { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#333' 
  },
  subtitle: 
  { 
    fontSize: 16, 
    textAlign: 'center', 
    color: '#666', 
    marginBottom: 30 
  },
  linkContainer: 
  { 
    marginTop: 20, 
    alignItems: 'center' 
  },
  linkText: 
  { 
    color: '#666', 
    fontSize: 14 
  },
  linkBold: 
  { 
    color: '#007AFF', 
    fontWeight: 'bold' 
  },
});