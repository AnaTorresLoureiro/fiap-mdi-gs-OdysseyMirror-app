import { COLORS } from '../constant/theme';

export const stableGreen = '#8BB174';

export function buildMonitoringData(params) {
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

  const environmentalStatus = calculateEnvironmentalStatus({
    currentQuantity,
    expectedQuantity,
    temperature,
    humidity,
    pressure,
    windSpeed,
  });

  const coordinates =
    latitude && longitude ? `${latitude}, ${longitude}` : readParam(params.coordinates, 'Coordenadas indisponíveis');

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
  };
}

export function getStatusConfig(level) {
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
          ? 'A presença da espécie bioindicadora está fora do esperado, mas os dados climáticos não indicam alteração crítica.'
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

  if (temperature >= 35 || temperature <= 8) issues.push('temperatura extrema');
  if (humidity <= 35 || humidity >= 90) issues.push('umidade fora do padrão');
  if (pressure <= 1000) issues.push('pressão atmosférica baixa');
  if (windSpeed >= 8) issues.push('vento intenso');

  return {
    isAffected: issues.length > 0,
    issues,
    riskPercentage: Math.min(100, issues.length * 25),
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

function createClimateMetric({
  key,
  label,
  icon,
  current,
  lastWeek,
  unit,
  color,
  softColor,
  impactText,
}) {
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
    deltaDisplay:
      delta === null ? 'sem comparação' : `${deltaPrefix}${formatClimateDelta(delta, unit)}`,
    deltaColor:
      delta === null ? COLORS.muted : delta > 0 ? COLORS.danger : delta < 0 ? stableGreen : COLORS.muted,
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

function buildBiodiversityIssueText({
  currentQuantity,
  expectedQuantity,
  commonName,
}) {
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

function formatClimateDelta(delta, unit) {
  const absoluteDelta = Math.abs(delta);

  if (unit === ' m/s') {
    return `${absoluteDelta.toFixed(1)}${unit}`;
  }

  return `${Math.round(absoluteDelta)}${unit}`;
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