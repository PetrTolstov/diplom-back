// Import required modules
import request from "request";
import { User } from "../../models/User";
import { Mark } from "../../models/Mark";

// Function to fetch the last results from the journal for a student
export async function getJournalLastResult(
    cookieJar: any,
    studentId: number
): Promise<Mark[]> {
    // Set the URL for the last results request
    const url = `https://tahvel.edu.ee/hois_back/journals/studentJournalLastResults?studentId=${studentId}`;

    // Set the request options
    const options = {
        url,
        jar: cookieJar,
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    };

    // Return a promise that resolves with the last results
    return new Promise((resolve, reject) => {
        // Make the last results request
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

            // Resolve the promise with the parsed last results
            resolve(JSON.parse(body));
        });
    });
}
