const { default: axios } = require("axios");
const { serverConstants } = require("./serverconstant");

const securedApi = axios.create({
  baseURL: serverConstants.authenticationServerURL,
});
const securedApiMain = axios.create({
  baseURL: serverConstants.apiServerConstant,
});

securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Version = 1;
  return config;
});
securedApiMain.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Version = 1;
  return config;
});

const publicApi = axios.create({
  baseURL: serverConstants.authenticationServerURL,
});

export default { securedApi, publicApi, securedApiMain };
