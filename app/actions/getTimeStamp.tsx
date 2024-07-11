

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