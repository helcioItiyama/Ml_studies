import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {Header} from '../../components/Header/Header';
import {Section} from '../../components/Section/Section';
import {handleError} from '../../util/handleError';
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
      handleError(err);
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
