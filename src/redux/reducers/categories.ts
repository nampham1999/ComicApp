

let initialState = {
  categories: [],
};

const categories = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return Object.assign({}, state, {
        categories: action.categories,
      });
    default:
      return state;
  }
};

export default categories;
