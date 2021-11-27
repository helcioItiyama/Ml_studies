import React from 'react';
import {Dimensions} from 'react-native';
import {Entypo} from '@expo/vector-icons';

import theme from '../../global/styles/theme';

import {Container, Title} from './section';

const {width} = Dimensions.get('window');

interface ISection {
  type: string;
  onSectionPress: () => void;
}

export const Section: React.FC<ISection> = ({type, onSectionPress}) => {
  return (
    <Container onPress={onSectionPress}>
      <Entypo
        name="camera"
        size={width * 0.3}
        color={theme.colors.secondaryMedium}
      />
      <Title>{type}</Title>
    </Container>
  );
};
