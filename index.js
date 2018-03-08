import { get_nonce } from './nonce';
import { get_auth_token } from './auth_token';
import request from 'request';
import { config } from './config';

let nonce = get_nonce();
let auth_token = get_auth_token(nonce, config.secret);

console.log(nonce);
console.log(auth_token);

//request({
//        headers: {
//          'NONCE': nonce,
//          'SIGNATURE': auth_token
//        },
//        uri: https://account.codingblocks.com/users/7289,
//        method: 'GET'
//      }, (error, res, body) => {
//        console.log(done);
//      }
//);
