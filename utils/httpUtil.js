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

const executeRequest = async ({ url, method, data, headers, params }, parsedResponse = true, context) => {
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
    if (parsedResponse) {
      return request.data || request || {};
    } else {
      return request;
    }
  } catch (err) {
    if(err) {
      const errorMessage = err.data || err.statusText;
      throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error.');
    }
  }
};

export default executeRequest;
