<template>
  <scroll ref="suggest"
          class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text">{{getDisplayName(item)}}</p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import NoResult from '../../base/no-result/no-result'
  import { mapMutations, mapActions } from 'vuex'
  import { commonParams } from '../../api/config'
  import {createSong} from '../../common/js/song'
  import Singer from '../../common/js/singer'

  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        page: 1,
        pullup: true,
        beforeScroll: true,
        hasMore: true,
        result: []
      }
    },
    methods: {
      refresh () {
        this.$refs.suggest.refresh()
      },
      async search () {
        this.page = 1;
        this.hasMore = true;
        this.result = [];
        this.$refs.suggest.scrollTo(0, 0);

        const url = '/api/search';
        const data = Object.assign({}, commonParams, {
            w: this.query,
            p: this.page,
            perpage,
            n: perpage,
            catZhida: this.zhida ? 1 : 0,
            zhidaqu: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            sem: 1,
            aggr: 0,
            remoteplace: 'txt.mqq.all',
            uin: 0,
            needNewCode: 1,
            platform: 'h5',
            format: 'json'
        });
         
        const searchData = await new Promise((resolve, reject) => {
          this.$http.get(url, {
            params: data
          }).then((res) => {
            resolve(res.data.search)
          })
        })
        if (searchData.code === 0) {
          let searchList = this._genResult(searchData.data);
          searchList.forEach(item => {
            if (item.songid && item.albummid) {
              this.result.push(createSong(item))
            }
          })
          this._checkMore(searchData.data)
        }
      },
      async searchMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        
        const url = '/api/search';
        const data = Object.assign({}, commonParams, {
            w: this.query,
            p: this.page,
            perpage,
            n: perpage,
            catZhida: this.zhida ? 1 : 0,
            zhidaqu: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            sem: 1,
            aggr: 0,
            remoteplace: 'txt.mqq.all',
            uin: 0,
            needNewCode: 1,
            platform: 'h5',
            format: 'json'
        })
        const searchData = await new Promise((resolve, reject) => {
          this.$http.get(url, {
            params: data
          }).then((res) => {
            resolve(res.data.search)
          })
        });
        if (searchData.code === 0) {
          let searchList = this._genResult(searchData.data);
          searchList.forEach(item => {
            if (item.songid && item.albummid) {
              this.result.push(createSong(item))
            }
          })
          this._checkMore(searchData.data)
        }
      },
      listScroll () {
        this.$emit('listScroll')
      },
      selectItem (item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }

        this.$emit('select')
      },
      getDisplayName (item) {

        if (item.type === TYPE_SINGER) {
          return item.singer
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      getIconCls (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      _genResult (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid ) {
          ret.push({ ...data.zhida,  type: TYPE_SINGER })
        }
        if(data.song){
          ret = ret.concat(data.song.list);
        }
        return ret
      },
      _checkMore (data) {
        const song = data.song
        if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      ...mapMutations([
        'setSinger'
      ]),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query (newQuery) {
        console.log(newQuery)
        if (!newQuery) {
          return
        }

        this.search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable"
  @import "common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
