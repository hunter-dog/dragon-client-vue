import axios from 'axios';

const generateHeaders = () => {
    const headers = {'Content-Type': 'application/json'};
    return headers;
};

const createAxiosConfig = (apiSpec, parameters, headers) => {
    const axiosConfig = {
        method: apiSpec.method,
        url: apiSpec.url,
        headers,
    };

    if (apiSpec.method.toUpperCase() === 'GET') {
        axiosConfig.params = parameters;
    } else {    // POST, PATCH, DELETE, etc..
        axiosConfig.data = parameters;
    }    

    return axiosConfig;
};

const requestWithAxios = async (config) => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log('에러내용 => ', error);
        const errorData = error.response.data;
        handleErrorByCode(errorData.code);
        return errorData;
    }
};

const handleErrorByCode = (code) => {
    /* 
        memo 240106: 커스텀한 에러핸들링이 필요한 경우 여기서 처리하지 않고 
        api info 속성으로 desc 밑에 뭐 'customErrorHandling: true' 이런 식으로 세팅한 다음에
        customErrorHandling 속성이 true인 api는 여기 공통단 소스인 handleErrorByCode 메소드가 호출되지 않게끔 처리 후
        api 콜한 컴포넌트에서 response 받은 거 가지고 처리할 수 있게끔 하면 괜찮을 듯
    */        
    if (code === 500) {
        alert('알 수 없는 에러가 발생하였습니다.');            
    }
};

const apiCall = (apiSpec, parameters) => {    
    const headers = generateHeaders();
    const config = createAxiosConfig(apiSpec, parameters, headers);    
    
    return requestWithAxios(config);
};

export default {};
export {apiCall};