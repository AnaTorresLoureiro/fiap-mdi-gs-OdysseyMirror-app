import { StyleSheet } from 'react-native';

import { COLORS, FONT } from '../constant/theme';
import { stableGreen } from '../helpers/monitoring';

export const styles = StyleSheet.create({
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