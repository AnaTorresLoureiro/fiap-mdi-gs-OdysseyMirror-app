import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../constant/theme';
import { styles } from '../styles/history';
import { getStatusConfig } from '../helpers/history';
import { MiniMetric } from './MiniMetric';

export function HistoryCard({ item, onOpenDetails, onRemove }) {
  const statusConfig = getStatusConfig(item.status);

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      style={styles.historyCard}
      onPress={onOpenDetails}
    >
      <View style={styles.cardTop}>
        <View style={styles.locationContent}>
          <View style={styles.locationTextBox}>
            <Text style={styles.cardLabel}>Local monitorado</Text>
            <Text style={styles.cardTitle}>{item.location}</Text>
            <Text style={styles.coordinates}>{item.coordinates}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.removeButton}
            onPress={onRemove}
          >
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
          <MaterialCommunityIcons
            name="bird"
            size={21}
            color={COLORS.auroraGreen}
          />
        </View>

        <View style={styles.speciesTextBox}>
          <Text style={styles.cardLabel}>Espécie bioindicadora</Text>
          <Text style={styles.speciesName}>{item.species}</Text>
          <Text style={styles.scientificName}>{item.scientificName}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <MiniMetric
          icon="thermometer-outline"
          label="Temperatura"
          value={item.temperature}
        />

        <MiniMetric
          icon="water-outline"
          label="Umidade"
          value={item.humidity}
        />

        <MiniMetric
          icon="leaf-outline"
          label="Presença"
          value={item.currentQuantity ?? item.currentRecords ?? item.recentRecords}
        />
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
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={COLORS.surfaceSoft}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}