import {Dimensions, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const defautHeightScreen = 896;
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  defautHeightScreen,
  statusbarHeight:
    Platform.OS == 'ios'
      ? Number(getStatusBarHeight())
      : Number(StatusBar.currentHeight),
  isPad: Platform.isPad,
};
