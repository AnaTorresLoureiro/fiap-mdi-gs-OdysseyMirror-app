import { COLORS } from '../constant/theme';

export function buildMonitoringRouteParams(item) {
  const temperature = extractNumericValue(item.temperature);
  const humidity = extractNumericValue(item.humidity);
  const pressure = extractNumericValue(item.pressure);
  const windSpeed = extractNumericValue(item.windSpeed);

  return {
    savedId: item.id,
    isSaved: 'true',

    city: item.location,
    country: item.country ?? '',
    coordinates: item.coordinates,

    commonName: item.species,
    scientificName: item.scientificName,

    temperature: temperature != null ? String(temperature) : '',
    humidity: humidity != null ? String(humidity) : '',
    pressure: pressure != null ? String(pressure) : '',
    windSpeed: windSpeed != null ? String(windSpeed) : '',
    condition: item.condition ?? '',

    temperatureLastWeek:
      item.temperatureLastWeek != null ? String(item.temperatureLastWeek) : '',
    humidityLastWeek:
      item.humidityLastWeek != null ? String(item.humidityLastWeek) : '',
    pressureLastWeek:
      item.pressureLastWeek != null ? String(item.pressureLastWeek) : '',
    windSpeedLastWeek:
      item.windSpeedLastWeek != null ? String(item.windSpeedLastWeek) : '',

    currentQuantity:
      item.currentQuantity != null ? String(item.currentQuantity) : '',
    expectedQuantity:
      item.expectedQuantity != null ? String(item.expectedQuantity) : '',
    totalLast30DaysQuantity:
      item.totalLast30DaysQuantity != null
        ? String(item.totalLast30DaysQuantity)
        : '',

    radiusKm: item.radiusKm != null ? String(item.radiusKm) : '',
    currentPeriodDays:
      item.currentPeriodDays != null ? String(item.currentPeriodDays) : '',
    baselinePeriodDays:
      item.baselinePeriodDays != null ? String(item.baselinePeriodDays) : '',

    savedStatus: item.status,
    summary: item.summary,
  };
}

export function extractNumericValue(value) {
  if (value == null) {
    return null;
  }

  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''));

  return Number.isNaN(parsed) ? null : parsed;
}

export function getStatusConfig(status) {
  if (status === 'Estável') {
    return {
      icon: 'checkmark-circle-outline',
      background: '#DCFCE7',
      text: COLORS.success,
    };
  }

  if (status === 'Crítico') {
    return {
      icon: 'alert-circle-outline',
      background: '#FEE2E2',
      text: COLORS.danger,
    };
  }

  return {
    icon: 'warning-outline',
    background: '#FEF3C7',
    text: '#92400E',
  };
}