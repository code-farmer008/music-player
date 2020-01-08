<template>
  <div class='tab'>
    <router-link tag='div' to='/recommend' class='tab-item'>
      <span class='tab-link'>推荐</span>
    </router-link>
    <router-link tag='div' to='/singer' class='tab-item'>
      <span class='tab-link'>歌手</span>
    </router-link>
    <router-link tag='div' to='/rank' class='tab-item'>
      <span class='tab-link'>排行</span>
    </router-link>
    <router-link tag='div' to='/search' class='tab-item'>
      <span class='tab-link'>搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang='stylus'>
  @import 'common/stylus/variable.styl'
  .tab
    display:flex
    height :44px
    .tab-item
      flex:1
      font-size:$font-size-medium
      text-align :center
      .tab-link
        line-height:44px
        padding-bottom: 5px
        color :$color-text-l
      &.router-link-active
        .tab-link
          border-bottom: 2px solid $color-theme
          color:$color-theme
        

</style>
