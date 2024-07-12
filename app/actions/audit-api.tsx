
'use server'

import { getTimeStamp } from "./getTimeStamp"
import { makeSignature } from "./make-md5";

const fid = 'raxcruz'
// 取得稽核紀錄::POST
// 參數預設為今天日期 2024-7-11
export async function getAuditRecord(date: string) {
    const ts = await getTimeStamp(fid);
    const s = makeSignature(fid, ts)
    const data = [
        {
            "use_date": "2024-07-26",
            "placeno": "C101"
        }
    ]
    const req = { "fid": fid, "ts": ts, "s": s, "data": data }
    try {
        const response: any = await fetch('http://192.168.0.33:8080/api/Lease/AuditRecordRead', {
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
        const res = JSON.parse(data.data)
        //console.log(res)
        return res
    } catch (error) {
        console.error('error:rigister', error)
    }
}

// 寫入稽核紀錄::POST
export async function uploadAuditRecord(date: string) {
    const ts = await getTimeStamp(fid);
    const s = makeSignature(fid, ts)
    const data = [
        {
            "placeused_serno": "30169",
            "place_serno": "7",
            "emp_eser": "1",
            "real_people": "48",
            "auditRemark": "",
            "use_date": "2024-07-26",
            "use_usection": "8"
        }
    ]


    const req = { "fid": fid, "ts": ts, "s": s, "data": data }
    console.log(req)
    try {
        const response: any = await fetch('http://192.168.0.33:8080/api/Lease/AuditRecordAdd', {
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
        // const res = JSON.parse(data.data)
        console.log(data)
        //return res
    } catch (error) {
        console.error('error:uploadAuditRecord', error)
    }
}
