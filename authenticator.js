import { redisClient } from './app';
import { config } from './config';
 
import crypto from 'crypto';
 
export function isServiceAuthenticated (req){
  let nonce;
  let timestamp;
  let received_auth_token;
  let auth_token;
 
  nonce = req.headers['nonce'];
  received_auth_token =  req.headers['signature'];
  
  return redisClient.getAsync(String(nonce)).then((reply)=>{
    if (reply==="1") {
      return{
        "error": "nonce is already present",
        "authenticated": false,
        "status": 403
      };
    } else {
      if(nonce.indexOf('|')===-1){
        return{
          "error": "nonce in wrong format",
          "authenticated": false,
          "status": 403
        };
      }
 
      if(nonce.split('|')[0]) {
        timestamp = nonce.split('|')[0];
      }
      else{
        return{
          "error": "nonce does not contain timestamp",
          "authenticated": false,
          "status": 403
        };
      }
 
      let expiration_seconds = 300;
      let tolerance_seconds = 60;
 
      let now = Math.floor(Date.now()/1000);
 
      if(timestamp >= now + tolerance_seconds){
        return{
          "error": "api auth_token timestamp is too far in the future",
          "authenticated": false,
          "status": 403
        };
      } else if (timestamp < now - expiration_seconds){
        return{
          "error": "api auth_token has expired.",
          "authenticated": false,
          "status": 403
        };
      }
 
      let hash = crypto.createHash('sha256');
      redisClient.set(String(nonce),"1");
      redisClient.expire(String(nonce), 300);
      auth_token = hash.update(String(nonce) + String(config.secret)).digest('hex');
      if(auth_token!==received_auth_token){
        return{
          "error": "auth_token is missing or not valid",
          "authenticated": false,
          "status": 403
        };
      } else if (auth_token===received_auth_token){
        return{
          "authenticated": true,
          "status": 200
        };
      }
    }
  });
}
