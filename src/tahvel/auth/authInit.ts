import {getCookieJar} from "./getCookieJar";
import {getUserData} from "./getUserData";

const token = "eyJfcmFpbHMiOnsibWVzc2FnZSI6IlcxczNOVEV5TTEwc0lqWm9MWE0zWDJ0YWExbE1lWFpRWTFoZlNtSlZJaXdpTVRZNE16SXpOVE01T1M0MU5UZzRNVGs0SWwwPSIsImV4cCI6IjIwMjMtMTEtMDRUMjI6MjM6MTkuNTU4WiIsInB1ciI6ImNvb2tpZS5yZW1lbWJlcl91c2VyX3Rva2VuIn19--a781e2ed5119790c70deeadfe5ee3f7e461f7dde"

export async function init() {
    const jar : any = await getCookieJar(token)
   
    console.log(await getUserData(jar))
}
