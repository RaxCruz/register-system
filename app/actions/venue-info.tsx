
'use server'

import { getTimeStamp } from "./getTimeStamp";
import { makeSignature } from "./make-md5";


//報到::post
//參數:{fid,ts,s,data:[{serno,placeno,placename,ck_person,ck_id}]}
export async function getVenueInfo(fid: string, data: {}) {
    const ts = await getTimeStamp(fid);
    const s = makeSignature(fid, ts)
    //🧲 測試用資料 ---> 以重複報到
    data = [
        {
            "use_date": "2024-07-26",
            "placeused_serno": "30169"
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
            body: JSON.stringify(req),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data.data)
        return JSON.parse(data.data)
    } catch (error) {
        console.error('error:rigister', error)
    }
}

