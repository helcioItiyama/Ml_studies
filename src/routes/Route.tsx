import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {Home} from '../screens/Home/Home';
import {TextRecognition} from '../screens/TextRecognition/TextRecognition';
import {ImageRecognition} from '../screens/ImageRecognition/ImageRecognition';

export type RootStackParamList = {
  Home: undefined;
  TextRecognition: undefined;
  ImageRecognition: undefined;
};

export type MainStack = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Route: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TextRecognition" component={TextRecognition} />
        <Stack.Screen name="ImageRecognition" component={ImageRecognition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
