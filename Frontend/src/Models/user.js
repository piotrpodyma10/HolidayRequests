import axios from 'axios'
import { BASE_URL } from '../Api/contant'

export const signIn = async (email, password) => {
    let result
    await axios.post(`${BASE_URL}/LogInUser`, {
        email,
        password
    }).then(user => {
        result = user.data
    }).catch(error => {
        console.log(error)
    })

    return await result 
}