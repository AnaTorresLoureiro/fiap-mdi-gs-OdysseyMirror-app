import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constant/theme';
import { styles } from '../styles/history';

export function MiniMetric({ icon, label, value }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIconBox}>
        <Ionicons name={icon} size={17} color={COLORS.earthBlue} />
      </View>

      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}