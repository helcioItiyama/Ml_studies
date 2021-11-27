import React from 'react';
import {ActivityIndicator, Modal, StyleSheet} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';

import theme from '../../global/styles/theme';
import {Header} from '../Header/Header';

import {Section, Main, Result, Button, ButtonText} from './resultModal';
import {MainStack} from '../../routes/Route';

interface IResultsModal {
  openModal: boolean;
  closeModal: () => void;
  title: string;
  results: string;
  loading: boolean;
}

export const ResultsModal: React.FC<IResultsModal> = ({
  openModal,
  closeModal,
  title,
  results,
  loading,
}) => {
  const {navigate} = useNavigation<MainStack>();

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator color={theme.colors.primaryLight} size="large" />
      );
    }
    return <Result>{results}</Result>;
  };

  const handleDirectToHome = () => {
    navigate('Home');
  };

  return (
    <Modal
      visible={openModal}
      animationType="slide"
      onDismiss={closeModal}
      presentationStyle="fullScreen">
      <Header {...{title}} />
      <Section>
        <Main>{renderContent()}</Main>
        <DropShadow style={styles.shadow}>
          <Button onPress={handleDirectToHome}>
            <ButtonText>OK</ButtonText>
          </Button>
        </DropShadow>
      </Section>
    </Modal>
  );
};

const styles = StyleSheet.create({
  shadow: {
    width: '80%',
    alignSelf: 'center',
    shadowColor: theme.colors.secondary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
