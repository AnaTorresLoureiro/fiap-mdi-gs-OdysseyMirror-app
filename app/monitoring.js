import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../constant/theme';
import { styles } from '../styles/monitoring';
import { useMonitoringScreen } from '../hooks/monitoring';
import { ChartsContent } from '../components/ChartsContent';

export default function Monitorar() {
  const {
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
  } = useMonitoringScreen();

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
                    <Ionicons name="alert-circle-outline" size={18} color={statusConfig.color} />
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
        <ChartsContent monitoringData={monitoringData} />
      )}
    </ScrollView>
  );
}