import { Text, View } from 'react-native';

import { styles } from '../styles/history';

export function StatusCount({ label, value, color }) {
  return (
    <View style={styles.statusCountCard}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={styles.statusCountValue}>{value}</Text>
      <Text style={styles.statusCountLabel}>{label}</Text>
    </View>
  );
}