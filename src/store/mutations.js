import * as types from './mutation-types'

const mutations = {
  [types.setDisc](state,disc){
    state.disc = disc
  },
  [types.setSequenceList](state,list){
    state.sequenceList = list
  },
  [types.setPlayList](state,list){
    state.playlist = list
  },
  [types.setCurrentIndex](state,index){
    state.currentIndex = index
  },
  [types.setFullScreen](state,flag){
    state.fullScreen = flag
  },
  [types.setPlayingState](state,flag){
    state.playing = flag
  },
  [types.setPlayMode](state,mode){
    state.mode = mode
  },
  [types.setSinger](state,singer){
    state.singer = singer
  },
  [types.setTopList](state,topList){
    state.topList = topList
  },
  [types.setSearchHistory](state,history){
    state.searchHistory = history
  },
  [types.setPlayHistory](state,history){
    state.playHistory = history
  },
  [types.setFavoriteList](state,list){
    state.favoriteList = list
  },
  [types.addToken](state,token){
    localStorage.setItem('token',token);
    state.token = token
  },
  [types.removeToken](state){
    localStorage.removeItem('token');
    state.token = ''
  }
}

export default mutations