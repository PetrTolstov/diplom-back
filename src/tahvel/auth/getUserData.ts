import request from "request";

export async function getUserData(cookieJar: any) {
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

            resolve(body);
        });
    });
}
