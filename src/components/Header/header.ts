import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  height: ${height * 0.12}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.secondaryMedium};
  font-family: ${({theme}) => theme.fontFamily.bold};
  font-size: ${width * 0.05}px;
`;

export const GoBackButton = styled.TouchableOpacity`
  position: absolute;
  left: ${width * 0.1}px;
`;
