import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../constant/theme';

import { styles } from '../../styles/search';
import { useSearchScreen } from '../../hooks/search';
import { WeatherItem } from '../../components/WeatherItem';

export default function Pesquisa() {
  const {
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
  } = useSearchScreen();

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