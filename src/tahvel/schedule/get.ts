import axios from "axios";
import { ScheduleEvent } from "../../models/ScheduleEvent";

export async function fetchEvents(
    groupId: String,
    fromDate: String,
    toDate: String
): Promise<ScheduleEvent[]> {
    const url = `https://tahvel.edu.ee/hois_back/timetableevents/timetableByGroup/8?from=${fromDate}&studentGroups=${groupId}&thru=${toDate}`;
    const response = await axios.get(url);
    const groups: ScheduleEvent[] = response.data.timetableEvents;
    return groups;
}
