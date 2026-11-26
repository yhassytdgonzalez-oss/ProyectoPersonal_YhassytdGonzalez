import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export default function CustomButton({ title, onPress, variant = 'primary' }: Props) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[styles.button, isPrimary ? styles.primaryBg : styles.secondaryBg]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, isPrimary ? styles.textWhite : styles.textBlue]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 8 },
  primaryBg: { backgroundColor: '#007AFF' },
  secondaryBg: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#007AFF' },
  text: { fontSize: 16, fontWeight: 'bold' },
  textWhite: { color: '#fff' },
  textBlue: { color: '#007AFF' },
});