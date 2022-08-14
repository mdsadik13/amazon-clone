//axios helps us to fetch api

import axios from "axios";

const instance = axios.create(
      {
           baseURL: 'http://localhost:5001/clone-7b5ec/us-central1/api' //The API url{cloud function}url
      }
);

export default instance;