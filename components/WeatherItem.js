import { Text, View } from 'react-native';

import { styles } from '../styles/search';

export function WeatherItem({ label, value }) {
  return (
    <View style={styles.weatherItem}>
      <Text style={styles.weatherValue}>
        {value}
      </Text>

      <Text style={styles.weatherLabel}>
        {label}
      </Text>
    </View>
  );
}