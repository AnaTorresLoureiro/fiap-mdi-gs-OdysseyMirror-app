import { StyleSheet } from 'react-native';

import { COLORS, FONT } from '../constant/theme';

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