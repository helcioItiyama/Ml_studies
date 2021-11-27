import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  colors: {
    primary: '#3a0ca3',
    primaryMedium: '#3f37c9',
    primarySemiMedium: '#4361ee',
    primaryLight: '#4895ef',
    primarySuperLight: '#4cc9f0',
    secondary: '#f72585',
    secondaryMedium: '#b5179e',
    secondarySemiMedium: '#7209b7',
    secondaryLight: '#560bad',
    secondarySuperLight: '#480ca8',
    textDark: '#000000',
    textWhite: '#FFFFFF',
  },
  fontFamily: {
    bold: 'Montserrat-Bold',
    semiBold: 'Montserrat-SemiBold',
    medium: 'Montserrat-Medium',
    regular: 'Montserrat-Regular',
  },
  layout: {
    horizontalSpacing: width * 0.04,
  },
};
