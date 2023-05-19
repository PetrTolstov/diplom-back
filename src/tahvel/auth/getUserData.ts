import request from "request";
import { User } from "../../models/User";

export async function getUserData(cookieJar: any) : Promise<User> {
    const url = "https://tahvel.edu.ee/hois_back/user";

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
            console.log(body)
            resolve(JSON.parse(body));
        });
    });
}
