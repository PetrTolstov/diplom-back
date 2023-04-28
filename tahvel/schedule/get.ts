import axios from "axios";
import { ScheduleEvent } from "../../models/ScheduleEvent";

export async function fetchEvents(groupId : String, fromDate : Date, toDate : Date): Promise<ScheduleEvent[]> {
    const url = `https://tahvel.edu.ee/hois_back/timetableevents/timetableByGroup/8?from=${fromDate.toISOString()}&studentGroups=${groupId}&thru=${toDate.toISOString()}`;
    const response = await axios.get(url);
    const groups: ScheduleEvent[] = response.data.content;
    return groups;
  }


