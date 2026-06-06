import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constant/theme';
import { styles } from '../../styles/history';
import { useHistoryScreen } from '../../hooks/history';
import { HistoryCard } from '../../components/HistoryCard';
import { StatusCount } from '../../components/StatusCount';

export default function Acompanhar() {
  const {
    filter,
    filters,
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
  } = useHistoryScreen();

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
            <Text style={styles.summaryTitle}>
              {total} {totalLabel}
            </Text>
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

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerButton}
          onPress={openFilterMenu}
        >
          <Ionicons name="filter-outline" size={21} color={COLORS.earthBlue} />
        </TouchableOpacity>
      </View>

      <View style={styles.historyList}>
        {filteredMonitorings.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.iconBoxBlue}>
              <Ionicons name="planet-outline" size={28} color={COLORS.earthBlue} />
            </View>

            <Text style={styles.emptyTitle}>
              {filter === 'all'
                ? 'Nenhum monitoramento salvo'
                : 'Nenhum monitoramento encontrado'}
            </Text>

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

      <Modal
        visible={showFilterMenu}
        transparent
        animationType="fade"
        onRequestClose={closeFilterMenu}
      >
        <Pressable style={styles.modalBackdrop} onPress={closeFilterMenu}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar monitoramentos</Text>

            {filters.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modalOption,
                  filter === item && styles.modalOptionActive,
                ]}
                activeOpacity={0.8}
                onPress={() => selectFilter(item)}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    filter === item && styles.modalOptionTextActive,
                  ]}
                >
                  {item === 'all' ? 'Todos' : item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}