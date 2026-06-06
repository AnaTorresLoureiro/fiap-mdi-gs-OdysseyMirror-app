import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS, FONT } from '../../constant/theme';
import { useMonitoring } from '../../context/MonitoringContext';
import { useState } from 'react';

export default function Acompanhar() {
  const { savedMonitorings, removeMonitoring } = useMonitoring();
  const [filter, setFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const FILTERS = ['all', 'Estável', 'Atenção', 'Crítico'];

  const total = savedMonitorings.length;
  const totalLabel = total === 1 ? 'monitoramento' : 'monitoramentos';
  const stableCount = savedMonitorings.filter((item) => item.status === 'Estável').length;
  const attentionCount = savedMonitorings.filter((item) => item.status === 'Atenção').length;
  const criticalCount = savedMonitorings.filter((item) => item.status === 'Crítico').length;

  const filteredMonitorings = filter === 'all' ? savedMonitorings : savedMonitorings.filter((m) => m.status === filter);

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Acompanhar</Text>
        </View>

        <Text style={styles.subtitle}>
          Revise os monitoramentos salvos e acompanhe os sinais ambientais ao longo do tempo.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.sectionLabel}>Resumo geral</Text>
            <Text style={styles.summaryTitle}>{total} {totalLabel}</Text>
          </View>
        </View>

        <View style={styles.statusOverview}>
          <StatusCount label="Estável" value={stableCount} color={COLORS.success} />
          <StatusCount label="Atenção" value={attentionCount} color={COLORS.warning} />
          <StatusCount label="Crítico" value={criticalCount} color={COLORS.danger} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Histórico orbital</Text>
        
        <TouchableOpacity activeOpacity={0.8} style={styles.headerButton} onPress={openFilterMenu}>
            <Ionicons name="filter-outline" size={21} color={COLORS.earthBlue} />
        </TouchableOpacity>
      </View>

      <View style={styles.historyList}>
        {filteredMonitorings.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.iconBoxBlue}>
              <Ionicons name="planet-outline" size={28} color={COLORS.earthBlue} />
            </View>

            <Text style={styles.emptyTitle}>{filter === 'all' ? 'Nenhum monitoramento salvo' : 'Nenhum monitoramento encontrado'}</Text>

            <Text style={styles.emptyText}>
              {filter === 'all'
                ? 'Escolha uma região, analise os dados ambientais e salve monitoramentos usando a estrela.'
                : `Nenhum monitoramento com status "${filter}" foi encontrado.`}
            </Text>
          </View>
        ) : (
          filteredMonitorings.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onOpenDetails={() => openMonitoringDetails(item)}
              onRemove={() => handleRemoveFavorite(item.id)}
            />
          ))
        )}
      </View>

      <Modal visible={showFilterMenu} transparent animationType="fade" onRequestClose={closeFilterMenu}>
        <Pressable style={styles.modalBackdrop} onPress={closeFilterMenu}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar monitoramentos</Text>
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.modalOption, filter === f && styles.modalOptionActive]}
                activeOpacity={0.8}
                onPress={() => selectFilter(f)}
              >
                <Text style={[styles.modalOptionText, filter === f && styles.modalOptionTextActive]}>
                  {f === 'all' ? 'Todos' : f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

function HistoryCard({ item, onOpenDetails, onRemove }) {
  const statusConfig = getStatusConfig(item.status);

  return (
    <TouchableOpacity activeOpacity={0.82} style={styles.historyCard} onPress={onOpenDetails}>
      <View style={styles.cardTop}>
        <View style={styles.locationContent}>
          <View style={styles.locationTextBox}>
            <Text style={styles.cardLabel}>Local monitorado</Text>
            <Text style={styles.cardTitle}>{item.location}</Text>
            <Text style={styles.coordinates}>{item.coordinates}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.removeButton} onPress={onRemove}>
            <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
    
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.background }]}>
          <Ionicons name={statusConfig.icon} size={15} color={statusConfig.text} />
          <Text style={[styles.statusBadgeText, { color: statusConfig.text }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.speciesRow}>
        <View style={styles.iconBoxGreen}>
          <MaterialCommunityIcons name="bird" size={21} color={COLORS.auroraGreen} />
        </View>

        <View style={styles.speciesTextBox}>
          <Text style={styles.cardLabel}>Espécie bioindicadora</Text>
          <Text style={styles.speciesName}>{item.species}</Text>
          <Text style={styles.scientificName}>{item.scientificName}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <MiniMetric icon="thermometer-outline" label="Temperatura" value={item.temperature} />
        <MiniMetric icon="water-outline" label="Umidade" value={item.humidity} />
        <MiniMetric icon="leaf-outline" label="Presença" value={item.currentQuantity ?? item.currentRecords ?? item.recentRecords} />
      </View>

      <View style={styles.aiBox}>
        <View style={styles.aiHeader}>
          <View style={styles.smallPurpleIcon}>
            <Ionicons name="sparkles" size={15} color={COLORS.cosmicPurple} />
          </View>

          <Text style={styles.aiLabel}>Resumo inteligente</Text>
        </View>

        <Text style={styles.summaryText}>{item.summary}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.muted} />
          <Text style={styles.dateText}>
            {item.date} às {item.time}
          </Text>
        </View>

        <View style={styles.footerActions}>
          <View style={styles.openDetails}>
            <Text style={styles.openDetailsText}>Ver detalhes</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={COLORS.surfaceSoft} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function buildMonitoringRouteParams(item) {
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

    temperatureLastWeek: item.temperatureLastWeek != null ? String(item.temperatureLastWeek) : '',
    humidityLastWeek: item.humidityLastWeek != null ? String(item.humidityLastWeek) : '',
    pressureLastWeek: item.pressureLastWeek != null ? String(item.pressureLastWeek) : '',
    windSpeedLastWeek: item.windSpeedLastWeek != null ? String(item.windSpeedLastWeek) : '',

    currentQuantity: item.currentQuantity != null ? String(item.currentQuantity) : '',
    expectedQuantity: item.expectedQuantity != null ? String(item.expectedQuantity) : '',
    totalLast30DaysQuantity:
      item.totalLast30DaysQuantity != null ? String(item.totalLast30DaysQuantity) : '',

    radiusKm: item.radiusKm != null ? String(item.radiusKm) : '',
    currentPeriodDays: item.currentPeriodDays != null ? String(item.currentPeriodDays) : '',
    baselinePeriodDays: item.baselinePeriodDays != null ? String(item.baselinePeriodDays) : '',

    savedStatus: item.status,
    summary: item.summary,
  };
}

