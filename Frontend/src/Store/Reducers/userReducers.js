export const signInReducer = (state = [], action) => {
    switch (action.type) {
        case 'SIGN_IN_USER':
            return {...state, user: action.payload}
        default:
            return state
    }
}