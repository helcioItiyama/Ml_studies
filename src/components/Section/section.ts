import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Container = styled.TouchableOpacity`
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.secondary};
  border-radius: ${width * 0.06}px;
  width: ${width * 0.5}px;
  height: ${height * 0.3}px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${height * 0.1}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fontFamily.bold};
  font-size: ${width * 0.04}px;
  color: ${({theme}) => theme.colors.secondaryMedium};
`;
