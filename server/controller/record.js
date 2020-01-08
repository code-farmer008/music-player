
const Play = require('../model.js').getModel('playHistory');
const Favorite = require('../model.js').getModel('favoriteList');
const Search = require('../model.js').getModel('searchHistory');
//数据库的操作
const findplay = async (ctx) => {
  const username = ctx.state.data.user_id;
  const docs = await new Promise((resolve, reject) => {
    Play.find({username}, (err, doc) => {
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
  let playHistory = [];
  docs.forEach(v => {
    playHistory.push(v.song);
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      playHistory
    }
  }
}

const addplay = async (ctx) => {
  const {song, play} = ctx.request.body;
  const username = ctx.state.data.user_id;
  const idx = play.findIndex(v => v.id === song.id);
  let doc;
  if(idx > -1){
    ctx.status = 200;
    ctx.body = {
      code: 1,
      data: {
        playHistory:play
      }
    }
    return
  }else{
    doc = new Play({
      username,
      song
    })
  }
  await new Promise((resolve, reject) => {
    doc.save(err => {
      if(err){
        reject(err)
      }else{
        resolve()
      }
    })
  })
  const docs = await new Promise((resolve, reject) => {
    Play.find({username}, (e, d) => {
      if(e){
        reject(e)
      }else{
        resolve(d)
      }
    })
  })
  
  let playHistory = [];
  docs.forEach(v => {
    playHistory.push(v.song);
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      playHistory
    }
  }
}

const findfavorite = async (ctx) => {
  const username = ctx.state.data.user_id;
  const docs = await new Promise((resolve, reject) => {
    Favorite.find({username}, (err, doc) => {
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
  let favoriteList = [];
  docs.forEach(v => {
    favoriteList.push(v.song);
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      favoriteList
    }
  }
}

const addfavorite = async (ctx) => {
  const {song,favorite} = ctx.request.body;
  const username = ctx.state.data.user_id;
  const idx = favorite.findIndex(v => v.id === song.id);
  let doc;
  if(idx > -1){
    ctx.status = 200;
    ctx.body = {
      code: 1,
      data: {
        favoriteList: favorite
      }
    }
    return
  }else{
    doc = new Favorite({
      username,
      song,
      songId:song.id
    })
  }

  await new Promise((resolve, reject) => {
    doc.save(err => {
      if(err){
        reject(err)
      }else{
        resolve()
      }
    })
  })
  const docs = await new Promise((resolve, reject) => {
    Favorite.find({username}, (e, d) => {
      if(e){
        reject(e)
      }else{
        resolve(d)
      }
    })
  })
  let favoriteList = [];
  docs.forEach(v => {
    favoriteList.push(v.song);
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      favoriteList
    }
  }
}

const delfavorite = async (ctx) => {
  const {song,favorite} = ctx.request.body;
  const idx = favorite.findIndex(v => v.id === song.id);
  favorite.splice(idx,1);
  await new Promise((resolve, reject) => { // 同步数据库跟store中的favoriteList
    Favorite.findOneAndRemove({ songId:song.id }, err => {
      if (err) {
        reject(err)
      }
      console.log('成功删除歌曲');
      resolve();
    })
  })

  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      favoriteList: favorite
    }
  }
}

const addSearch = async (ctx) => {
  const {query,search} = ctx.request.body;
  const username = ctx.state.data.user_id;
  const idx = search.findIndex(v => v === query);
  let doc;
  if(idx > -1){
    ctx.status = 200;
    ctx.body = {
      code: 1,
      data: {
        searchHistory: search
      }
    }
    return
  }else{
    doc = new Search({
      username,
      songName:query
    })
    await new Promise((resolve, reject) => {
      doc.save(err => {
        if(err){
          reject(err)
        }else{
          resolve()
        }
      })
    })
    const docs = await new Promise((resolve, reject) => {
      Search.find({username}, (e, d) => {
        if(e){
          reject(e)
        }else{
          resolve(d)
        }
      })
    })
    let searchHistory = [];
    docs.forEach(v => {
      searchHistory.push(v.songName);
    })
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data: {
        searchHistory
      }
    }
  }
}

const findSearch = async (ctx) => {
  const username = ctx.state.data.user_id;
  const docs = await new Promise((resolve, reject) => {
    Search.find({username}, (err, doc) => {
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
  let searchHistory = [];
  docs.forEach(v => {
    searchHistory.push(v.songName);
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      searchHistory
    }
  }
}

const delSearch = async (ctx) => {
  const {query,search} = ctx.request.body;
  const idx = search.findIndex(v => v === query);
  search.splice(idx,1);
  await new Promise((resolve, reject) => { // 同步数据库跟store中的searchHistory
    Search.findOneAndRemove({ songName:query }, err => {
      if (err) {
        reject(err)
      }
      console.log('成功删除歌曲');
      resolve();
    })
  })

  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      searchHistory: search
    }
  }
}

const clearSearch = async (ctx) => {
  const username = ctx.state.data.user_id;
  await new Promise((resolve, reject) => { // 同步数据库跟store中的searchHistory
    Search.remove({ username }, err => {
      if (err) {
        reject(err)
      }
      console.log('成功删除搜索记录');
      resolve();
    })
  })
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: {
      searchHistory: []
    }
  }
}

module.exports = {
  addplay,
  findplay,
  findfavorite,
  addfavorite,
  delfavorite,
  addSearch,
  findSearch,
  delSearch,
  clearSearch
};