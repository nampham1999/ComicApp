import {
  AdEventType,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';
import {Platform} from 'react-native';

const idBannerProd =
  Platform.OS == 'android'
    ? 'ca-app-pub-8006157040812433~7388432285'
    : 'ca-app-pub-5959703253397625/7672472937';
const IdReward =
  Platform.OS == 'android'
    ? 'ca-app-pub-8006157040812433~7388432285'
    : 'ca-app-pub-5959703253397625/6297194973';
const interstitialID =
  Platform.OS == 'android'
    ? 'ca-app-pub-8006157040812433~7388432285'
    : 'ca-app-pub-5959703253397625/9531033834';

const createAds = (callBack: any) => {
  const rewarded = RewardedAd.createForAdRequest(
    __DEV__ ? TestIds.REWARDED : IdReward,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    },
  );
  rewarded.onAdEvent((type: any, error: any, reward: any) => {
    if (type === RewardedAdEventType.LOADED) {
      rewarded.show();
      callBack();
    }
    if (type === RewardedAdEventType.EARNED_REWARD) {
      console.log('User earned reward of ', reward);
    }
  });

  rewarded.load();
};

const createFullAds = (callBack: any) => {
  const interstitial = InterstitialAd.createForAdRequest(
    __DEV__ ? TestIds.INTERSTITIAL : interstitialID,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    },
  );
  interstitial.onAdEvent((type: any, error: any, reward: any) => {
    if (type === AdEventType.LOADED) {
      interstitial.show();
      callBack();
    }
    if (type === RewardedAdEventType.EARNED_REWARD) {
      console.log('User earned reward of ', interstitial);
    }
  });

  interstitial.load();
};

const ads = {
  idBanner: __DEV__ ? TestIds.BANNER : idBannerProd,
  showVideo: (callBack: any) => {
    createAds(callBack);
  },
  showFullBanner: (callBack: any) => {
    createFullAds(callBack);
  },
};
export default ads;
