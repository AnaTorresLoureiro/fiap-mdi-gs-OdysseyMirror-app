import {
  ImageBackground,
  Text,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  COLORS,
} from '../constant/theme';

import { styles } from '../styles/home';

export function HomeSlide({
  item,
  index,
  total,
  mode,
}) {
  return (
    <View style={styles.slide}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.backgroundImage}
        imageStyle={styles.image}
        resizeMode="cover"
      />

      <LinearGradient
        colors={[
          'rgba(5, 8, 22, 0)',
          'rgba(5, 8, 22, 0.12)',
          'rgba(5, 8, 22, 0.80)',
          'rgba(5, 8, 22, 1)',
          'rgba(5, 8, 22, 1)',
        ]}
        locations={[0, 0.32, 0.52, 0.72, 1]}
        style={styles.gradient}
      >
        <View style={styles.topInfo}>
          <Text style={styles.counter}>
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.textContent}>
          <View
            style={[
              styles.categoryBadge,
              {
                borderColor:
                  mode === 'nature'
                    ? 'rgba(52, 211, 153, 0.55)'
                    : 'rgba(56, 189, 248, 0.55)',
              },
            ]}
          >
            {mode === 'nature' ? (
              <Ionicons
                name={item.indicatorIcon}
                size={16}
                color={COLORS.auroraGreen}
              />
            ) : (
              <MaterialCommunityIcons
                name="satellite-variant"
                size={16}
                color={COLORS.earthCyan}
              />
            )}
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
