const { default: axios } = require("axios");

const Api_Key = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

console.log("API Key:", Api_Key);

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        'Authorization' : `Bearer ${Api_Key}`
    }
});

const getcategory = () => axiosClient.get('/categories?populate=*');
const getDoctorlist = () => axiosClient.get('/doctors?populate=*');
const getdoctorsbycategory = (category) => axiosClient.get('/doctors?filters[categories] [Name] [$in]='+category+'&populate=*');
const getdoctorbyid = (id) => axiosClient.get('/doctors/'+id+'?populate=*');
const Bookappointment = (data) => axiosClient.post('/appointments', data);   
const sendEmail = (data) => axios.post('/api/sendEmail', data) 
const getuserbookinglist = (UserEmail) => axiosClient.get(`/appointments?[filters][Email][$eq]=${UserEmail}&populate[doctor][populate][image][fields][0]=url&populate=*`);
const deletebooking = (id) => axiosClient.delete('/appointments/'+id);

export default {
    getcategory,
    getDoctorlist,
    getdoctorsbycategory,
    getdoctorbyid,
    Bookappointment,
    sendEmail,
    getuserbookinglist,
    deletebooking
};
