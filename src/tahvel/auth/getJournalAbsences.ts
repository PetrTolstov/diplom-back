import request from "request";
import { User } from "../../models/User";
import { Mark } from "../../models/Mark";
import { Absence } from "../../models/Absence";

export async function getJournalAbsences(
    cookieJar: any,
    studentId: number
): Promise<Absence[]> {
    const url = `https://tahvel.edu.ee/hois_back/journals/studentJournalAbsences?studentId=${studentId}`;

    const options = {
        url,
        jar: cookieJar,
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Error loading page: ${response.statusCode}`));
                return;
            }

            resolve(JSON.parse(body));
        });
    });
}
