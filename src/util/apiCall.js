import axios from 'axios';

// const BASE_URL = 'http://localhost:8087';
const BASE_URL = 'http://3.38.51.154:8087';



const createAxiosConfig = (apiSpec, headers, parameters, file) => {

    const url = apiSpec.path.startsWith('http') ? apiSpec.path : BASE_URL + apiSpec.path;
    const axiosConfig = {
        method: apiSpec.method,
        url,
        headers,
    };

    if (file) {
        axiosConfig.data = createFomrData(parameters, file);
        return axiosConfig;
    }

    if (apiSpec.method.toUpperCase() === 'GET') {
        axiosConfig.params = parameters;
        return axiosConfig;
    } 

    // POST, PATCH, DELETE, etc..
    axiosConfig.data = parameters;
    return axiosConfig;
};

const createFomrData = (parameters, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jsonData', new Blob([JSON.stringify(parameters)], {
        type: "application/json"
    }));
    return formData;
}

const requestWithAxios = async (config) => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log('에러내용 => ', error);
        if (error.response) {
            const errorData = error.response.data;
            handleErrorByCode(errorData.code);
            return errorData;
        }
        alert('알 수 없는 에러가 발생하였습니다.');
        return error;
    }
};

const handleErrorByCode = (code) => {
    if (code === 500) {
        alert('알 수 없는 에러가 발생하였습니다.');            
    }
};

const apiCall = (apiSpec, parameters) => {    
    const headers = {'Content-Type': 'application/json'};
    const config = createAxiosConfig(apiSpec, headers, parameters);    
    
    return requestWithAxios(config);
};

const apiCallWithFileUpload = (apiSpec, parameters, file) => {        
    const headers = {'Content-Type': 'multipart/form-data'};
    const config = createAxiosConfig(apiSpec, headers, parameters, file);

    return requestWithAxios(config);
}

export {apiCall, apiCallWithFileUpload};
