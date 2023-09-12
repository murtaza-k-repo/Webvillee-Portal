export const decrypt = (encryptedHex) => {
    let decrypted = '';

    let key = process.env.REACT_APP_SECRET_PASS;

    for (let i = 0; i < encryptedHex.length; i += 2) {
      const hexByte = encryptedHex.substr(i, 2);
      const charCode = parseInt(hexByte, 16) ^ key.charCodeAt(i / 2 % key.length);
      decrypted += String.fromCharCode(charCode);
    }
    return decrypted;
  }