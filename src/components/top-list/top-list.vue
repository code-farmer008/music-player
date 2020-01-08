<template>
  <music-list :rank="rank" :title="title" :bg-image="bgImage"  :songs="songs"></music-list>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-list/music-list'
  import jsonp from '../../common/js/jsonp'
  import {commonParams, options} from '../../api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from '../../common/js/song'

  export default {
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      async _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
       
        const data = Object.assign({}, commonParams, {
            topid: this.topList.id,
            needNewCode: 1,
            uin: 0,
            tpl: 3,
            page: 'detail',
            type: 'top',
            platform: 'h5'
        })
        const musiclistData = await jsonp(url, data, options);
        this.songs = this._normalizeSongs(musiclistData.songlist)
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach(item => {
          if (item.data.songid && item.data.albummid) {
            ret.push(createSong(item.data))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
