import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Header} from '../../components/Header/Header';
import {Section} from '../../components/Section/Section';
import {MainStack} from '../../routes/Route';

import {Container} from './home';

interface IHome {
  navigation: MainStack;
}

export const Home: React.FC<IHome> = ({navigation}) => {
  const [user, setUser] = useState('');

  const onAuthStateChanged = (logged: any) => {
    setUser(logged);
  };

  const getCredentials = async () => {
    try {
      await auth().signInAnonymously();
    } catch (err: any) {
      Alert.alert(
        'Aviso',
        'Não foi possível acessar suas mensagens. Reinicie o aplicativo e tente novamente',
      );
    }
  };

  useEffect(() => {
    if (!user) {
      getCredentials();
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  const navigateToTextRecognition = () => {
    navigation.navigate('TextRecognition');
  };

  const navigateToImageRecognition = () => {
    navigation.navigate('ImageRecognition');
  };

  return (
    <Container>
      <Header title="CHOOSE THE TECHNOLOGY TYPE" />
      <Section
        onSectionPress={navigateToTextRecognition}
        type="Text Recognition"
      />
      <Section
        onSectionPress={navigateToImageRecognition}
        type="Image Recognition"
      />
    </Container>
  );
};
