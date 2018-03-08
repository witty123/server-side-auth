import crypto from 'crypto';
 
export let get_auth_token = (nonce, secret) => {
  const hash = crypto.createHash('sha256');
  let token = hash.update(String(nonce) + String(secret)).digest('hex');
  return (token);
};
