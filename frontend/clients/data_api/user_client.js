import dataApiClient from './data_api_client';

//
// USER CLIENT - communicates with user routes
//
const userClient = {
  baseUrl: function() {
    return dataApiClient.baseUrl() + 'users/';
  },
};

userClient.create = function(data) {
  const url = this.baseUrl();
  data = { user: data };
  return dataApiClient.post(url, data);
};

export default userClient;
