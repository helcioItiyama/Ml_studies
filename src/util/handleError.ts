import {Alert} from 'react-native';

interface IError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function handleError(err: IError): void {
  Alert.alert(
    'Warning',
    err?.response?.data?.message ||
      err?.message ||
      'An error occurred while processing the image, please try again!',
  );
}
