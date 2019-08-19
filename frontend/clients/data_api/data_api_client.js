import http from 'src/frontend/services/http';
// import jwt from 'jsonwebtoken';
// import convertCamelToSnake from 'src/frontend/services/camel_to_snake_converter';

const dataApiClient = {
  baseUrl: function() {
    return 'process.env.dataApiBaseUrl';
  },
  getHeaders: function() {
    return {
      "AUTHORIZATION": "Bearer " + localStorage.getItem('jwt-token'),
    };
  },
  get: function(url) {
    return http.get(url, this.getHeaders());
  },
  post: function(url, data) {
    // const convertedData = convertCamelToSnake(data);
    return http.post(url, data, this.getHeaders());
  },
  patch: function(url, data) {
    // const convertedData = convertCamelToSnake(data);
    return http.patch(url, data, this.getHeaders());
  },
  put: function(url, data) {
    // const convertedData = convertCamelToSnake(data);
    return http.put(url, data, this.getHeaders());
  },
  delete: function(url, data) {
    // const convertedData = convertCamelToSnake(data);
    return http.delete(url, data, this.getHeaders());
  },
};

export default dataApiClient;
