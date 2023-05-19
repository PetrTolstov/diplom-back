import { User } from "../../models/User";
import { getCookieJar } from "./getCookieJar";
import { getJournalAbsences } from "./getJournalAbsences";
import { getJournalLastResult } from "./getJournalLastResult";
import { getTasks } from "./getTasks";
import { getUserData } from "./getUserData";
import request from "request";
import { FullPersonInfo } from "../../models/FullPersonInfo";
import { getFullPersonInfo } from "./getFullPeronInfo";

export async function getInfoFromTahvel(token: string) {
    try {
        const jar: any = await getCookieJar(token);
        const user: User = await getUserData(jar);
        const marks = await getJournalLastResult(jar, user.student);
        const absences = await getJournalAbsences(jar, user.student);
        const tasks = await getTasks(jar, user.student);
        const fullPersonInfo = await getFullPersonInfo(jar, user.student);
        return {
            marks: marks,
            absences: absences,
            tasks: tasks,
            fullPersonInfo: fullPersonInfo,
        };
    } catch (e) {
        return e;
    }
}
