import axios from "axios";
import { Group } from "../../models/Group";

export async function getGroups(): Promise<Group[]> {
    const url = 'https://tahvel.edu.ee/hois_back/timetables/group/8';
    const response = await axios.get(url);
    const groups: Group[] = response.data.content;
    return groups;
  }

export async function getGroup(name : String): Promise<Group> {
    const url = `https://tahvel.edu.ee/hois_back/timetables/group/8?name=${name}`;
    const response = await axios.get(url);
    const groups: Group[] = response.data.content;
    return groups[0];
  }
