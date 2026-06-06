import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams } from 'expo-router';

import { COLORS, FONT } from '../constant/theme';
import { useMonitoring } from '../context/MonitoringContext';
import {
  generateMonitoringSummary,
  generateStatusInsight,
} from '../service/llamaService';

const screenWidth = Dimensions.get('window').width;
const stableGreen = '#8BB174';

const chartConfig = {
  backgroundGradientFrom: COLORS.white,
  backgroundGradientTo: COLORS.white,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(2, 6, 23, ${opacity})`,
  fillShadowGradient: COLORS.earthBlue,
  fillShadowGradientOpacity: 0.25,
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: COLORS.earthBlue,
  },
};

export default function Monitorar() {
  const params = useLocalSearchParams();
  const { saveMonitoring } = useMonitoring();

  const [saved, setSaved] = useState(params.isSaved === 'true');
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [aiLoading, setAiLoading] = useState(false);

  const monitoringData = buildMonitoringData(params);
  const statusConfig = getStatusConfig(monitoringData.status.level);

  const [statusInsight, setStatusInsight] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
  async function loadAiTexts() {
    try {
      setAiLoading(true);
      setAiError(null);

      const [generatedStatusInsight, generatedSummary] = await Promise.all([
        generateStatusInsight(monitoringData),
        generateMonitoringSummary(monitoringData),
      ]);

      setStatusInsight(generatedStatusInsight);
      setAiSummary(generatedSummary);
    } catch (error) {
      setStatusInsight('');
      setAiSummary('');
      setAiError(error.message || 'Não foi possível gerar o parecer com IA.');
    } finally {
      setAiLoading(false);
    }
  }

  loadAiTexts();
}, [monitoringData.cacheKey]);

  async function handleSaveMonitoring() {
    if (saved) return;

    await saveMonitoring({
      location: monitoringData.location.city,
      country: monitoringData.location.country,
      coordinates: monitoringData.location.coordinates,

      species: monitoringData.species.commonName,
      scientificName: monitoringData.species.scientificName,
      status: monitoringData.status.label,

      temperature: `${monitoringData.weather.temperature}°C`,
      humidity: `${monitoringData.weather.humidity}%`,
      pressure: `${monitoringData.weather.pressure} hPa`,
      windSpeed: `${monitoringData.weather.windSpeed} m/s`,
      condition: monitoringData.weather.condition,

      temperatureLastWeek:
        monitoringData.weather.weeklyComparison.find((item) => item.key === 'temperature')?.lastWeek ?? '',
      humidityLastWeek:
        monitoringData.weather.weeklyComparison.find((item) => item.key === 'humidity')?.lastWeek ?? '',
      pressureLastWeek:
        monitoringData.weather.weeklyComparison.find((item) => item.key === 'pressure')?.lastWeek ?? '',
      windSpeedLastWeek:
        monitoringData.weather.weeklyComparison.find((item) => item.key === 'windSpeed')?.lastWeek ?? '',

      currentQuantity: monitoringData.biodiversity.currentQuantity,
      expectedQuantity: monitoringData.biodiversity.expectedQuantity,
      totalLast30DaysQuantity: monitoringData.biodiversity.totalLast30DaysQuantity,

      radiusKm: monitoringData.biodiversity.radiusKm,
      currentPeriodDays: monitoringData.biodiversity.currentPeriodDays,
      baselinePeriodDays: monitoringData.biodiversity.baselinePeriodDays,

      summary: aiSummary,

      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR'),
    });

    setSaved(true);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Monitoramento Ambiental</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.favoriteButton, saved && styles.favoriteButtonSaved]}
            onPress={handleSaveMonitoring}
          >
            <Ionicons
              name={saved ? 'star' : 'star-outline'}
              size={22}
              color={COLORS.warning}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Analise clima, biodiversidade e sinais ambientais de uma região.
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'analysis' && styles.tabButtonActive]}
          onPress={() => setActiveTab('analysis')}
        >
          <Ionicons
            name="document-text-outline"
            size={17}
            color={activeTab === 'analysis' ? COLORS.white : COLORS.muted}
          />
          <Text style={[styles.tabText, activeTab === 'analysis' && styles.tabTextActive]}>
            Análise
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'charts' && styles.tabButtonActive]}
          onPress={() => setActiveTab('charts')}
        >
          <Ionicons
            name="bar-chart-outline"
            size={17}
            color={activeTab === 'charts' ? COLORS.white : COLORS.muted}
          />
          <Text style={[styles.tabText, activeTab === 'charts' && styles.tabTextActive]}>
            Gráficos
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'analysis' ? (
        <>
          <View style={styles.quickCardsRow}>
            <View style={styles.quickCard}>
              <View style={styles.iconBoxBlue}>
                <Ionicons name="location-outline" size={22} color={COLORS.earthBlue} />
              </View>

              <Text style={styles.cardLabel}>Local</Text>
              <Text style={styles.quickCardTitle}>{monitoringData.location.city}</Text>
              <Text style={styles.quickCardText}>{monitoringData.location.country}</Text>
            </View>

            <View style={styles.quickCard}>
              <View style={styles.iconBoxGreen}>
                <MaterialCommunityIcons name="bird" size={22} color={COLORS.auroraGreen} />
              </View>

              <Text style={styles.cardLabel}>Espécie</Text>
              <Text style={styles.quickCardTitle}>{monitoringData.species.commonName}</Text>
              <Text style={styles.quickCardText}>{monitoringData.species.type}</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusCard,
              {
                borderColor: statusConfig.border,
                backgroundColor: statusConfig.background,
              },
            ]}
          >
            <View style={styles.statusTop}>
              <View style={styles.statusTitleBox}>
                <Text style={styles.sectionLabel}>Status ambiental</Text>
                <Text
                  style={[styles.statusTitle, { color: statusConfig.color }]}
                  numberOfLines={2}
                >
                  {monitoringData.status.label}
                </Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: statusConfig.badgeBackground }]}>
                <Ionicons name={statusConfig.icon} size={16} color={statusConfig.badgeText} />
                <Text style={[styles.statusBadgeText, { color: statusConfig.badgeText }]}>
                  {monitoringData.status.label}
                </Text>
              </View>
            </View>

            <Text style={styles.statusDescription}>
              {monitoringData.status.description}
            </Text>

            {aiLoading ? (
                <Text style={styles.statusText}>Gerando análise ambiental...</Text>
              ) : aiError ? (
                <Text style={styles.statusText}>{aiError}</Text>
              ) : (
                <Text style={styles.statusText}>{statusInsight}</Text>
              )}

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.expandButton, { backgroundColor: statusConfig.expandBackground }]}
              onPress={() => setExpanded(!expanded)}
            >
              <Text style={[styles.expandButtonText, { color: statusConfig.color }]}>
                {expanded ? 'Ocultar detalhes' : 'Ver clima e biodiversidade'}
              </Text>

              <Ionicons
                name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={18}
                color={statusConfig.color}
              />
            </TouchableOpacity>

            {expanded && (
              <View style={styles.expandedContent}>
                <View style={styles.divider} />

                <Text style={styles.expandedTitle}>Clima da semana</Text>

                <View style={styles.metricGrid}>
                  {monitoringData.weather.weeklyComparison.map((metric) => (
                    <View key={metric.key} style={styles.climateCard}>
                      <View style={styles.climateCardHeader}>
                        <View style={[styles.climateIconBox, { backgroundColor: metric.softColor }]}>
                          <Ionicons name={metric.icon} size={18} color={metric.color} />
                        </View>

                        <Text style={styles.metricTitle}>{metric.label}</Text>
                      </View>

                      <Text style={styles.climateCurrentValue}>
                        {metric.currentDisplay}
                      </Text>

                      <View style={styles.climateCompareRow}>
                        <View>
                          <Text style={styles.compareLabel}>Última semana</Text>
                          <Text style={styles.compareValue}>{metric.lastWeekDisplay}</Text>
                        </View>

                        <View style={styles.deltaChip}>
                          <Text style={[styles.deltaChipText, { color: metric.deltaColor }]}>
                            {metric.deltaDisplay}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.climateImpactText}>{metric.impactText}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.analysisBox}>
                  <View style={styles.analysisHeader}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={18}
                      color={statusConfig.color}
                    />
                    <Text style={[styles.analysisTitle, { color: statusConfig.color }]}>
                      Leitura climática
                    </Text>
                  </View>

                  <Text style={styles.analysisText}>
                    {monitoringData.weather.climateIssueText}
                  </Text>
                </View>

                <Text style={styles.expandedTitle}>Biodiversidade</Text>

                <View style={styles.bioPanel}>
                  <View style={styles.bioHeader}>
                    <View style={styles.iconBoxGreen}>
                      <Ionicons name="leaf-outline" size={22} color={COLORS.auroraGreen} />
                    </View>

                    <View style={styles.bioHeaderText}>
                      <Text style={styles.sectionLabel}>Sinal bioindicador</Text>
                      <Text style={styles.bioTitle}>{monitoringData.species.type}</Text>
                    </View>
                  </View>

                  <Text style={styles.scientificName}>
                    {monitoringData.species.scientificName}
                  </Text>

                  <Text style={styles.cardText}>
                    {monitoringData.species.description}
                  </Text>

                  <View style={styles.biodiversityRow}>
                    <View style={styles.metricBox}>
                      <Text style={styles.metricValue}>
                        {monitoringData.biodiversity.currentQuantity}
                      </Text>
                      <Text style={styles.metricLabel}>Quantidade atual</Text>
                    </View>

                    <View style={styles.metricBox}>
                      <Text style={styles.metricValue}>
                        {monitoringData.biodiversity.expectedQuantity}
                      </Text>
                      <Text style={styles.metricLabel}>Quantidade esperada</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.frequencyBox,
                      {
                        borderColor: statusConfig.color,
                        backgroundColor: statusConfig.softBackground,
                      },
                    ]}
                  >
                    <Text style={styles.frequencyLabel}>Quantidade observada</Text>
                    <Text style={[styles.frequencyValue, { color: statusConfig.color }]}>
                      {monitoringData.biodiversity.frequency}
                    </Text>
                  </View>

                  <View style={styles.analysisBox}>
                    <View style={styles.analysisHeader}>
                      <Ionicons name="leaf-outline" size={18} color={statusConfig.color} />
                      <Text style={[styles.analysisTitle, { color: statusConfig.color }]}>
                        Leitura da biodiversidade
                      </Text>
                    </View>

                    <Text style={styles.analysisText}>
                      {monitoringData.biodiversity.biodiversityIssueText}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.aiCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBoxPurple}>
                <Ionicons name="sparkles" size={22} color={COLORS.cosmicPurple} />
              </View>

              <View style={styles.cardHeaderText}>
                <Text style={styles.sectionLabelPurple}>Resumo inteligente</Text>
                <Text style={styles.cardTitle}>Parecer ambiental</Text>
              </View>
            </View>

            {aiLoading ? (
                <View style={styles.aiLoadingRow}>
                  <ActivityIndicator size="small" color={COLORS.cosmicPurple} />
                  <Text style={styles.aiLoadingText}>Gerando parecer...</Text>
                </View>
              ) : aiError ? (
                <Text style={styles.aiText}>{aiError}</Text>
              ) : (
                <Text style={styles.aiText}>{aiSummary}</Text>
              )}
          </View>
        </>
      ) : (
        <ChartsContent monitoringData={monitoringData} statusConfig={statusConfig} />
      )}
    </ScrollView>
  );
}

function ChartsContent({ monitoringData }) {
  const current = monitoringData.biodiversity.currentQuantity;
  const expected = monitoringData.biodiversity.expectedQuantity;
  const total30 = monitoringData.biodiversity.totalLast30DaysQuantity;

  const temperatureSeries = buildMetricSeries(monitoringData.weather.temperature);
  const humiditySeries = buildMetricSeries(monitoringData.weather.humidity);
  const windSeries = buildWindSeries(monitoringData.weather.windSpeed);
  const pressureSeries = buildMetricSeries(monitoringData.weather.pressure);
  const presenceTrend = buildPresenceSeries(current, expected);

  return (
    <View style={styles.chartsContainer}>
      <MetricLineChart
        title="Temperatura dos últimos 7 dias"
        label="Temperatura"
        icon="thermometer-outline"
        color={COLORS.earthBlue}
        suffix="°C"
        data={temperatureSeries}
      />

      <MetricLineChart
        title="Umidade dos últimos 7 dias"
        label="Umidade"
        icon="water-outline"
        color={stableGreen}
        suffix="%"
        data={humiditySeries}
      />

      <MetricLineChart
        title="Vento dos últimos 7 dias"
        label="Vento"
        icon="speedometer-outline"
        color={COLORS.cosmicPurple}
        suffix=" m/s"
        data={windSeries}
      />

      <MetricLineChart
        title="Pressão dos últimos 7 dias"
        label="Pressão"
        icon="cloud-outline"
        color={COLORS.warning}
        suffix=" hPa"
        data={pressureSeries}
      />

      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <View style={styles.iconBoxGreen}>
            <Ionicons name="leaf-outline" size={22} color={stableGreen} />
          </View>

          <View>
            <Text style={styles.sectionLabel}>Presença</Text>
            <Text style={styles.chartTitle}>Quantidade da espécie</Text>
          </View>
        </View>

        <BarChart
          data={{
            labels: ['Atual', 'Esperada', '30 dias'],
            datasets: [{ data: [current, expected, total30] }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero
          showValuesOnTopOfBars
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(139, 177, 116, ${opacity})`,
            fillShadowGradient: stableGreen,
            fillShadowGradientOpacity: 0.45,
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <View style={styles.iconBoxGreen}>
            <Ionicons name="analytics-outline" size={22} color={stableGreen} />
          </View>

          <View>
            <Text style={styles.sectionLabel}>Tendência</Text>
            <Text style={styles.chartTitle}>Presença estimada nos últimos 7 dias</Text>
          </View>
        </View>

        <LineChart
          data={{
            labels: ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'Ontem', 'Hoje'],
            datasets: [{ data: presenceTrend }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(139, 177, 116, ${opacity})`,
            fillShadowGradient: stableGreen,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: stableGreen,
            },
          }}
          bezier
          withShadow
          withInnerLines={false}
          withOuterLines={false}
          style={styles.chart}
        />
      </View>
    </View>
  );
}

function buildWindSeries(currentValue) {
  const value = Number(currentValue) || 0;

  return [
    Number(Math.max(value - 0.7, 0).toFixed(1)),
    Number(Math.max(value - 0.4, 0).toFixed(1)),
    Number(Math.max(value + 0.2, 0).toFixed(1)),
    Number(Math.max(value - 0.1, 0).toFixed(1)),
    Number(Math.max(value + 0.5, 0).toFixed(1)),
    Number(Math.max(value + 0.1, 0).toFixed(1)),
    Number(value.toFixed(1)),
  ];
}

function buildPresenceSeries(currentQuantity, expectedQuantity) {
  const current = Number(currentQuantity) || 0;
  const expected = Number(expectedQuantity) || 1;

  if (current >= expected) {
    return [
      Math.round(expected * 0.8),
      Math.round(expected * 0.88),
      Math.round(expected * 0.95),
      expected,
      Math.round((expected + current) / 2),
      Math.round(current * 0.96),
      current,
    ];
  }

  return [
    expected,
    Math.round(expected * 0.92),
    Math.round(expected * 0.85),
    Math.round((expected + current) / 2),
    Math.round(current * 1.15),
    Math.round(current * 1.05),
    current,
  ].map((value) => Math.max(value, 0));
}

function MetricLineChart({ title, label, icon, color, suffix, data }) {
  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <View style={[styles.iconMetricChart, { backgroundColor: `${color}22` }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>

        <View>
          <Text style={styles.sectionLabel}>{label}</Text>
          <Text style={styles.chartTitle}>{title}</Text>
        </View>
      </View>

      <LineChart
        data={{
          labels: ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'Ontem', 'Hoje'],
          datasets: [{ data }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix={suffix}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => hexToRgba(color, opacity),
          fillShadowGradient: color,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        withShadow
        withInnerLines={false}
        withOuterLines={false}
        style={styles.chart}
      />
    </View>
  );
}

function buildMonitoringData(params) {
  const city = readParam(params.city, 'Local selecionado');
  const country = readParam(params.country, '');
  const latitude = readParam(params.latitude, '');
  const longitude = readParam(params.longitude, '');

  const commonName = readParam(params.commonName, 'Ave selecionada');
  const scientificName = readParam(params.scientificName, 'Nome científico indisponível');

  const temperature = readNumberParam(params.temperature, 24);
  const humidity = readNumberParam(params.humidity, 78);
  const pressure = readNumberParam(params.pressure, 1013);
  const windSpeed = readNumberParam(params.windSpeed, 3.2);
  const condition = readParam(params.condition, 'Condição indisponível');

  const climateComparison = buildClimateComparison({
    temperature,
    humidity,
    pressure,
    windSpeed,
    temperatureLastWeek: readOptionalNumberParam(params.temperatureLastWeek),
    humidityLastWeek: readOptionalNumberParam(params.humidityLastWeek),
    pressureLastWeek: readOptionalNumberParam(params.pressureLastWeek),
    windSpeedLastWeek: readOptionalNumberParam(params.windSpeedLastWeek),
  });

  const currentQuantity = readNumberParam(params.currentQuantity ?? params.currentRecords, 1);
  const expectedQuantity = readNumberParam(params.expectedQuantity ?? params.expectedRecords, 1);
  const totalLast30DaysQuantity = readNumberParam(
    params.totalLast30DaysQuantity ?? params.totalLast30Days,
    expectedQuantity * 4
  );

  const radiusKm = readNumberParam(params.radiusKm, 25);
  const currentPeriodDays = readNumberParam(params.currentPeriodDays, 7);
  const baselinePeriodDays = readNumberParam(params.baselinePeriodDays, 30);

function calculateEnvironmentalStatus({
  currentQuantity,
  expectedQuantity,
  temperature,
  humidity,
  pressure,
  windSpeed,
}) {
  const biodiversity = calculateBiodiversityRisk({
    currentQuantity,
    expectedQuantity,
  });

  const climate = calculateClimateRisk({
    temperature,
    humidity,
    pressure,
    windSpeed,
  });

  if (biodiversity.isAffected && climate.isAffected) {
    return {
      level: 'critical',
      label: 'Crítico',
      riskPercentage: Math.max(biodiversity.riskPercentage, climate.riskPercentage),
      frequency: biodiversity.frequency,
      description:
        'As condições observadas indicam possíveis alterações ambientais que merecem acompanhamento.',
      reason:
        'Foram identificadas alterações simultâneas nos dados climáticos e na presença da espécie bioindicadora.',
      climate,
      biodiversity,
    };
  }

  if (biodiversity.isAffected || climate.isAffected) {
    return {
      level: 'warning',
      label: 'Atenção',
      riskPercentage: Math.max(biodiversity.riskPercentage, climate.riskPercentage),
      frequency: biodiversity.frequency,
      description:
        'Alterações moderadas foram identificadas nos dados climáticos ou na presença da espécie bioindicadora.',
      reason:
        biodiversity.isAffected
          ? 'A presença da espécie bioindicadora está abaixo do esperado, mas os dados climáticos não indicam alteração crítica.'
          : 'Os dados climáticos indicam alteração relevante, mas a presença da espécie bioindicadora permanece dentro do esperado.',
      climate,
      biodiversity,
    };
  }

  return {
    level: 'stable',
    label: 'Estável',
    riskPercentage: 0,
    frequency: biodiversity.frequency,
    description:
      'As condições climáticas e a presença da espécie bioindicadora sugerem estabilidade ambiental na região monitorada.',
    reason:
      'Clima e bioindicador permanecem compatíveis com o padrão ambiental esperado para a região.',
    climate,
    biodiversity,
  };
}

function calculateBiodiversityRisk({ currentQuantity, expectedQuantity }) {
  const ratio = currentQuantity / Math.max(expectedQuantity, 1);

  if (ratio < 0.5) {
    return {
      isAffected: true,
      level: 'low-critical',
      frequency: 'muito abaixo do esperado',
      riskPercentage: Math.round((1 - ratio) * 100),
    };
  }

  if (ratio < 0.75) {
    return {
      isAffected: true,
      level: 'low-attention',
      frequency: 'abaixo do esperado',
      riskPercentage: Math.round((1 - ratio) * 100),
    };
  }

  if (ratio > 1.5) {
    return {
      isAffected: true,
      level: 'high-attention',
      frequency: 'muito acima do esperado',
      riskPercentage: Math.min(100, Math.round((ratio - 1) * 100)),
    };
  }

  return {
    isAffected: false,
    level: 'normal',
    frequency: 'dentro do esperado',
    riskPercentage: 0,
  };
}

function calculateClimateRisk({ temperature, humidity, pressure, windSpeed }) {
  const issues = [];

  if (temperature >= 35 || temperature <= 8) {
    issues.push('temperatura extrema');
  }

  if (humidity <= 35 || humidity >= 90) {
    issues.push('umidade fora do padrão');
  }

  if (pressure <= 1000) {
    issues.push('pressão atmosférica baixa');
  }

  if (windSpeed >= 8) {
    issues.push('vento intenso');
  }

  return {
    isAffected: issues.length > 0,
    issues,
    riskPercentage: Math.min(100, issues.length * 25),
  };
}

  const environmentalStatus = calculateEnvironmentalStatus({
    currentQuantity,
    expectedQuantity,
    temperature,
    humidity,
    pressure,
    windSpeed,
  });

  const coordinates =
    latitude && longitude ? `${latitude}, ${longitude}` : 'Coordenadas indisponíveis';

  return {
    cacheKey: `${city}-${commonName}-${currentQuantity}-${expectedQuantity}-${temperature}-${humidity}`,

    location: {
      city,
      country,
      coordinates,
    },

    species: {
      commonName,
      scientificName,
      type: 'Ave bioindicadora',
      description: `${commonName} foi selecionada como bioindicador para esta região. A análise compara a quantidade observada agora com uma estimativa esperada para o mesmo território.`,
    },

    weather: {
      temperature,  
      humidity,
      pressure,
      windSpeed,
      condition,
      weeklyComparison: climateComparison,
      climateIssueText: buildClimateIssueText({
        temperature,
        humidity,
        pressure,
        windSpeed,
      }),
    },

    biodiversity: {
      currentQuantity,
      expectedQuantity,
      totalLast30DaysQuantity,
      radiusKm,
      currentPeriodDays,
      baselinePeriodDays,
      frequency: environmentalStatus.frequency,
      biodiversityIssueText: buildBiodiversityIssueText({
        currentQuantity,
        expectedQuantity,
        commonName,
      }),
    },

    status: {
      level: environmentalStatus.level,
      label: environmentalStatus.label,
      riskPercentage: environmentalStatus.riskPercentage,
      description: environmentalStatus.description,
      reason: environmentalStatus.reason,
      climate: environmentalStatus.climate,
      biodiversity: environmentalStatus.biodiversity,
    },

    aiSummary: `Nos últimos ${currentPeriodDays} dias, foram observados ${currentQuantity} indivíduos de ${commonName} em um raio de ${radiusKm} km. A quantidade esperada foi estimada em ${expectedQuantity} indivíduos por semana, com base nos últimos ${baselinePeriodDays} dias. O status ambiental foi classificado como ${environmentalStatus.label.toLowerCase()} porque a quantidade observada está ${environmentalStatus.frequency.toLowerCase()}.`,
  };
}

function calculateBiodiversityStatus({ currentQuantity, expectedQuantity }) {
  const lowerLimit = expectedQuantity * 0.35;
  const attentionLimit = expectedQuantity * 0.75;

  const ratio = currentQuantity / Math.max(expectedQuantity, 1);
  const riskPercentage = Math.min(
    100,
    Math.round((1 - Math.min(ratio, 1)) * 100)
  );

  if (currentQuantity < lowerLimit) {
    return {
      level: 'critical',
      label: 'Crítico',
      riskPercentage,
      frequency: 'muito abaixo do esperado',
      description:
        'As condições observadas indicam possíveis alterações ambientais que merecem acompanhamento.',
      reason:
        'Clima e bioindicador indicam alterações ambientais relevantes que exigem acompanhamento.',
    };
  }

  if (currentQuantity < attentionLimit) {
    return {
      level: 'warning',
      label: 'Atenção',
      riskPercentage,
      frequency: 'abaixo do esperado',
      description:
        'Alterações moderadas foram identificadas nos dados climáticos ou na presença da espécie bioindicadora.',
      reason:
        'Clima e bioindicador apresentam variações moderadas que justificam atenção contínua.',
    };
  }

  return {
    level: 'stable',
    label: 'Estável',
    riskPercentage,
    frequency: 'dentro do esperado',
    description:
      'As condições climáticas e a presença da espécie bioindicadora sugerem estabilidade ambiental na região monitorada.',
    reason:
      'Clima e bioindicador permanecem compatíveis com o padrão ambiental esperado para a região.',
  };
}

function getStatusConfig(level) {
  if (level === 'critical') {
    return {
      color: COLORS.danger,
      icon: 'alert-circle-outline',
      background: '#FEF2F2',
      softBackground: '#FEE2E2',
      border: '#FECACA',
      badgeBackground: '#FEE2E2',
      badgeText: COLORS.danger,
      expandBackground: '#FEE2E2',
    };
  }

  if (level === 'warning') {
    return {
      color: COLORS.warning,
      icon: 'warning-outline',
      background: '#FFFBEB',
      softBackground: '#FEF3C7',
      border: '#FDE68A',
      badgeBackground: '#FEF3C7',
      badgeText: '#92400E',
      expandBackground: '#fbbe2446',
    };
  }

  return {
    color: stableGreen,
    icon: 'checkmark-circle-outline',
    background: '#F7FAF5',
    softBackground: '#EDF4E9',
    border: '#D8E6D0',
    badgeBackground: '#EDF4E9',
    badgeText: stableGreen,
    expandBackground: '#EDF4E9',
  };
}

function buildClimateComparison(data) {
  return [
    
    createClimateMetric({
      key: 'temperature',
      label: 'Temperatura',
      icon: 'thermometer-outline',
      current: data.temperature,
      lastWeek: data.temperatureLastWeek,
      unit: '°C',
      color: COLORS.earthBlue,
      softColor: '#EFF6FF',
      impactText:
        'Variações de temperatura podem alterar conforto térmico, evaporação e atividade das aves.',
    }),
    createClimateMetric({
      key: 'humidity',
      label: 'Umidade',
      icon: 'water-outline',
      current: data.humidity,
      lastWeek: data.humidityLastWeek,
      unit: '%',
      color: stableGreen,
      softColor: '#EDF4E9',
      impactText:
        'Mudanças de umidade podem afetar disponibilidade de água e sensibilidade do ambiente.',
    }),
    createClimateMetric({
      key: 'pressure',
      label: 'Pressão',
      icon: 'cloud-outline',
      current: data.pressure,
      lastWeek: data.pressureLastWeek,
      unit: ' hPa',
      color: COLORS.warning,
      softColor: '#FEF3C7',
      impactText:
        'Pressão atmosférica ajuda a contextualizar frentes e instabilidades climáticas.',
    }),
    createClimateMetric({
      key: 'windSpeed',
      label: 'Vento',
      icon: 'speedometer-outline',
      current: data.windSpeed,
      lastWeek: data.windSpeedLastWeek,
      unit: ' m/s',
      color: COLORS.cosmicPurple,
      softColor: '#F3E8FF',
      impactText:
        'Vento mais forte pode afetar deslocamento, dispersão e permanência das aves.',
    }),
  ];
}

function createClimateMetric({ key, label, icon, current, lastWeek, unit, color, softColor, impactText }) {
  const hasComparison = Number.isFinite(lastWeek);
  const delta = hasComparison ? current - lastWeek : null;
  const deltaPrefix = delta === null ? '' : delta > 0 ? '+' : '';

  return {
    key,
    label,
    icon,
    color,
    softColor,
    current,
    lastWeek,
    currentDisplay: `${current}${unit}`,
    lastWeekDisplay: hasComparison ? `${lastWeek}${unit}` : 'sem dado',
    deltaDisplay: delta === null ? 'sem comparação' : `${deltaPrefix}${formatClimateDelta(delta, unit)}`,
    deltaColor: delta === null ? COLORS.muted : delta > 0 ? COLORS.danger : delta < 0 ? stableGreen : COLORS.muted,
    impactText,
  };
}

function buildClimateIssueText({ temperature, humidity, pressure, windSpeed }) {
  const issues = [];

  if (temperature >= 32) issues.push('temperatura elevada');
  if (temperature <= 12) issues.push('temperatura muito baixa');
  if (humidity <= 40) issues.push('baixa umidade');
  if (humidity >= 85) issues.push('umidade elevada');
  if (pressure <= 1000) issues.push('pressão atmosférica baixa');
  if (windSpeed >= 8) issues.push('vento intenso');

  if (issues.length === 0) {
    return 'Os indicadores climáticos analisados não apresentam desvios expressivos no momento.';
  }

  return `Foram identificados sinais de ${issues.join(', ')}. Esses fatores podem influenciar o comportamento da espécie e a estabilidade ambiental da região.`;
}

function buildBiodiversityIssueText({ currentQuantity, expectedQuantity, commonName }) {
  const ratio = currentQuantity / Math.max(expectedQuantity, 1);

  if (ratio > 1.5) {
    return `A quantidade observada de ${commonName} está muito acima do esperado. Isso pode indicar concentração incomum da espécie na área monitorada ou deslocamento vindo de regiões próximas.`;
  }

  if (ratio >= 0.75) {
    return `A quantidade observada de ${commonName} está próxima do esperado, sugerindo presença compatível com o padrão recente da região.`;
  }

  if (ratio >= 0.5) {
    return `A quantidade observada de ${commonName} está abaixo do esperado, o que pode indicar variação ambiental moderada ou menor atividade da espécie.`;
  }

  return `A quantidade observada de ${commonName} está muito abaixo do esperado, indicando um sinal bioindicador relevante para acompanhamento.`;
}

function buildTrendData(currentQuantity, expectedQuantity) {
  const base = expectedQuantity;
  const middleOne = Math.round((expectedQuantity + currentQuantity) / 2);
  const middleTwo = Math.round((middleOne + currentQuantity) / 2);

  return [base, middleOne, middleTwo, currentQuantity];
}

function formatClimateDelta(delta, unit) {
  const absoluteDelta = Math.abs(delta);

  if (unit === ' m/s') {
    return `${absoluteDelta.toFixed(1)}${unit}`;
  }

  return `${Math.round(absoluteDelta)}${unit}`;
}

function buildMetricSeries(currentValue) {
  const value = Number(currentValue) || 0;

  return [
    Math.max(Math.round(value * 0.92), 0),
    Math.max(Math.round(value * 0.95), 0),
    Math.max(Math.round(value * 1.03), 0),
    Math.max(Math.round(value * 0.98), 0),
    Math.max(Math.round(value * 1.02), 0),
    Math.max(Math.round(value * 0.97), 0),
    Math.max(Math.round(value), 0),
  ];
}

function hexToRgba(hex, opacity = 1) {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function readParam(value, fallback) {
  if (Array.isArray(value)) return value[0] || fallback;
  return value ?? fallback;
}

function readNumberParam(value, fallback) {
  const rawValue = readParam(value, fallback);
  const numberValue = Number(rawValue);

  if (Number.isNaN(numberValue)) return fallback;
  return numberValue;
}

function readOptionalNumberParam(value) {
  if (value === undefined || value === null || value === '') return null;

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) return null;
  return numberValue;
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
    marginBottom: 20,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 8,
  },

  title: {
    flex: 1,
    fontFamily: FONT.title,
    fontSize: 34,
    color: COLORS.black,
  },

  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 20,
  },

  favoriteButtonSaved: {
    backgroundColor: '#FEF3C7',
    borderColor: COLORS.warning,
  },

  subtitle: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
  },

  tabsContainer: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  tabButtonActive: {
    backgroundColor: COLORS.border,
  },

  tabText: {
    fontFamily: FONT.bodyBold,
    fontSize: 13,
    color: COLORS.muted,
  },

  tabTextActive: {
    color: COLORS.white,
  },

  quickCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },

  quickCard: {
    flex: 1,
    minHeight: 148,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between',
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

  iconBoxPurple: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
  },

  cardLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 11,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 14,
  },

  quickCardTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 21,
    color: COLORS.black,
    marginTop: 10,
  },

  quickCardText: {
    fontFamily: FONT.body,
    fontSize: 13,
    color: COLORS.muted,
  },

  statusCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 18,
  },

  statusTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },

  statusTitleBox: {
    flex: 1,
    paddingRight: 8,
  },

  sectionLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  sectionLabelPurple: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  statusBadge: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  statusBadgeText: {
    fontFamily: FONT.bodyBold,
    fontSize: 12,
    textTransform: 'uppercase',
  },

  statusTitle: {
    fontFamily: FONT.title,
    fontSize: 32,
    marginTop: 4,
  },

  statusDescription: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.black,
    marginBottom: 8,
  },

  statusText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },

  expandButton: {
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 18,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  expandButtonText: {
    fontFamily: FONT.bodyBold,
    fontSize: 14,
  },

  expandedContent: {
    marginTop: 18,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 18,
  },

  expandedTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 22,
  },

  infoCard: {
    width: '48%',
    minHeight: 112,
    padding: 14,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between',
  },

  infoIconBox: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },

  infoValue: {
    fontFamily: FONT.title,
    fontSize: 24,
    color: COLORS.black,
    marginTop: 10,
    textTransform: 'capitalize',
  },

  infoLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
  },

  bioPanel: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  bioHeaderText: {
    flex: 1,
  },

  bioTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 19,
    color: COLORS.black,
    marginTop: 2,
  },

  scientificName: {
    fontFamily: FONT.bodyMedium,
    fontSize: 14,
    color: COLORS.auroraGreen,
    marginBottom: 8,
    fontStyle: 'italic',
  },

  cardText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
    marginBottom: 16,
  },

  biodiversityRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },

  metricBox: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  metricValue: {
    fontFamily: FONT.title,
    fontSize: 32,
    color: stableGreen,
  },

  metricLabel: {
    fontFamily: FONT.body,
    fontSize: 12,
    color: COLORS.muted,
  },

  frequencyBox: {
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },

  frequencyLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 4,
  },

  frequencyValue: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
  },

  analysisBox: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 14,
    marginBottom: 18,
  },

  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  analysisTitle: {
    fontFamily: FONT.bodyBold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  analysisText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },

  aiCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: '#4C1D95',
    marginTop: 2,
  },

  aiText: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 23,
    color: '#475569',
  },

  aiLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  aiLoadingText: {
    fontFamily: FONT.bodyMedium,
    fontSize: 14,
    color: COLORS.cosmicPurple,
  },

  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  climateCard: {
    width: '48%',
    padding: 14,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  climateCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  climateIconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  metricTitle: {
    flex: 1,
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  climateCurrentValue: {
    fontFamily: FONT.title,
    fontSize: 30,
    color: COLORS.black,
    marginBottom: 10,
  },

  climateCompareRow: {
    gap: 8,
    marginBottom: 10,
  },

  compareLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 11,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  compareValue: {
    fontFamily: FONT.subtitle,
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
  },

  deltaChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F8FAFC',
  },

  deltaChipText: {
    fontFamily: FONT.bodyBold,
    fontSize: 12,
  },

  climateImpactText: {
    fontFamily: FONT.body,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.muted,
  },

  chartsContainer: {
    gap: 22,
  },

  chartSection: {
    paddingHorizontal:20,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },

  iconMetricChart: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chartTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: COLORS.black,
    marginTop: 2,
  },

  chart: {
    borderRadius: 16,
    marginLeft: -18,
  },

  birdComparisonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  birdComparisonCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  birdComparisonLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  birdComparisonValue: {
    fontFamily: FONT.title,
    fontSize: 26,
    color: stableGreen,
    marginTop: 6,
  },

  birdComparisonNote: {
    fontFamily: FONT.body,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.muted,
    marginTop: 4,
  },
});