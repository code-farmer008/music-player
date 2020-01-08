<template>
  <div class="register">
    <cube-form
    :model="model"
    :schema="schema"
    @submit="submitHandler"
    ></cube-form>
  </div>
</template>
<script>

export default {
  data(){
    return {
      model:{
        username:'',
        password:'',
        conformpassword:''
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
          {
            type: 'input',
            modelKey: 'conformpassword',
            props: {
              type:'password',
              placeholder:'确认密码',
              eye: {
                open: true,
                reverse: false
              }
            },
            rules: {
              required: true,
              regConfromPassword:val => {
                if(val===this.model.password){
                  return true;
                }else{
                  return false
                }
              }
            },
            messages: {
              required: '确认密码不能为空',
              regConfromPassword:'密码不一致'
            }
          },
          { // 登录按钮
              type: 'submit',
              label: '登录'
          }
        ]
      }
    }
  },
  methods:{
    submitHandler(e){
     e.preventDefault();
     this.$http.post('/api/register', {
        username: this.model.username,
        password: this.model.password
      })
      .then(({ data }) => {
        if (data.code === 0) {
          this.$router.push('/login').catch(err => {err})
          const toast = this.$createToast({
            time: 1000,
            txt: '注册成功'
          })
          toast.show()
        } else {
          const toast = this.$createToast({
            time: 1000,
            txt: '用户名已经存在'
          })
          toast.show()
        }
      })
    
    }
  }
}

</script>

<style scoped lang='stylus'>
  .register
    position: fixed
    top:0
    bottom:0
    width:100%
    background: white
</style>
