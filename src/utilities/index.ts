import Toast from 'react-native-simple-toast';

/**
 * show toast at the bottom
 * @param message
 */
export const showToast = (message: string) => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
};