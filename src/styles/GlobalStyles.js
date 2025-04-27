import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Margin Right static helpers
  mr0: { marginRight: 0 },
  mr1: { marginRight: 1 },
  mr2: { marginRight: 2 },
  mr3: { marginRight: 3 },
  mr4: { marginRight: 4 },
  mr5: { marginRight: 5 },
  mr6: { marginRight: 6 },
  mr7: { marginRight: 7 },
  mr8: { marginRight: 8 },
  mr9: { marginRight: 9 },
  mr10: { marginRight: 10 },
  mr11: { marginRight: 11 },
  mr12: { marginRight: 12 },
  mr13: { marginRight: 13 },
  mr14: { marginRight: 14 },
  mr15: { marginRight: 15 },
  mr16: { marginRight: 16 },
  mr17: { marginRight: 17 },
  mr18: { marginRight: 18 },
  mr19: { marginRight: 19 },
  mr20: { marginRight: 20 },

  // Margin Left static helpers
  ml0: { marginLeft: 0 },
  ml1: { marginLeft: 1 },
  ml2: { marginLeft: 2 },
  ml3: { marginLeft: 3 },
  ml4: { marginLeft: 4 },
  ml5: { marginLeft: 5 },
  ml6: { marginLeft: 6 },
  ml7: { marginLeft: 7 },
  ml8: { marginLeft: 8 },
  ml9: { marginLeft: 9 },
  ml10: { marginLeft: 10 },
  ml11: { marginLeft: 11 },
  ml12: { marginLeft: 12 },
  ml13: { marginLeft: 13 },
  ml14: { marginLeft: 14 },
  ml15: { marginLeft: 15 },
  ml16: { marginLeft: 16 },
  ml17: { marginLeft: 17 },
  ml18: { marginLeft: 18 },
  ml19: { marginLeft: 19 },
  ml20: { marginLeft: 20 },

  // Margin Top static helpers
  mt0: { marginTop: 0 },
  mt1: { marginTop: 1 },
  mt2: { marginTop: 2 },
  mt3: { marginTop: 3 },
  mt4: { marginTop: 4 },
  mt5: { marginTop: 5 },
  mt6: { marginTop: 6 },
  mt7: { marginTop: 7 },
  mt8: { marginTop: 8 },
  mt9: { marginTop: 9 },
  mt10: { marginTop: 10 },
  mt11: { marginTop: 11 },
  mt12: { marginTop: 12 },
  mt13: { marginTop: 13 },
  mt14: { marginTop: 14 },
  mt15: { marginTop: 15 },
  mt16: { marginTop: 16 },
  mt17: { marginTop: 17 },
  mt18: { marginTop: 18 },
  mt19: { marginTop: 19 },
  mt20: { marginTop: 20 },

  // Margin Bottom static helpers
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: 1 },
  mb2: { marginBottom: 2 },
  mb3: { marginBottom: 3 },
  mb4: { marginBottom: 4 },
  mb5: { marginBottom: 5 },
  mb6: { marginBottom: 6 },
  mb7: { marginBottom: 7 },
  mb8: { marginBottom: 8 },
  mb9: { marginBottom: 9 },
  mb10: { marginBottom: 10 },
  mb11: { marginBottom: 11 },
  mb12: { marginBottom: 12 },
  mb13: { marginBottom: 13 },
  mb14: { marginBottom: 14 },
  mb15: { marginBottom: 15 },
  mb16: { marginBottom: 16 },
  mb17: { marginBottom: 17 },
  mb18: { marginBottom: 18 },
  mb19: { marginBottom: 19 },
  mb20: { marginBottom: 20 },

  // Text Headings
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 6,
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 6,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  // Paragraph
  p: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 8,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  //color
  textColorGray: {
    color: COLORS.gray,
  },
  textColorGrayLight: {
    color: COLORS.grayLight,
  },
  textColorGrayBlack: {
    color: COLORS.black,
  },
  textColorGrayWhite: {
    color: COLORS.white,
  },
  textColorDanger: {
    color: COLORS.danger,
  },
  textColorDark: {
    color: COLORS.dark,
  },
  textColorPrimary: {
    color: COLORS.primary,
  },
  textColorWarning: {
    color: COLORS.warning,
  },
  //font-weight
  fwBold: {
    fontWeight: 'bold',
  },
  fwRegular: {
    fontWeight: 'normal',
  },
  //form
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginTop: 5,
  },
  //heading
  heading: {
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
