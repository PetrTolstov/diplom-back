// Import required modules and models
import { User } from "../../models/User";
import { getCookieJar } from "./getCookieJar";
import { getJournalAbsences } from "./getJournalAbsences";
import { getJournalLastResult } from "./getJournalLastResult";
import { getTasks } from "./getTasks";
import { getUserData } from "./getUserData";
import request from "request";
import { FullPersonInfo } from "../../models/FullPersonInfo";
import { getFullPersonInfo } from "./getFullPeronInfo";

// Function to fetch information from Tahvel using the provided token
export async function getInfoFromTahvel(token: string) {
    try {
        // Get the cookie jar for making authenticated requests
        const jar: any = await getCookieJar(token);

        // Fetch user data
        const user: User = await getUserData(jar);

        // Fetch journal last results (marks)
        const marks = await getJournalLastResult(jar, user.student);

        // Fetch journal absences
        const absences = await getJournalAbsences(jar, user.student);

        // Fetch tasks
        const tasks = await getTasks(jar, user.student);

        // Fetch full person information
        const fullPersonInfo = await getFullPersonInfo(jar, user.student);

        // Return the fetched data
        return {
            marks: marks,
            absences: absences,
            tasks: tasks,
            fullPersonInfo: fullPersonInfo,
        };
    } catch (e) {
        // Return any error that occurred during the fetching process
        return e;
    }
}
