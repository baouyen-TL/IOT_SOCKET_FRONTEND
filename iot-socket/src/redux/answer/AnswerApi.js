import axios from 'axios'
export const SaveAnswerApi = async(request) => {
    const PK = process.env.REACT_APP_API;
    try{
        const res = await axios.post(`${PK}/SaveAnswer/create`, request);
        return res
    }catch(err){
        
    }
    return null;
}