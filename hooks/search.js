import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { getCurrentWeather } from '../service/weatherService';

import {
  getNearbyBirdObservations,
  getBirdMonitoringStats,
} from '../service/ebirdService';

import { formatCoordinate } from '../helpers/search';

export function useSearchScreen() {
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
        const weatherData = await getCurrentWeather(
          latitude,
          longitude
        );

        setWeather(weatherData);
      } catch (error) {
        console.log(error);
      }

      const birdData = await getNearbyBirdObservations(
        latitude,
        longitude
      );

      setBirds(birdData);
    } catch (error) {
      Alert.alert(
        'Erro na busca',
        error.message ||
          'Não foi possível carregar as aves da região.'
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

          temperature: String(weather.temperature),
          humidity: String(weather.humidity),
          pressure: String(weather.pressure),
          windSpeed: String(weather.windSpeed),

          condition: weather.condition,

          temperatureLastWeek:
            weather.climateComparison?.temperature?.lastWeek != null
              ? String(weather.climateComparison.temperature.lastWeek)
              : '',

          humidityLastWeek:
            weather.climateComparison?.humidity?.lastWeek != null
              ? String(weather.climateComparison.humidity.lastWeek)
              : '',

          pressureLastWeek:
            weather.climateComparison?.pressure?.lastWeek != null
              ? String(weather.climateComparison.pressure.lastWeek)
              : '',

          windSpeedLastWeek:
            weather.climateComparison?.windSpeed?.lastWeek != null
              ? String(weather.climateComparison.windSpeed.lastWeek)
              : '',

          currentQuantity: String(stats.currentQuantity),
          expectedQuantity: String(stats.expectedQuantity),
          totalLast30DaysQuantity: String(stats.totalLast30DaysQuantity),

          radiusKm: String(stats.radiusKm),
          currentPeriodDays: String(stats.currentPeriodDays),
          baselinePeriodDays: String(stats.baselinePeriodDays),
        },
      });
    } catch (error) {
      Alert.alert(
        'Erro no monitoramento',
        error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    region,
    weather,
    birds,
    loading,
    selectedBird,
    selectedLocation,

    formatCoordinate,

    handleMapPress,
    handleStartMonitoring,

    setRegion,
    setSelectedBird,
  };
}