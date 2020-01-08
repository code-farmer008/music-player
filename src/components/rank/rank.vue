<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="(item,index) in topList" :key="index">
          <div class="icon">
            <img width="100" height="100" :src="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <transition name='slide'>
      <router-view></router-view>
      <!-- 子路由入口被transition注册时定义class特殊 -->
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import { playlistMixin } from '../../common/js/mixin'
  import jsonp from '../../common/js/jsonp'
  import {commonParams, options} from '../../api/config'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [playlistMixin],
    created () {
      this._getTopList()
    },
    data () {
      return {
        topList: []
      }
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      selectItem (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      async _getTopList () {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
        const data = Object.assign({}, commonParams, {
          uin: 0,
          needNewCode: 1,
          platform: 'h5'
        })
        const toplistData = await jsonp(url, data, options);
        this.topList = toplistData.data.topList;
      },
      ...mapMutations([
        'setTopList'
      ])
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import "common/stylus/variable"
  @import "common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
    .slide-enter-active, .slide-leave-active
      transition: all 0.3s ease
    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
