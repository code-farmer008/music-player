<template>
  <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
</template>

<script>
  import MusicList from '../music-list/music-list'
  import {createSong} from '../../common/js/song'
  import {mapGetters} from 'vuex'
  import {commonParams, options} from '../../api/config'
  import jsonp from '../../common/js/jsonp'

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      async _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return
        }

        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        const data = Object.assign({}, commonParams, {
            hostUin: 0,
            needNewCode: 0,
            platform: 'yqq',
            order: 'listen',
            begin: 0,
            num: 80,
            songstatus: 1,
            singermid: this.singer.id
        })

        const jsonpData = await jsonp(url, data, options);
        this.songs = this._normalizeSongs(jsonpData.data.list);
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach(item => {
         if (item.musicData.songid && item.musicData.albummid) {
            ret.push(createSong(item.musicData))
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

