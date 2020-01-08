<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import MHeader from './components/m-header/m-header'
  import Player from './components/player/player'
  import Tab from './components/tab/tab'
  import {mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    created(){
      if(!this.token){
        this.$router.push('/login').catch(err => {err})
      }else{
        this.getPlayHistory();
        this.getFavoriteList();
        this.getSearchHistory();
      }
    },
    methods: {
      ...mapActions([
        'getPlayHistory',
        'getFavoriteList',
        'getSearchHistory'
      ])
    },
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style lang="stylus">
</style>