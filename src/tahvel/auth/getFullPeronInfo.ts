// Import required modules and models
import request from "request";
import { User } from "../../models/User";
import { Mark } from "../../models/Mark";
import { Absence } from "../../models/Absence";
import { Task } from "../../models/Task";
import { FullPersonInfo } from "../../models/FullPersonInfo";

// Function to fetch full person information for a student
export async function getFullPersonInfo(
    cookieJar: any,
    studentId: number
): Promise<FullPersonInfo> {
    // Set the URL for the full person information request
    const url = `https://tahvel.edu.ee/hois_back/students/${studentId}`;

    // Set the request options
    const options = {
        url,
        jar: cookieJar,
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    };

    // Return a promise that resolves with the full person information
    return new Promise((resolve, reject) => {
        // Make the full person information request
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

            // Resolve the promise with the parsed full person information
            resolve(JSON.parse(body));
        });
    });
}
