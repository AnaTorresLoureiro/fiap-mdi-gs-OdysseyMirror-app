import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { useMonitoring } from '../context/MonitoringContext';
import {
  generateMonitoringSummary,
  generateStatusInsight,
} from '../service/llamaService';

import {
  buildMonitoringData,
  getStatusConfig,
} from '../helpers/monitoring';

export function useMonitoringScreen() {
  const params = useLocalSearchParams();
  const { saveMonitoring } = useMonitoring();

  const [saved, setSaved] = useState(params.isSaved === 'true');
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  const [aiLoading, setAiLoading] = useState(false);
  const [statusInsight, setStatusInsight] = useState('');
  const [aiSummary, setAiSummary] = useState(params.summary ?? '');
  const [aiError, setAiError] = useState(null);

  const monitoringData = useMemo(() => buildMonitoringData(params), [params]);
  const statusConfig = getStatusConfig(monitoringData.status.level);

  useEffect(() => {
    if (params.isSaved === 'true') {
      setAiLoading(false);
      return;
    }

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
  }, [monitoringData.cacheKey, params.isSaved]);

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

  return {
    saved,
    expanded,
    setExpanded,
    activeTab,
    setActiveTab,
    aiLoading,
    aiError,
    aiSummary,
    statusInsight,
    monitoringData,
    statusConfig,
    handleSaveMonitoring,
  };
}