import { StyleSheet,  Dimensions } from 'react-native';

import { COLORS, FONT } from '../constant/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

slide: {
  width,
  height,
  backgroundColor: COLORS.background,
  overflow: 'hidden',
},

backgroundImage: {
  position: 'absolute',
  top: 0,
  left: 0,

  width,
  height: height * 0.8,
},

  image: {
    width: '100%',
    height: '100%',
  },

  gradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 54,
    paddingBottom: 120,
    justifyContent: 'space-between',
  },

  switchContainer: {
    position: 'absolute',
    top: 42,
    left: 24,
    flexDirection: 'row',
    gap: 8,
    padding: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(5, 8, 22, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(248, 250, 252, 0.16)',
  },

  switchButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.08)',
  },

  switchButtonNatureActive: {
    backgroundColor: COLORS.auroraGreen,
  },

  switchButtonSpaceActive: {
    backgroundColor: COLORS.earthBlue,
  },

  topInfo: {
    alignItems: 'flex-end',
  },

  counter: {
    fontFamily: FONT.bodyBold,
    fontSize: 13,
    color: COLORS.moon,
    letterSpacing: 1,
  },

  textContent: {
    maxWidth: 330,
    alignSelf: 'center',
    marginBottom: 96,
  },

  categoryBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(5, 8, 22, 0.45)',
    marginBottom: 16,
  },

  title: {
    fontFamily: FONT.title,
    fontSize: 34,
    color: COLORS.star,
    letterSpacing: 1,
    marginBottom: 12,
  },

  subtitle: {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.moon,
    textAlign: 'justify',
  },

  dotsContainer: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(248, 250, 252, 0.34)',
  },

  activeDot: {
    width: 38,
  },
});