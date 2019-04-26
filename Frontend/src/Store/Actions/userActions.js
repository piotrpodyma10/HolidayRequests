import { signIn } from '../../Models/user'

export const signInUser = (email, password) => async dispatch => {
    const response = await signIn(email, password)

    dispatch({ 
        type: 'SIGN_IN_USER', 
        payload: response 
    })
}