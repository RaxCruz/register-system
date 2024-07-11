var md5 = require('md5');

//製作簽章 使用 MD5
export function makeSignature(fid: string, ts: string) {
    return md5(fid + ts).toUpperCase()
}