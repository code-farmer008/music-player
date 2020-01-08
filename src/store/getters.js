const getters = {
  token: state => {
    return state.token
  },
  disc: state => {
    return state.disc
  },
  playing: state => {
    return state.playing
  },
  fullScreen: state => {
    return state.fullScreen
  },
  sequenceList: state => {
    return state.sequenceList
  },
  mode: state => {
    return state.mode
  },
  currentIndex: state => {
    return state.currentIndex
  },
  currentSong: state => {
    return state.playlist[state.currentIndex] || {}
  },
  playlist: state => {
    return state.playlist
  },
  singer : state => {
    return state.singer
  },
  topList: state => {
    return state.topList
  },
  searchHistory: state => {
    return state.searchHistory
  },
  playHistory: state => {
    return state.playHistory
  },
  favoriteList: state => {
    return state.favoriteList
  }
}

export default getters