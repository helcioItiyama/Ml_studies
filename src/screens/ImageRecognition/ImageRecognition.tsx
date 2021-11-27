import React, {useEffect, useRef, useState} from 'react';
import {Camera} from 'expo-camera';
import {Alert, Dimensions} from 'react-native';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Entypo';

import theme from '../../global/styles/theme';
import {Header} from '../../components/Header/Header';

import {
  Container,
  CameraBorder,
  FooterWrap,
  Footer,
  CameraButton,
} from './imageRecognition';
import {handleError} from '../../util/handleError';
import {ResultsModal} from '../../components/ResultsModal/ResultsModal';

const {width} = Dimensions.get('window');

export const ImageRecognition: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImageRecognitionModal, setIsImageRecognitionModal] = useState(false);
  const [results, setResults] = useState('');
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const storeImage = async (image: string) => {
    const reference = storage().ref(image.slice(image.lastIndexOf('/') + 1));
    return await reference?.putFile(image);
  };

  const recognizeLabel = async (pathToImage: string) => {
    return await functions().httpsCallable('labelDetection')(pathToImage);
  };

  const handleTakePicture = async () => {
    try {
      setLoading(true);
      setIsImageRecognitionModal(true);
      let photo = await cameraRef?.current?.takePictureAsync({quality: 0.5});
      if (photo?.uri) {
        const {metadata} = await storeImage(photo.uri);
        const {data} = await recognizeLabel(
          `gs://${metadata.bucket}/${metadata.fullPath}`,
        );
        console.log('label detected', data);
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
          openModal={isImageRecognitionModal}
          closeModal={() => setIsImageRecognitionModal(false)}
          title="Image Recognized: "
          {...{results, loading}}
        />
      </>
    );
  };

  return (
    <Container>
      <Header title="IMAGE RECOGNITION" goBackButton />
      {renderCamera()}
      <FooterWrap>
        <Footer>
          <CameraButton onPress={handleTakePicture}>
            <Icon
              name="camera"
              size={width * 0.14}
              color={theme.colors.secondaryMedium}
            />
          </CameraButton>
        </Footer>
      </FooterWrap>
      {renderModals()}
    </Container>
  );
};
