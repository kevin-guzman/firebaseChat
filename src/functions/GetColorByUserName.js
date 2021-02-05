import UserColors from '../utils/UserColors'

export function GetColorByUserName(userName){
    const char = userName.trim()[0].toUpperCase()
    const indexChart = char.charCodeAt()-65
    return(UserColors[indexChart])
}