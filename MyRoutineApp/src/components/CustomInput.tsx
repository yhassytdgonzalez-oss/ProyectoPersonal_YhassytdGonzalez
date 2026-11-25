import { TextInput, Text, View, StyleSheet, KeyboardTypeOptions } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  error?: string;
};

export default function CustomInput({ 
  label, value, onChangeText, placeholder, 
  keyboardType = 'default', secureTextEntry = false, error 
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry} // <-- NUEVO
        autoCapitalize="none" // <-- NUEVO: Evita mayúsculas automáticas en correos
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

// ... (deja los mismos estilos que ya tenías)
const styles = StyleSheet.create({
  container: 
  { 
    marginBottom: 15 
  },
  label: 
  { fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 5, 
    color: '#333' 
  },
  input: 
  { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    backgroundColor: '#fff' 
  },
  inputError: 
  { 
    borderColor: '#FF3B30' 
  },
  errorText: 
  { 
    color: '#FF3B30', 
    fontSize: 12, 
    marginTop: 4 
  },
});