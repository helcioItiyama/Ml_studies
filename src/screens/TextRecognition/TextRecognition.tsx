import React, {useEffect, useRef, useState} from 'react';
import {Camera} from 'expo-camera';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/Entypo';

import theme from '../../global/styles/theme';
import {Header} from '../../components/Header/Header';

import {Container, CameraBorder, Footer, CameraButton} from './textRecognition';
import {handleError} from '../../util/handleError';
import {ResultsModal} from '../../components/ResultsModal/ResultsModal';

const {width} = Dimensions.get('window');

export const TextRecognition: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTextRecognitionModal, setIsTextRecognitionModal] = useState(false);
  const [results, setResults] = useState('');
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const storeImage = async (image: string) => {
    const reference = storage().ref(image.slice(image.lastIndexOf('/') + 1));
    return await reference?.putFile(image);
  };

  const recognizeText = async (pathToImage: string) => {
    return await functions().httpsCallable('textDetection')(pathToImage);
  };

  const handleTakePicture = async () => {
    try {
      setLoading(true);
      setIsTextRecognitionModal(true);
      let photo = await cameraRef?.current?.takePictureAsync({quality: 0.5});
      if (photo?.uri) {
        const {metadata} = await storeImage(photo.uri);
        const {data} = await recognizeText(
          `gs://${metadata.bucket}/${metadata.fullPath}`,
        );
        setResults(data[0].description);
      }
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getCameraPermission = async () => {
    const {status} = await Camera.getCameraPermissionsAsync();
    if (status === 'granted') {
      setHasPermission(true);
      return;
    }
    const {granted} = await Camera.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert(
        'Warning',
        "You need to allow us to access your devices'camera to be able to use this feature.",
      );
    }
    setHasPermission(granted);
  };

  const renderCamera = () => {
    if (hasPermission) {
      return (
        <CameraBorder>
          <Camera ref={cameraRef} style={{flex: 1}} />
        </CameraBorder>
      );
    }
  };

  const renderModals = () => {
    return (
      <>
        <ResultsModal
          openModal={isTextRecognitionModal}
          closeModal={() => setIsTextRecognitionModal(false)}
          title="Text Recognized: "
          {...{results, loading}}
        />
      </>
    );
  };

  return (
    <Container>
      <Header title="TEXT RECOGNITION" goBackButton />
      {renderCamera()}
      <DropShadow style={[styles.shadow, styles.footerShadow]}>
        <Footer>
          <DropShadow style={styles.shadow}>
            <CameraButton onPress={handleTakePicture}>
              <Icon
                name="camera"
                size={width * 0.14}
                color={theme.colors.secondaryMedium}
              />
            </CameraButton>
          </DropShadow>
        </Footer>
      </DropShadow>
      {renderModals()}
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: theme.colors.secondary,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  footerShadow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});
