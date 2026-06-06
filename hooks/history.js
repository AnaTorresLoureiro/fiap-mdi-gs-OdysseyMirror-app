import { useMemo, useState } from 'react';
import { router } from 'expo-router';

import { useMonitoring } from '../context/MonitoringContext';
import { buildMonitoringRouteParams } from '../helpers/history';

const FILTERS = ['all', 'Estável', 'Atenção', 'Crítico'];

export function useHistoryScreen() {
  const { savedMonitorings, removeMonitoring } = useMonitoring();

  const [filter, setFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const total = savedMonitorings.length;
  const totalLabel = total === 1 ? 'monitoramento' : 'monitoramentos';

  const stableCount = savedMonitorings.filter(
    (item) => item.status === 'Estável'
  ).length;

  const attentionCount = savedMonitorings.filter(
    (item) => item.status === 'Atenção'
  ).length;

  const criticalCount = savedMonitorings.filter(
    (item) => item.status === 'Crítico'
  ).length;

  const filteredMonitorings = useMemo(() => {
    if (filter === 'all') {
      return savedMonitorings;
    }

    return savedMonitorings.filter((item) => item.status === filter);
  }, [filter, savedMonitorings]);

  function openFilterMenu() {
    setShowFilterMenu(true);
  }

  function closeFilterMenu() {
    setShowFilterMenu(false);
  }

  function selectFilter(value) {
    setFilter(value);
    closeFilterMenu();
  }

  function openMonitoringDetails(item) {
    router.push({
      pathname: '/monitoring',
      params: buildMonitoringRouteParams(item),
    });
  }

  async function handleRemoveFavorite(id) {
    await removeMonitoring(id);
  }

  return {
    filter,
    filters: FILTERS,
    showFilterMenu,
    filteredMonitorings,
    total,
    totalLabel,
    stableCount,
    attentionCount,
    criticalCount,
    openFilterMenu,
    closeFilterMenu,
    selectFilter,
    openMonitoringDetails,
    handleRemoveFavorite,
  };
}