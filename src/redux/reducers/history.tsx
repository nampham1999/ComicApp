import moment from 'moment';

let initialState = {
  history: {},
  saved: {},
  dowload: {},
};

const history = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_SAVED':
      let tmp: any = {...state.saved};
      tmp[action.data.id] = {...action.data, time: moment().valueOf()};
      return Object.assign({}, state, {
        saved: tmp,
      });
    case 'ADD_HISTORY':
      let tmpH: any = {...state.history};
      tmpH[action.data.id] = {
        ...action.data,
        chap: action.chap,
        time: moment().valueOf(),
      };
      return Object.assign({}, state, {
        history: tmpH,
      });

    case 'ADD_DOWNLOAD':
      let tmpD: any = {...state.dowload};
      if (!tmpD[action.data.id]) {
        tmpD[action.data.id] = {
          ...action.data,
          chaps: '{}',
          time: moment().valueOf(),
        };
      } else {
        tmpD[action.data.id] = {
          ...action.data,
          chaps: tmpD[action.data.id].chaps,
          time: moment().valueOf(),
        };
      }
      let jsChap = JSON.parse(tmpD[action.data.id].chaps);
      jsChap[action.chap.id] = action.chap;
      tmpD[action.data.id].chaps = JSON.stringify(jsChap);
      return Object.assign({}, state, {
        dowload: tmpD,
      });

    case 'DELETE_DOWNLOAD':
      let dlTmp: any = {...state.dowload};
      let jsChapD = JSON.parse(dlTmp[action.data.id].chaps);
      delete jsChapD[action.chap.id];
      dlTmp[action.data.id].chaps = JSON.stringify(jsChapD);
      let strg = JSON.stringify(dlTmp);
      return Object.assign({}, state, {
        dowload: JSON.parse(strg),
      });

    case 'DELETE_DOWNLOAD_CHAP':
      let dlATmp: any = {...state.dowload};
      delete dlATmp[action.data.id];
      return Object.assign({}, state, {
        dowload: dlATmp,
      });

    default:
      return state;
  }
};

export default history;
