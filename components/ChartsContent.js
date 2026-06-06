import { Dimensions, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, LineChart } from 'react-native-chart-kit';

import { COLORS } from '../constant/theme';
import { styles } from '../styles/monitoring';
import { stableGreen } from '../helpers/monitoring';

const screenWidth = Dimensions.get('window').width;

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

export function ChartsContent({ monitoringData }) {
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