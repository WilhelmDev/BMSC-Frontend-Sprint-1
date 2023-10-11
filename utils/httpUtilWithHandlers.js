import axios from "axios";

axios.defaults.baseURL = process.env.SERVICES_BASE_URL;
axios.defaults.browserBaseURL = process.env.SERVICES_BASE_URL;

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error.response);
  }
);

const executeRequestWithHandler = async ({ url, method, data, headers, params }, parsedResponse = true, context) => {
  if(context && context.$config && context.$config.servicesBaseUrl) {
    //console.log('Updating baseURL from ',axios.defaults.baseURL,'to',context.$config.servicesBaseUrl);
    axios.defaults.baseURL = context.$config.servicesBaseUrl;
    axios.defaults.browserBaseURL = context.$config.servicesBaseUrl;
  }
  try {
    let request = await axios({
      method: method || "GET",
      url,
      data,
      headers,
      params
    });
    console.log('Request data: ',request.data);
    if (parsedResponse) {
      return request.data || request || {};
    } else {
      return request;
    }
  } catch (err) {
    return null;
  }
};

export default executeRequestWithHandler;
