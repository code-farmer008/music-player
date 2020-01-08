import { commonParams } from './config'
import axios from 'axios'


export function getplaysongvkey (songmid) {
  const url = '/api/getplaysongvkey';
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"7347620869","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7347620869","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
  })
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then((res) => {
      if(res.status === 200 & res.data.code === 0){
        resolve(res.data.purl)
      }
    }).catch(err => {
      reject(err)
    })
  }) 
}


