import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';

import {Container, GoBackButton, Title} from './header';
import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../global/styles/theme';

interface IHeader {
  title: string;
  goBackButton?: boolean;
}

const {width} = Dimensions.get('window');

export const Header: React.FC<IHeader> = ({title, goBackButton}) => {
  const {goBack} = useNavigation();
  return (
    <DropShadow style={styles.shadow}>
      <Container>
        {goBackButton && (
          <GoBackButton onPress={goBack}>
            <Ionicons
              name="chevron-back"
              size={width * 0.05}
              color={theme.colors.secondary}
            />
          </GoBackButton>
        )}
        <Title>{title}</Title>
      </Container>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.secondary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
