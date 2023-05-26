// Import required modules and models
import request from "request";
import { User } from "../../models/User";
import { Mark } from "../../models/Mark";
import { Absence } from "../../models/Absence";

// Function to fetch absences from the journal for a student
export async function getJournalAbsences(
    cookieJar: any,
    studentId: number
): Promise<Absence[]> {
    // Set the URL for the absences request
    const url = `https://tahvel.edu.ee/hois_back/journals/studentJournalAbsences?studentId=${studentId}`;

    // Set the request options
    const options = {
        url,
        jar: cookieJar,
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    };

    // Return a promise that resolves with the absences
    return new Promise((resolve, reject) => {
        // Make the absences request
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

            // Resolve the promise with the parsed absences
            resolve(JSON.parse(body));
        });
    });
}
