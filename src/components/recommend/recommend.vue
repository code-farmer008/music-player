<template>
  <div class="recommend" ref="recommend">
    <scroll  ref='scroll' class="recommend-content" :data='discList'>
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div :key='item.id' v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class='recommend-list'>
          <h2 class='list-title'>热门歌单推荐</h2>
          <ul>
            <li @click='selectItem(item)' class='item' :key='item.dissid' v-for='(item) in discList'>
              <div class='icon'>
                <img :src='item.imgurl' alt='' width='60' height="60" />
              </div>
              <div class='text'>
                <h3 class='name' v-html="item.creator.name"></h3>
                <p class='desc' v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='loading-container' v-show='!discList.length'>
        <load></load>
      </div>
    </scroll>
    <transition name="slide">
      <router-view ></router-view>
    </transition>
  </div>
</template>
<script>
  import Slider from '../../base/slider/slider.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  import Load from '../../base/loading/loading.vue'
  import {playlistMixin} from '../../common/js/mixin'
  import {commonParams} from '../../api/config'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],
    data(){
      return {
        recommends:[],
        discList: []
      }
    },
    created(){
      this.getRecommend();
      this.getDiscList();
    },
    methods:{
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        });
        this.setDisc(item)
      },
      loadImage(){
        if(!this.checkedLoad){
          this.checkedLoad = true;
          this.$refs.scroll.refresh();
        }
      },
      getRecommend(){
        this.$http.get('/api/getTopBanner').then((res) => {
           if(res.status == 200 && res.data.code == 0){
            this.recommends = res.data.list;
          }
        })
      },
      getDiscList(){
        const url = '/api/getDiscList';
        const data = Object.assign({}, commonParams, {
          platform: 'yqq',
          hostUin: 0,
          sin: 0,
          ein: 29,
          sortId: 5,
          needNewCode: 0,
          categoryId: 10000000,
          rnd: Math.random(),
          format: 'json'
        })
        this.$http.get(url,{
          params:data
        }).then(res => {
          if(res.status === 200 & res.data.code === 0){
            this.discList = res.data.discData.data.list;
          }
        }).catch(error => {
          console.log(error)
        })
      },
      ...mapMutations([
        'setDisc'
      ])
    },
    components:{
      Slider,
      Scroll,
      Load
    }
  }
</script>
<style scoped lang='stylus'>
  @import 'common/stylus/variable.styl'
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .slide-enter-active, .slide-leave-active
      transition: all 0.3s
    .slide-leave-to,.slide-enter
      transform: translate3d(100%,0,0)
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content:center
            line-height: 20px
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
