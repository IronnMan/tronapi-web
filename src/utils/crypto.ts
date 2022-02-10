import CryptoJS from 'crypto-js';

const aes_encrypt = (message: string, key: string): string => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

const aes_decrypt = (message: string, key: string): string => {
  var bytes = CryptoJS.AES.decrypt(message, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { aes_encrypt, aes_decrypt };
