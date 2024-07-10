var md5 = require('md5');

// 取得 Timestamp::get
export async function getTimeStamp() {
    try {
        const response = await fetch('http://192.168.0.33:8080/api/Time/GetCurrentTime?fid=raxcruz')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data.data)
        return data.data
    } catch (error) {
        console.error('error:getTimeStamp', error)
    }
}

//製作簽章 使用 MD5
export function makeSignature(fid: string, ts: string) {
    return md5(fid + ts).toUpperCase()
}

//報到::post
//參數:{fid,ts,s,data:[{serno,placeno,placename,ck_person,ck_id}]}
export async function register(fid: string, data: {}) {
    const ts = await getTimeStamp();
    const s = makeSignature(fid, ts)
    //🧲 測試用資料 ---> 以重複報到
    data = [
        {
            "placeused_serno": "30169",
            "place_serno": "7",
            "placeno": "C101",
            "placename": "101教室",
            "use_date": "2024-07-26",
            "ck_person": "王小明",
            "ck_id": "9999"
        }
    ]
    const req = { "fid": fid, "ts": ts, "s": s, "data": data }
    console.log(JSON.stringify(req))
    try {
        const response: any = await fetch('http://192.168.0.33:8080/api/Lease/CheckIn', {
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
        console.log(data)
        return data.data
    } catch (error) {
        console.error('error:rigister', error)
    }
}

