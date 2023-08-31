

let initialState = {
  chaps: {},
};

const chapReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_CHAP':
      let tmp: any = {...state.chaps};
      tmp[action.book_id] = action.data;
      return Object.assign({}, state, {
        chaps: tmp,
      });
    default:
      return state;
  }
};

export default chapReducer;
