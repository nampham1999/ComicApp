
let initialState = {
    isConnect: false
};

const network = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_NETWORK':
            return Object.assign({}, state, {
                isConnect: action.data,
            });

        default:
            return state;
    }
};

export default network;
