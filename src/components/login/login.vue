<template>
  <div class="login">
    <cube-form
    :model="model"
    :schema="schema"
    @submit="submitHandler"
    ></cube-form>
    <div class='logout'>
      <span @click='register'>注册</span>
      <span @click='logout'>注销</span>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions} from 'vuex';

export default {
  data(){
    return {
      model:{
        username:'',
        password:'',
      },
      schema:{
        fields:[
          {
            type: 'input',
            modelKey: 'username',
            props: {
              placeholder:'请输入用户名'
            },
            rules: {
              required: true,
              regUsername:val => {
                const reg = /^[a-zA-Z][a-zA-Z\u4E00-\u9FA5]{3,7}$/;
                if(reg.test(val)){
                  return true;
                }else{
                  return false
                }
              }
            },
            messages: {
              required: '用户名不能为空',
              regUsername:'用户名格式不对'
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            props: {
              type:'password',
              placeholder:'请输入密码',
              eye: {
                open: true,
                reverse: false
              }
            },
            rules: {
              required: true,
              regPassword:val => {
                const reg = /^[a-zA-Z0-9_-]{4,16}$/;
                if(reg.test(val)){
                  return true;
                }else{
                  return false
                }
              }
            },
            messages: {
              required: '密码不能为空',
              regPassword:'密码格式不对'
            }
          },
          { // 登录按钮
              type: 'submit',
              label: '登录'
          }
        ]
      },
      options: {
        scrollToInvalidField: false,
        layout: 'standard' // classic fresh
      }
    }
  },
  methods:{
    ...mapMutations([
      'addToken',
      'removeToken'
    ]),
    ...mapActions([
      'getPlayHistory',
      'getFavoriteList',
      'getSearchHistory'
    ]),
    submitHandler(e){
      e.preventDefault();
      this.$http.post('/api/login', {
        username: this.model.username,
        password: this.model.password
      })
      .then(({ data }) => {
        //账号不存在
        if (data.code === 1) {
          const toast = this.$createToast({
            time: 1000,
            txt: '账号不存在'
          })
          toast.show()
          return;
        }
        if (data.code === 2) {
          const toast = this.$createToast({
            time: 1000,
            txt: '密码错误'
          })
          toast.show()
          return;
        }
        if (data.code === 0) {
         
          //拿到返回的token和username，并存到store
          let token = data.data.token;
          let username = data.data.username;
          this.addToken(token)
          //跳到目标页
          this.$router.push('/').catch(err => {err});
          this.getPlayHistory()
          this.getFavoriteList();
          this.getSearchHistory();
          const toast =  this.$createToast({
            time: 1000,
            txt: '登录成功'
          })
          toast.show()
        }
      });
    },
    logout(){
      this.removeToken()
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>
<style lang='stylus'>

  @import "common/stylus/variable"
  .login
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: white
    .logout
      font-size: 14px
      line-height :30px
      text-align :right
      color: #333
      padding-right:15px
      span:first-child
        display:inline-block
        margin-right:10px
</style>
