import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { COLORS, FONT } from '../../constant/theme';
import { getCurrentWeather } from '../../service/weatherService';
import {getNearbyBirdObservations,getBirdMonitoringStats} from '../../service/ebirdService';

export default function Pesquisa() {
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
  });

  const [region, setRegion] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  const [weather, setWeather] = useState(null);
  const [birds, setBirds] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);
  const [loading, setLoading] = useState(false);

  function formatCoordinate(value) {
    return Number(value).toFixed(4);
  }

  async function handleMapPress(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setSelectedLocation({ latitude, longitude });
    setSelectedBird(null);

    setRegion((currentRegion) => ({
      ...currentRegion,
      latitude,
      longitude,
    }));

    await searchRegion(latitude, longitude);
  }

  async function searchRegion(latitude, longitude) {
    try {
      setLoading(true);
      setBirds([]);
      setWeather(null);

      try {
        const weatherData = await getCurrentWeather(latitude, longitude);
        setWeather(weatherData);
      } catch (weatherError) {
        console.log('Erro OpenWeather:', weatherError);
      }

      const birdData = await getNearbyBirdObservations(latitude, longitude);

      console.log('Aves encontradas:', birdData.length);

      setBirds(birdData);
    } catch (error) {
      Alert.alert(
        'Erro na busca',
        error.message || 'Não foi possível carregar as aves da região.'
      );
    } finally {
      setLoading(false);
    }
  }