function extractNumericValue(value) {
  if (value == null) {
    return null;
  }

  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''));

  return Number.isNaN(parsed) ? null : parsed;
}

function MiniMetric({ icon, label, value }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIconBox}>
        <Ionicons name={icon} size={17} color={COLORS.earthBlue} />
      </View>

      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function StatusCount({ label, value, color }) {
  return (
    <View style={styles.statusCountCard}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={styles.statusCountValue}>{value}</Text>
      <Text style={styles.statusCountLabel}>{label}</Text>
    </View>
  );
}

function getStatusConfig(status) {
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
    fontSize: 36,
    color: COLORS.black,
  },

  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 6,
  },

  filterLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 11,
    color: COLORS.earthBlue,
    marginTop: 6,
    marginLeft: 6,
  },

  subtitle: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
  },

  summaryCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },

  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  sectionLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  summaryTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 24,
    color: COLORS.black,
    marginTop: 4,
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

  statusOverview: {
    flexDirection: 'row',
    gap: 10,
  },

  statusCountCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },

  statusCountValue: {
    fontFamily: FONT.title,
    fontSize: 26,
    color: COLORS.black,
  },

  statusCountLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
  },

  sectionHeader: {
    marginBottom: 14,
    flexDirection: 'row',
    gap: 130
  },

  sectionTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 24,
    color: COLORS.black,
    alignSelf: 'center'
  },

  historyList: {
    gap: 16,
  },

  emptyCard: {
    padding: 32,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },

  emptyTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 22,
    color: COLORS.black,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },

  emptyText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.muted,
    textAlign: 'center',
    maxWidth: 280,
  },

  historyCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTop: {
    gap: 14,
  },

  locationContent: {
    flexDirection: 'row',
    gap: 12,
  },

  locationTextBox: {
    flex: 1,
  },

  cardLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 11,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  cardTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 19,
    color: COLORS.black,
    marginTop: 3,
  },

  coordinates: {
    fontFamily: FONT.body,
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },

  statusBadge: {
    alignSelf: 'flex-start',
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
    letterSpacing: 0.5,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },

  speciesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },

  speciesTextBox: {
    flex: 1,
  },

  speciesName: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    color: COLORS.black,
    marginTop: 3,
  },

  scientificName: {
    fontFamily: FONT.bodyMedium,
    fontSize: 13,
    color: COLORS.auroraGreen,
    fontStyle: 'italic',
    marginTop: 2,
  },

  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  metricIconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    marginBottom: 8,
  },

  metricValue: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    color: COLORS.black,
  },

  metricLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },

  aiBox: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginBottom: 16,
  },

  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  smallPurpleIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
  },

  aiLabel: {
    fontFamily: FONT.bodyBold,
    fontSize: 13,
    color: '#4C1D95',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  summaryText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  dateText: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
  },

  openDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  openDetailsText: {
    fontFamily: FONT.bodyBold,
    fontSize: 12,
    color: COLORS.surfaceSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: 300,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },

  modalTitle: {
    fontFamily: FONT.bodyBold,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
  },

  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  modalOptionActive: {
    backgroundColor: '#EEF2FF',
  },

  modalOptionText: {
    fontFamily: FONT.body,
    fontSize: 15,
    color: COLORS.black,
  },

  modalOptionTextActive: {
    color: COLORS.cosmicPurple,
    fontFamily: FONT.bodyBold,
  },
});