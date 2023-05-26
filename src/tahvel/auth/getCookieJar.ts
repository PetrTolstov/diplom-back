// Import required modules
import request from "request";
import { Cookie } from 'tough-cookie';
const { CookieJar } = require('tough-cookie');

// Function to get a cookie jar for making authenticated requests
export async function getCookieJar(token: string) {
  // Create a new cookie jar
  const cookieJar = request.jar();

  // Set the URL for the authentication request
  const url = 'https://tahvel.edu.ee/hois_back/haridLogin';

  // Set the request options
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

  // Return a promise that resolves with the cookie jar
  return new Promise((resolve, reject) => {
    // Make the authentication request
    request(options, (error: any, response: any, body: any) => {
      if (error) {
        // If an error occurs, reject the promise with the error
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        // If the response status code is not 200, reject the promise with an error
        reject(new Error(`Error loading page: ${response.statusCode}`));
        return;
      }

      // Resolve the promise with the cookie jar
      resolve(cookieJar);
    });
  });
}