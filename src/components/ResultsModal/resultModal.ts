import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Section = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.secondaryLight};
`;

export const Main = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${width * 0.04}px;
`;

export const Result = styled.Text`
  font-family: ${({theme}) => theme.fontFamily.semiBold};
  font-size: ${width * 0.1}px;
  color: ${({theme}) => theme.colors.primaryLight};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  width: 80%;
  align-items: center;
  justify-content: center;
  padding: ${width * 0.03}px;
  border-radius: ${width * 0.04}px;
  align-self: center;
  margin-bottom: ${height * 0.04}px;
`;

export const ButtonText = styled.Text`
  font-family: ${({theme}) => theme.fontFamily.semiBold};
  font-size: ${width * 0.05}px;
  color: ${({theme}) => theme.colors.secondaryMedium};
`;
