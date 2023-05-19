import request from "request";
import { User } from "../../models/User";
import { Mark } from "../../models/Mark";
import { Absence } from "../../models/Absence";
import { Task } from "../../models/Task";

export async function getTasks(
    cookieJar: any,
    studentId: number
): Promise<Task[]> {
    const url = `https://tahvel.edu.ee/hois_back/journals/studentJournalTasks?studentId=${studentId}`; //&presentTasks=true

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

            resolve(JSON.parse(body).tasks);
        });
    });
}
