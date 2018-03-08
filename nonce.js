export let get_nonce = ()=> {
  let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  let text = String(Math.floor(Date.now()/1000))+'|';
  for(let i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
