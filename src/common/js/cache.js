

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, maxLen) {
  let index = -10;
  if(!val.id){
    index = arr.findIndex(v => v === val);
  }else{
    index = arr.findIndex(v => v.id === val.id);
  }
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, query) {
  const index = arr.findIndex(v => v === query);
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = JSON.parse(localStorage.getItem(SEARCH_KEY)) || [];
  
  insertArray(searches, query, SEARCH_MAX_LEN)
  localStorage.setItem(SEARCH_KEY, JSON.stringify(searches))
  return searches
}

export function deleteSearch(query) {
  let searches = JSON.parse(localStorage.getItem(SEARCH_KEY)) || [];
  deleteFromArray(searches, query);
  localStorage.setItem(SEARCH_KEY, JSON.stringify(searches))
  return searches
}

export function clearSearch() {
  localStorage.removeItem(SEARCH_KEY)
  return []
}


export function loadSearch() {
  return JSON.parse(localStorage.getItem(SEARCH_KEY)) || [];
}

export function savePlay(song) {
  let songs = JSON.parse(localStorage.getItem(PLAY_KEY)) || [];
  insertArray(songs, song, PLAY_MAX_LEN)
  localStorage.setItem(PLAY_KEY, JSON.stringify(songs))
  return songs
}

export function loadPlay() {
  return JSON.parse(localStorage.getItem(PLAY_KEY)) || [];
}

export function saveFavorite(song) {
  let songs = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
  insertArray(songs, song, FAVORITE_MAX_LEN)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(songs))
  return songs
}

export function deleteFavorite(song) {
  let songs = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
  deleteFromArray(songs, song)
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(songs))
  return songs
}

export function loadFavorite() {
  return JSON.parse(localStorage.getItem(FAVORITE_KEY)) || []
}

