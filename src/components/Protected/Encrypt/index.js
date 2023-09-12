export function encrypt(text) {
  let encrypted = '';

  let key = process.env.REACT_APP_SECRET_PASS;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += charCode.toString(16).padStart(2, '0');
  }
  return encrypted;
}