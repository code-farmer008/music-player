<template>
  <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-list/music-list'
  import {mapState} from 'vuex'
  import {createSong} from '../../common/js/song'
  import {commonParams} from '../../api/config'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapState({
        disc: state => state.disc
      })
    },
    data() {
      return {
        songs: []
      }
    },
    mounted() {
      this._getSongList()
    },
    methods: {
      
       _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        const url ='/api/getCdInfo';
        const data = Object.assign({}, commonParams, {
            disstid: this.disc.dissid,
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0,
        })
       
        this.$http.get(url, {
            params: data
        }).then((res) => {
          const jsonCallback = function (json) {
            return json;
          };
          const jsonObj = eval(res.data.data);
          this.songs = this._normalizeSongs(jsonObj.cdlist[0].songlist);
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach(musicData => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
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

<style scoped lang="stylus">
  

</style>