async function handleStartMonitoring() {
  if (!weather || !selectedBird) {
    Alert.alert(
      'Seleção incompleta',
      'Escolha uma região e uma ave antes de iniciar o monitoramento.'
    );
    return;
  }

  try {
    setLoading(true);

    const stats = await getBirdMonitoringStats(
      selectedLocation.latitude,
      selectedLocation.longitude,
      selectedBird.speciesCode
    );

    router.push({
      pathname: '/monitoring',
      params: {
        latitude: String(selectedLocation.latitude),
        longitude: String(selectedLocation.longitude),

        city: weather.city,
        country: weather.country,

        speciesCode: selectedBird.speciesCode,
        commonName: selectedBird.commonName,
        scientificName: selectedBird.scientificName,

        temperature: String(weather.temperature),
        humidity: String(weather.humidity),
        pressure: String(weather.pressure),
        windSpeed: String(weather.windSpeed),
        condition: weather.condition,
        temperatureLastWeek: weather.climateComparison?.temperature?.lastWeek != null ? String(weather.climateComparison.temperature.lastWeek) : '',
        humidityLastWeek: weather.climateComparison?.humidity?.lastWeek != null ? String(weather.climateComparison.humidity.lastWeek) : '',
        pressureLastWeek: weather.climateComparison?.pressure?.lastWeek != null ? String(weather.climateComparison.pressure.lastWeek) : '',
        windSpeedLastWeek: weather.climateComparison?.windSpeed?.lastWeek != null ? String(weather.climateComparison.windSpeed.lastWeek) : '',

        expectedRecords: String(stats.expectedRecords),
        radiusKm: String(stats.radiusKm),
        currentPeriodDays: String(stats.currentPeriodDays),
        baselinePeriodDays: String(stats.baselinePeriodDays),
        currentQuantity: String(stats.currentQuantity),
        expectedQuantity: String(stats.expectedQuantity),
        totalLast30DaysQuantity: String(stats.totalLast30DaysQuantity),
      },
    });
  } catch (error) {
    Alert.alert(
      'Erro no monitoramento',
      error.message || 'Não foi possível calcular os dados da espécie.'
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Pesquisar</Text>
        <Text style={styles.subtitle}>
          Selecione uma região no mapa para buscar clima atual e aves registradas pelo eBird.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconBoxBlue}>
            <Ionicons name="map-outline" size={22} color={COLORS.earthBlue} />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionLabel}>Local monitorado</Text>
            <Text style={styles.sectionTitle}>Toque no mapa</Text>
          </View>
        </View>

        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
            onPress={handleMapPress}
          >
            <Marker coordinate={selectedLocation} />
          </MapView>
        </View>

        <View style={styles.coordinatesBox}>
          <View style={styles.coordinateCard}>
            <Text style={styles.coordinateLabel}>Latitude</Text>
            <Text style={styles.coordinateValue}>
              {formatCoordinate(selectedLocation.latitude)}
            </Text>
          </View>

          <View style={styles.coordinateCard}>
            <Text style={styles.coordinateLabel}>Longitude</Text>
            <Text style={styles.coordinateValue}>
              {formatCoordinate(selectedLocation.longitude)}
            </Text>
          </View>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingCard}>
          <ActivityIndicator size="small" color={COLORS.earthBlue} />
          <Text style={styles.loadingText}>
            Buscando clima e aves da região...
          </Text>
        </View>
      )}

      {weather && (
        <View style={styles.weatherCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBoxBlue}>
              <Ionicons
                name="partly-sunny-outline"
                size={22}
                color={COLORS.earthBlue}
              />
            </View>

            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionLabel}>Clima atual</Text>
              <Text style={styles.sectionTitle}>
                {weather.city}, {weather.country}
              </Text>
            </View>
          </View>

          <View style={styles.weatherGrid}>
            <WeatherItem label="Temperatura" value={`${weather.temperature}°C`} />
            <WeatherItem label="Umidade" value={`${weather.humidity}%`} />
            <WeatherItem label="Vento" value={`${weather.windSpeed} m/s`} />
            <WeatherItem label="Condição" value={weather.condition} />
          </View>
        </View>
      )}

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconBoxGreen}>
            <MaterialCommunityIcons
              name="bird"
              size={22}
              color={COLORS.auroraGreen}
            />
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionLabel}>Bioindicador</Text>
            <Text style={styles.sectionTitle}>
              {birds.length > 0
                ? 'Aves encontradas na região'
                : 'Selecione uma região'}
            </Text>
          </View>
        </View>

        {birds.length === 0 && !loading ? (
            <Text style={styles.emptyText}>
              Nenhuma ave encontrada nesse ponto. Tente tocar em uma área urbana, parque, lago ou região com mais registros.
            </Text>
          ) : (
          <View style={styles.birdList}>
            {birds.map((bird) => {
              const isSelected = selectedBird?.speciesCode === bird.speciesCode;

              return (
                <TouchableOpacity
                  key={`${bird.speciesCode}-${bird.locationName}`}
                  activeOpacity={0.82}
                  style={[
                    styles.birdCard,
                    isSelected && styles.birdCardSelected,
                  ]}
                  onPress={() => setSelectedBird(bird)}
                >
                  <View style={styles.birdContent}>
                    <Text style={styles.birdName}>{bird.commonName}</Text>
                    <Text style={styles.scientificName}>
                      {bird.scientificName}
                    </Text>

                    <Text style={styles.birdMeta}>
                      {bird.records} registros recentes · {bird.count} indivíduos observados
                    </Text>

                    <Text style={styles.birdMeta}>
                      Registro: {bird.observedAt}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.selectCircle,
                      isSelected && styles.selectCircleActive,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={COLORS.white}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Monitoramento selecionado</Text>
        </View>

        <Text style={styles.resultText}>
          Local:{' '}
          {weather
            ? `${weather.city}, ${weather.country}`
            : `${formatCoordinate(selectedLocation.latitude)}, ${formatCoordinate(
                selectedLocation.longitude
              )}`}
        </Text>

        <Text style={styles.resultText}>
          Ave:{' '}
          {selectedBird
            ? selectedBird.commonName
            : 'Nenhuma ave selecionada'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.primaryButton,
            (!weather || !selectedBird) && styles.primaryButtonDisabled,
          ]}
          disabled={!weather || !selectedBird}
          onPress={handleStartMonitoring}
        >
          <Text style={styles.primaryButtonText}>Iniciar monitoramento</Text>
          <Ionicons name="arrow-forward-outline" size={19} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function WeatherItem({ label, value }) {
  return (
    <View style={styles.weatherItem}>
      <Text style={styles.weatherValue}>{value}</Text>
      <Text style={styles.weatherLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    padding: 20,
    paddingTop: 64,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 22,
  },

  title: {
    fontFamily: FONT.title,
    fontSize: 36,
    color: COLORS.black,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
  },

  sectionCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },

  sectionHeaderText: {
    flex: 1,
  },

  iconBoxBlue: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b3d4718',
  },

  iconBoxGreen: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90a95523',
  },

  sectionLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  sectionTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: COLORS.black,
    marginTop: 2,
  },

  mapWrapper: {
    height: 310,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },

  map: {
    flex: 1,
  },

  coordinatesBox: {
    flexDirection: 'row',
    gap: 12,
  },

  coordinateCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  coordinateLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 4,
  },

  coordinateValue: {
    fontFamily: FONT.subtitle,
    fontSize: 17,
    color: COLORS.black,
  },

  loadingCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },

  loadingText: {
    fontFamily: FONT.bodyMedium,
    fontSize: 14,
    color: COLORS.earthBlue,
  },

  weatherCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  weatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  weatherItem: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  weatherValue: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 4,
    textTransform: 'capitalize',
  },

  weatherLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
  },

  emptyText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted,
  },

  birdList: {
    gap: 10,
  },

  birdCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  birdCardSelected: {
    borderColor: COLORS.auroraGreen,
    backgroundColor: '#90a95523',
  },

  birdContent: {
    flex: 1,
  },

  birdName: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    color: COLORS.black,
  },

  scientificName: {
    fontFamily: FONT.bodyMedium,
    fontSize: 13,
    color: COLORS.auroraGreen,
    fontStyle: 'italic',
    marginTop: 2,
  },

  birdMeta: {
    fontFamily: FONT.body,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },

  selectCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectCircleActive: {
    backgroundColor: COLORS.auroraGreen,
    borderColor: COLORS.auroraGreen,
  },

  resultCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  resultTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: COLORS.black,
  },

  resultText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },

  primaryButton: {
    height: 52,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceSoft,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  primaryButtonDisabled: {
    opacity: 0.45,
  },

  primaryButtonText: {
    fontFamily: FONT.subtitle,
    fontSize: 15,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});