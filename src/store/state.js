import {playMode} from '../common/js/config'
import {loadSearch, loadFavorite} from '../common/js/cache'

const state = {
  token: localStorage.getItem('token') || '',
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  singer:{},
  topList: {},
  searchHistory: [],
  playHistory: [],
  favoriteList: []
}

export default state