import request from "request";
import { User } from "../../models/User";
import { Mark } from "../../models/Mark";
import { Absence } from "../../models/Absence";
import { Task } from "../../models/Task";
import { FullPersonInfo } from "../../models/FullPersonInfo";

export async function getFullPersonInfo(
    cookieJar: any,
    studentId: number
): Promise<FullPersonInfo> {
    const url = `https://tahvel.edu.ee/hois_back/students/${studentId}`; //&presentTasks=true

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
