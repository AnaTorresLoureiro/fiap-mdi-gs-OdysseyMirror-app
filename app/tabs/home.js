import {
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  COLORS,
} from '../../constant/theme';

import { styles } from '../../styles/home';

import { useHomeScreen } from '../../hooks/home';

import { HomeSlide } from '../../components/HomeSlide';

export default function Home() {
  const {
    mode,
    slides,
    activeIndex,

    flatListRef,
    viewabilityConfig,
    onViewableItemsChanged,

    handleChangeMode,
  } = useHomeScreen();

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        key={mode}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={
          onViewableItemsChanged
        }
        viewabilityConfig={
          viewabilityConfig
        }
        renderItem={({ item, index }) => (
          <HomeSlide
            item={item}
            index={index}
            total={slides.length}
            mode={mode}
          />
        )}
      />

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            mode === 'nature' &&
              styles.switchButtonNatureActive,
          ]}
          onPress={() =>
            handleChangeMode('nature')
          }
        >
          <Ionicons
            name="leaf-outline"
            size={19}
            color={
              mode === 'nature'
                ? COLORS.white
                : COLORS.auroraGreen
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.switchButton,
            mode === 'space' &&
              styles.switchButtonSpaceActive,
          ]}
          onPress={() =>
            handleChangeMode('space')
          }
        >
          <MaterialCommunityIcons
            name="satellite-variant"
            size={19}
            color={
              mode === 'space'
                ? COLORS.white
                : COLORS.earthCyan
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.dotsContainer}>
        {slides.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              activeIndex === index && [
                styles.activeDot,
                {
                  backgroundColor:
                    mode === 'nature'
                      ? COLORS.auroraGreen
                      : COLORS.earthCyan,
                },
              ],
            ]}
          />
        ))}
      </View>
    </View>
  );
}