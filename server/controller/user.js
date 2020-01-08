
const axios = require('axios')
const User = require('../model.js').getModel('user');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../token/createToken.js');

//数据库的操作
//根据用户名查找用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
//登录
const Login = async(ctx) => {
  //拿到账号和密码
  let username = ctx.request.body.username;
  let password = sha1(ctx.request.body.password);

  let doc = await findUser(username);

  if (!doc) {
    console.log('检查到用户名不存在');
    ctx.status = 200;
    ctx.body = {
      code: 1
    }
  } else if (doc.password === password) {
    console.log('密码一致!');
    //生成一个新的token,并存到数据库
    let token = createToken(username);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data:{
        token,
        username
      }
    };
  } else {
    console.log('密码错误!');
    ctx.status = 200;
    ctx.body = {
      code: 2
    };
  }
};
//注册
const Reg = async (ctx) => {
  const {username, password} = ctx.request.body;
  let doc = await findUser(username);
  
  if (doc) {
    console.log('用户名已经存在');
    ctx.status = 200;
    ctx.body = {
      code: 1
    };
  } else {
    let user = new User({
      username,
      password:sha1(password) //加密
    });
    
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
    console.log('注册成功');
    ctx.status = 200;
    ctx.body = {
      code: 0
    }
  }
};

const getrecommend = async (ctx) => {
  
  ctx.status = 200;
  ctx.body = {
    code : 0,
    list: [{"id":24772,"linkUrl":"https://y.qq.com/n/yqq/album/000Sa8JS3SlYs4.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1917212.jpg"},{"id":24684,"linkUrl":"https://y.qq.com/n/yqq/album/https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1&_video=true&mid=001sWLyI25K8lv&g_f=yqqjiaodian.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1915121.jpg"},{"id":24753,"linkUrl":"https://y.qq.com/n/yqq/album/004Vutwe0exvjz.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1916706.jpg"},{"id":24768,"linkUrl":"https://y.qq.com/n/yqq/album/s0033cek53e.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1917167.jpg"},{"id":24715,"linkUrl":"https://y.qq.com/n/yqq/album/000TiWlh2lCdzS.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1914589.jpg"},{"id":24723,"linkUrl":"https://y.qq.com/n/yqq/album/001F9JFh3Ar7fu.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1917577.jpg"},{"id":24741,"linkUrl":"https://y.qq.com/n/yqq/album/003jTJEa1c3TO5.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1916007.jpg"},{"id":24740,"linkUrl":"https://y.qq.com/n/yqq/album/002O2EKa1zwd6q.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1916712.jpg"}]
  }

}
const getDiscList = async (ctx) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const discData = await new Promise((resolve, reject) => {
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: ctx.query
    }).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
  
  ctx.status = 200;
  ctx.body = {
    code : 0,
    discData
  }
}

const getCdInfo = async (ctx) => {
 
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

  const cdinfo = await new Promise((resolve, reject) => {
     axios.get(url,{
       headers:{
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
       }, params:ctx.query
     }).then((response) => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: cdinfo
  }
}

const getLyric = async (ctx) => {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  const lyric = await new Promise((resolve, reject) => {
    axios.get(url,{
      headers: {
        referer: 'https://c.y.qq.com/',
        host:'c.y.qq.com'
      },
      params:ctx.query
    }).then((response) => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
  
  ctx.status = 200;
  ctx.body = {
    code: 0,
    lyric
  }
}

const getSearchList = async (ctx) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  const search = await new Promise((resolve, reject) => {
    axios.get(url,{
      headers: {
        referer: 'https://c.y.qq.com/',
        host:'c.y.qq.com'
      },
      params:ctx.query
    }).then((response) => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
  
  ctx.status = 200;
  ctx.body = {
    code: 0,
    search
  }
}

const getPlayUrl = async (ctx) => {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const purl = await new Promise((resolve, reject) => {
    axios.get(url, {
      headers: {
        origin: 'https://y.qq.com',
        referer: 'https://y.qq.com/portal/player.html'
      },
      params: ctx.query
    }).then((response) => {
      if(response.data.req_0.data.midurlinfo[0].purl===''){
        resolve('')
      }else{
        resolve(response.data.req_0.data.midurlinfo[0].purl)
      }
      
    }).catch((e)=>{
      reject(e)
    })
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    purl
  }
}

module.exports = {
  Login,
  Reg,
  getrecommend,
  getDiscList,
  getCdInfo,
  getLyric,
  getSearchList,
  getPlayUrl
};
