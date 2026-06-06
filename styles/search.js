import { StyleSheet } from 'react-native';

import {
  COLORS,
  FONT,
} from '../constant/theme';

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

  title: {
    fontFamily: FONT.title,
    fontSize: 36,
    color: COLORS.black,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted,
  },

  sectionCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },

  sectionHeaderText: {
    flex: 1,
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

  sectionLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  sectionTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: COLORS.black,
    marginTop: 2,
  },

  mapWrapper: {
    height: 310,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },

  map: {
    flex: 1,
  },

  coordinatesBox: {
    flexDirection: 'row',
    gap: 12,
  },

  coordinateCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  coordinateLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 4,
  },

  coordinateValue: {
    fontFamily: FONT.subtitle,
    fontSize: 17,
    color: COLORS.black,
  },

  loadingCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },

  loadingText: {
    fontFamily: FONT.bodyMedium,
    fontSize: 14,
    color: COLORS.earthBlue,
  },

  weatherCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  weatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  weatherItem: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  weatherValue: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 4,
    textTransform: 'capitalize',
  },

  weatherLabel: {
    fontFamily: FONT.bodyMedium,
    fontSize: 12,
    color: COLORS.muted,
  },

  emptyText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted,
  },

  birdList: {
    gap: 10,
  },

  birdCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  birdCardSelected: {
    borderColor: COLORS.auroraGreen,
    backgroundColor: '#90a95523',
  },

  birdContent: {
    flex: 1,
  },

  birdName: {
    fontFamily: FONT.subtitle,
    fontSize: 18,
    color: COLORS.black,
  },

  scientificName: {
    fontFamily: FONT.bodyMedium,
    fontSize: 13,
    color: COLORS.auroraGreen,
    fontStyle: 'italic',
    marginTop: 2,
  },

  birdMeta: {
    fontFamily: FONT.body,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },

  selectCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectCircleActive: {
    backgroundColor: COLORS.auroraGreen,
    borderColor: COLORS.auroraGreen,
  },

  resultCard: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  resultTitle: {
    fontFamily: FONT.subtitle,
    fontSize: 20,
    color: COLORS.black,
  },

  resultText: {
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },

  primaryButton: {
    height: 52,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceSoft,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  primaryButtonDisabled: {
    opacity: 0.45,
  },

  primaryButtonText: {
    fontFamily: FONT.subtitle,
    fontSize: 15,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});