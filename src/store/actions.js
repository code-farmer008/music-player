import {shuffle} from '../common/js/util'
import {playMode} from '../common/js/config'
import axios from 'axios'
import * as types from './mutation-types'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
  
const actions = {
  selectPlay({commit, state}, {list, index}){
    commit(types.setSequenceList, list)  // 设置顺序列表
    if (state.mode === playMode.random) { //设置随机播放音乐列表
      let randomList = shuffle(list);
      commit(types.setPlayList, randomList);
      let idx = findIndex(randomList, list[index]);
      commit(types.setCurrentIndex, idx)
    } else {
      commit(types.setPlayList, list);
      commit(types.setCurrentIndex, index)
    }
    commit(types.setFullScreen, true)
    commit(types.setPlayingState, true)
  },
  randomPlay({commit}, {list}){
    commit(types.setPlayMode, playMode.random)
    commit(types.setSequenceList, list)
    let randomList = shuffle(list)
    commit(types.setPlayList, randomList)
    commit(types.setCurrentIndex, 0)
    commit(types.setFullScreen, true)
    commit(types.setPlayingState, true)
  },
  clearSearchHistory({commit}){
    axios.get('/api/clearSearch').then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setSearchHistory,res.data.data.searchHistory)
      }
    })
  },
  deleteSearchHistory({commit,state},query){
    const search = state.searchHistory;
    axios.post('/api/delSearch',{
      query,
      search
    }).then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setSearchHistory,res.data.data.searchHistory)
      }
    })
  },
  getSearchHistory({commit,state},query){
    axios.get('/api/findSearch').then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setSearchHistory,res.data.data.searchHistory)
      }
    })
  },
  saveSearchHistory({commit,state},query){
    const search = state.searchHistory;
    axios.post('/api/addSearch',{
      query,
      search
    }).then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setSearchHistory,res.data.data.searchHistory)
      }
    })
  },
  insertSong({commit, state}, song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      // 如果当前插入的序号大于列表中的序号
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      } else {
        sequenceList.splice(fsIndex + 1, 1)
      }
    }

    commit(types.setPlayList, playlist)
    commit(types.setSequenceList, sequenceList)
    commit(types.setCurrentIndex, currentIndex)
    commit(types.setFullScreen, true)
    commit(types.setPlayingState, true)
  },
  deleteSong({commit, state}, song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist, song)
    playlist.splice(pIndex, 1)
    let sIndex = findIndex(sequenceList, song)
    sequenceList.splice(sIndex, 1)
    if (currentIndex > pIndex || currentIndex === playlist.length) {
      currentIndex--
    }

    commit(types.setPlayList, playlist)
    commit(types.setSequenceList, sequenceList)
    commit(types.setCurrentIndex, currentIndex)

    if (!playlist.length) {
      commit(types.setPlayingState, false)
    } else {
      commit(types.setPlayingState, true)
    }
  },
  deleteSongList({commit}){
    commit(types.setCurrentIndex, -1)
    commit(types.setPlayList, [])
    commit(types.setSequenceList, [])
    commit(types.setPlayingState, false)
  },
  getPlayHistory({commit}){
    axios.get('/api/findplay').then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setPlayHistory,res.data.data.playHistory)
      }
    })
  },
  savePlayHistory({commit,state}, song){
    const play = state.playHistory;
    axios.post('/api/addplay', {
      song,
      play
    }).then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setPlayHistory, res.data.data.playHistory);
      }
    })
  },
  getFavoriteList({commit}){
    axios.get('/api/findfavorite').then(res => {
      if(res.status === 200 && res.data.code === 0){
        commit(types.setFavoriteList,res.data.data.favoriteList)
      }
    })
  },
  saveFavoriteList({commit,state}, song){
    const favorite = state.favoriteList;
    axios.post('/api/addfavorite',{
      song,
      favorite
    }).then(res => {
      if(res.status === 200 & res.data.code === 0){
        commit(types.setFavoriteList, res.data.data.favoriteList)
      }
    })
  },
  deleteFavoriteList({commit,state}, song){
    const favorite = state.favoriteList;
    axios.post('/api/delfavorite',{
      song,
      favorite
    }).then(res => {
      if(res.status === 200 & res.data.code === 0){
        commit(types.setFavoriteList, res.data.data.favoriteList)
      }
    })
  }
}

export default actions
