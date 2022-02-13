const prod = false;
const name = "localhost";
const port = 8080;
export const getUrl = () => {
  (prod) ? `https://kreziloto.herokuapp.com/api/` : 'http://' + name + ':' + port + '/api/';
};
export const environnement = { 
  backend: getUrl()
};