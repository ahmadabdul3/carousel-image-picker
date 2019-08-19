import dataApiClient from './data_api_client';

//
// session CLIENT - communicates with session routes
//
const sessionClient = {
  baseUrl: function() {
    return dataApiClient.baseUrl() + 'sessions/';
  },
};

sessionClient.create = function(data) {
  const url = this.baseUrl();
  data = { session: data };
  return dataApiClient.post(url, data);
};

export default sessionClient;
