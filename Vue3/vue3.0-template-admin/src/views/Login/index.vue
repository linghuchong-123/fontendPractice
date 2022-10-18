<template>
  <div class="container">
    <div class="login-container">
      <div class="login-left">
        <div class="top">
          <div class="title">
            <span>欢迎使用</span>
          </div>
          <div class="desc">
            <span>Vite2.x + ElementPlus + Vue3.x + TypeScript</span>
          </div>
        </div>
        <div class="bottom">
          <img :src="working" />
        </div>
      </div>
      <div class="login-right">
        <Login v-if="!showReset" @toResetPwd="handleResetPwd"></Login>
        <ForgetPassword v-else :show-reset="showReset" @toLogin="handleToLogin"></ForgetPassword>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import viteLogo from '@/assets/logo-vite.svg'
import vueLogo from '@/assets/logo.png'
import working from '@/assets/woking.gif'
import Login from './components/loginForm.vue'
import ForgetPassword from './components/forgetPassword.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Login,
    ForgetPassword
  },
  setup() {
    const showReset = ref(false)
    const handleResetPwd = () => {
      // 展示重置密码框
      showReset.value = true
    }
    const handleToLogin = () => {
      // 展示登录框框
      showReset.value = false
    }
    return {
      showReset,
      handleResetPwd,
      handleToLogin,
      vueLogo,
      working,
      viteLogo
    }
  }
})
</script>

<style lang="stylus" scoped>
.container{
    position: relative;
    background-image:linear-gradient(90deg, #ebebeb, #f5f7f6);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-container{
        width:54.625rem;
        min-width: 54.625rem;
        height: 78%;
        min-height: 37.5rem;
        flex-direction: row;
        display: flex;
        justify-content: space-evenly;
        border-radius: .625rem;
        overflow: hidden;
        background-color :white;
        box-shadow:0 0 1.25rem .3125rem rgba(34,84,142,.26);

        .login-left{
            width:50%;
        padding:2.9375rem 3.375rem;
        img{
           width: 100%;
           height: auto;
           margin: 0rem 1.25rem;
        }
        .top{
            display:flex;
            flex-direction:column;
            justify-content :flex-start;
            align-items :flex-start;
            margin:2.5rem 0rem;
            .title{
                font-size: 2rem;
                margin-bottom: 1rem;

            }
            .desc{
                font-size: 1.75rem;
                text-align: left;
                color: rgb(166,175,188);
            }
        }

        }
        .login-right{
            width:50%;
            display:flex;
            flex-direction:column ;
            justify-content: center;
            align-items :center;
            padding:1.875rem;

        }
    }

}
</style>
