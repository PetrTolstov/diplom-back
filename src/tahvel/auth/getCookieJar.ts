import request from "request";
import { Cookie } from 'tough-cookie';
const { CookieJar } = require('tough-cookie');

export async function getCookieJar(token: string) {
  const cookieJar = request.jar();
  const url = 'https://tahvel.edu.ee/hois_back/haridLogin';

  const options = {
    url,
    jar: cookieJar,
    withCredentials: true,
    followAllRedirects: true,
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Cookie': `remember_user_token=${token}`
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error: any, response:any, body : any) => {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Error loading page: ${response.statusCode}`));
        return;
      }
    
      resolve(cookieJar);
    });
  });
}
