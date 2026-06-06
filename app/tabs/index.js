import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT } from '../../constant/theme';

const { width, height } = Dimensions.get('window');

const natureSlides = [
  {
    id: 'nature-1',
    title: 'CANÁRIO',
    indicatorIcon: 'cloud-outline',
    subtitle:
      'Sensível à qualidade do ar, o canário ajuda a perceber alterações atmosféricas que podem indicar desequilíbrios no ambiente.',
    image:
      'https://cdn.pixabay.com/photo/2017/08/17/00/26/nature-2649624_1280.jpg',
  },
  {
    id: 'nature-2',
    title: 'LIQUÉN',
    indicatorIcon: 'cloud-outline',
    subtitle:
      'Liquéns absorvem substâncias diretamente da atmosfera, por isso são fortes indicadores de poluição e mudanças na qualidade do ar.',
    image:
      'https://cdn.pixabay.com/photo/2017/08/24/12/18/lichen-2676618_1280.jpg',
  },
  {
    id: 'nature-3',
    title: 'ABELHA',
    indicatorIcon: 'leaf-outline',
    subtitle:
      'A atividade das abelhas revela sinais sobre vegetação, temperatura e equilíbrio dos ecossistemas terrestres.',
    image:
      'https://cdn.pixabay.com/photo/2026/04/08/23/09/23-09-15-222_1280.jpg',
  },
  {
    id: 'nature-4',
    title: 'SALMÃO',
    indicatorIcon: 'water-outline',
    subtitle:
      'O salmão indica alterações em rios e águas frias, ajudando a observar impactos em ecossistemas aquáticos.',
    image:
      'https://cdn.pixabay.com/photo/2018/09/26/12/45/salmon-3704543_1280.jpg',
  },
  {
    id: 'nature-5',
    title: 'SALAMANDRA',
    indicatorIcon: 'leaf-outline',
    subtitle:
      'Sensível à umidade e à temperatura, a salamandra ajuda a identificar mudanças no solo e em ambientes úmidos.',
    image:
      'https://cdn.pixabay.com/photo/2017/05/07/14/27/geko-2292617_1280.jpg',
  },
  {
    id: 'nature-6',
    title: 'RATÃO DO BANHADO',
    indicatorIcon: 'water-outline',
    subtitle:
      'Em áreas alagadas, sua presença pode indicar transformações em banhados, rios e regiões afetadas pelo clima.',
    image:
      'https://cdn.pixabay.com/photo/2023/09/17/06/53/nutria-8257999_1280.png',
  },
];

const spaceSlides = [
  {
    id: 'space-1',
    title: 'SATÉLITES',
    subtitle:
      'Satélites de observação da Terra monitoram queimadas, cobertura vegetal, nuvens, temperatura e outras variáveis ambientais em escala global.',
    image:
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/nasa-stereo-satellites-nasascience-photo-library.jpg',
  },

  {
    id: 'space-2',
    title: 'SENSORES',
    subtitle:
      'No futuro, sensores terrestres poderão registrar movimentação, presença e comportamento de grupos de animais para complementar os dados ambientais.',
    image:
      'https://cdn.pixabay.com/photo/2020/04/30/17/05/camera-5113699_1280.jpg',
  },

  {
    id: 'space-3',
    title: 'ESTAÇÕES CLIMÁTICAS',
    subtitle:
      'Equipamentos meteorológicos coletam temperatura, umidade, pressão atmosférica e velocidade do vento para acompanhar as condições locais.',
    image:
      'https://smart-traffic.pt/wp-content/uploads/2021/11/piornos-1.jpg',
  },

  {
    id: 'space-5',
    title: 'INTELIGÊNCIA ARTIFICIAL',
    subtitle:
      'A inteligência artificial poderá correlacionar clima, biodiversidade, histórico e localização geográfica para identificar padrões e gerar análises mais precisas.',
    image:
      'https://wallpaperbat.com/img/386350-machine-learning-wallpaper.jpg',
  },
];

export default function Home() {
  const [mode, setMode] = useState('nature');
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef(null);
  const slides = mode === 'nature' ? natureSlides : spaceSlides;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  function handleChangeMode(selectedMode) {
    setMode(selectedMode);
    setActiveIndex(0);

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
    });
  }

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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
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
          activeOpacity={0.85}
          style={[
            styles.switchButton,
            mode === 'nature' && styles.switchButtonNatureActive,
          ]}
          onPress={() => handleChangeMode('nature')}
        >
          <Ionicons
            name="leaf-outline"
            size={19}
            color={mode === 'nature' ? COLORS.white : COLORS.auroraGreen}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.switchButton,
            mode === 'space' && styles.switchButtonSpaceActive,
          ]}
          onPress={() => handleChangeMode('space')}
        >
          <MaterialCommunityIcons
            name="satellite-variant"
            size={19}
            color={mode === 'space' ? COLORS.white : COLORS.earthCyan}
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
                    mode === 'nature' ? COLORS.auroraGreen : COLORS.earthCyan,
                },
              ],
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function HomeSlide({ item, index, total, mode }) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  slide: {
    width,
    height,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.78,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  gradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 54,
    paddingBottom: 120,
    justifyContent: 'space-between',
  },

  switchContainer: {
    position: 'absolute',
    top: 42,
    left: 24,
    flexDirection: 'row',
    gap: 8,
    padding: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(5, 8, 22, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(248, 250, 252, 0.16)',
  },

  switchButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.08)',
  },

  switchButtonNatureActive: {
    backgroundColor: COLORS.auroraGreen,
  },

  switchButtonSpaceActive: {
    backgroundColor: COLORS.earthBlue,
  },

  topInfo: {
    alignItems: 'flex-end',
  },

  counter: {
    fontFamily: FONT.bodyBold,
    fontSize: 13,
    color: COLORS.moon,
    letterSpacing: 1,
  },

  textContent: {
    maxWidth: 330,
    alignSelf: 'center',
    marginBottom: 96,
  },

  categoryBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(5, 8, 22, 0.45)',
    marginBottom: 16,
  },

  title: {
    fontFamily: FONT.title,
    fontSize: 34,
    color: COLORS.star,
    letterSpacing: 1,
    marginBottom: 12,
  },

  subtitle: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.moon,
    textAlign: 'justify',
  },

  dotsContainer: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(248, 250, 252, 0.34)',
  },

  activeDot: {
    width: 38,
  },
});