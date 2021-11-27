import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.secondarySuperLight};
`;

export const CameraBorder = styled.View`
  align-self: center;
  margin-top: ${height * 0.04}px;
  width: ${width * 0.9}px;
  height: ${height * 0.65}px;
  border-width: 3px;
  border-color: ${({theme}) => theme.colors.secondaryMedium};
  border-radius: ${width * 0.06}px;
  overflow: hidden;
`;

export const FooterWrap = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Footer = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  height: ${height * 0.1}px;
`;

export const CameraButton = styled.TouchableOpacity`
  align-self: center;
  background-color: ${({theme}) => theme.colors.primaryMedium};
  width: ${width * 0.24}px;
  height: ${width * 0.24}px;
  align-items: center;
  justify-content: center;
  top: -${height * 0.03}px;
  border-radius: ${width * 0.2}px;
`;
