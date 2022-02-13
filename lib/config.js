"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environnement = exports.getUrl = void 0;
const prod = false;
const name = "localhost";
const port = 8080;
exports.getUrl = () => {
    (prod) ? `https://kreziloto.herokuapp.com/api/` : 'http://' + name + ':' + port + '/api/';
};
exports.environnement = {
    backend: exports.getUrl()
};
