import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables'



const { VITE_API_URl } = getEnvVariables()


const calendarApi = axios.create({

    baseURL: VITE_API_URl

});

// Todo: Configurar interceptores


export default calendarApi;