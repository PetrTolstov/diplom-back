// Import required modules
import request from "request";
import { User } from "../../models/User";

// Function to fetch user data from the specified cookie jar
export async function getUserData(cookieJar: any): Promise<User> {
    // Set the URL for the user data request
    const url = "https://tahvel.edu.ee/hois_back/user";

    // Set the request options
    const options = {
        url,
        jar: cookieJar,
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    };

    // Return a promise that resolves with the user data
    return new Promise((resolve, reject) => {
        // Make the user data request
        request(options, (error, response, body) => {
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

            // Resolve the promise with the parsed user data
            resolve(JSON.parse(body));
        });
    });
}
