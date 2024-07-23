

// 取得 Timestamp::get
export async function getTimeStamp(fid: string) {
    try {
        const response = await fetch(`http://192.168.0.33:8080/api/Time/GetCurrentTime?fid=${fid}`, { cache: "no-cache" })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error('error:getTimeStamp', error)
    }
}

//當下日期 使用 2024-07-17 格式

export function getNowDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份是從0開始的，所以需要加1，並確保是兩位數
    const day = String(today.getDate()).padStart(2, '0'); // 確保是兩位數

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}