
'use server'

import { getTimeStamp } from "./getTimeStamp";
import { makeSignature } from "./make-md5";


//取得場地資訊::post
export async function getVenueInfo(fid: string, placeused_serno: string) {
    const ts = await getTimeStamp(fid);
    const s = makeSignature(fid, ts)
    //🧲 測試用資料 ---> 以重複報到
    const data = [
        {
            "use_date": "2024-07-25", //之後帶入今天日期
            "placeused_serno": placeused_serno
        }
    ]

    const req = { "fid": fid, "ts": ts, "s": s, "data": data }
    // console.log(JSON.stringify(req))
    try {
        const response: any = await fetch('http://192.168.0.33:8080/api/Lease/LeaseRead', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            cache: 'no-cache',
            body: JSON.stringify(req),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return JSON.parse(data.data)
    } catch (error) {
        console.error('error:rigister', error)
    }
}


//取得場地稽核資訊::post
export async function getVenueRentInfo(fid: string, data: {}) {
    const ts = await getTimeStamp(fid);
    const s = makeSignature(fid, ts)
    //🧲 測試用資料 ---> 以重複報到
    data = [
        {
            "use_date": "2024-07-26",
        }
    ]

    const req = { "fid": fid, "ts": ts, "s": s, "data": data }
    try {
        const response: any = await fetch('http://192.168.0.33:8080/api/Lease/VenueRentalStatus', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(req),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return JSON.parse(data.data)
    } catch (error) {
        console.error('error:getVenueRentInfo', error)
    }
}

//取得場地選單::post
export async function getVenueMenuRead(fid: string) {
    const ts = await getTimeStamp(fid);
    const s = makeSignature(fid, ts)
    //🧲 測試用資料 ---> 以重複報到
    const data = [
        {

        }
    ]

    const req = { "fid": fid, "ts": ts, "s": s, "data": data }
    console.log(req)
    try {
        const response: any = await fetch('http://192.168.0.33:8080/api/Lease/VenueMenuRead', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(req),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return JSON.parse(data.data)
    } catch (error) {
        console.error('error:getVenueRentInfo', error)
    }
}