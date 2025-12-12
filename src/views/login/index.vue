<template>
    <div class="login">
      <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
      <div class="container">
        <div class="title">
          <h1>手机号登录</h1>
          <p>未注册的手机号登录后将自动注册</p>
        </div>
        <div class="form">
          <div class="form-item">
            <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
          </div>
          <div class="form-item">
            <input v-model="captchaCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
            <img :src="picUrl" alt="" @click="getPicCode">
          </div>
          <div class="form-item">
            <input v-model="SmsCode" class="inp" placeholder="请输入短信验证码" type="text" >
            <button @click="getCode" :disabled="BtnFlg">
              {{ second === totalSecond ? '获取验证码' : second + `秒后重新发送`}}
            </button>
          </div>
        </div>
        <div class="login-btn" @click="login">登录</div>
      </div>

    </div>
</template>
<script>
import { getPicCode, getMobileSmsCode, Login } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picUrl: '',
      CaptchaKey: '',
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时的秒数
      timer: null, // 定时器 id
      mobile: '', // 手机号
      captchaCode: '', // 图形验证码
      SmsCode: '',
      BtnFlg: false

    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { captcha_key: CaKey, img_captcha_url: ImgUrl } } = await getPicCode()
      this.CaptchaKey = CaKey
      this.picUrl = ImgUrl
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        try {
          const { msg, sms_code: SmsCode } = await getMobileSmsCode({
            phone: this.mobile,
            captcha_key: this.CaptchaKey,
            captcha_code: this.captchaCode
          })
          this.$toast.success({
            message: `${msg}短信验证码是：${SmsCode}`,
            duration: 4000
          })
        } catch (error) {
          this.$toast.fail(
            {
              message: `${error.response.data.msg.non_field_errors}`,
              duration: 3000
            }
          )
          return
        }

        // 开启倒计时
        this.timer = setInterval(() => {
          this.BtnFlg = true
          this.second--

          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
            this.BtnFlg = false
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      try {
        const { data: { token, uid } } = await Login({
          phone: this.mobile,
          sms_code: this.SmsCode
        })

        this.$store.commit('user/setUserInfo', {
          token: token,
          userId: uid
        })
        this.$router.push('/')
        this.$toast('登录成功')
      } catch (error) {
        this.$toast.fail(
          {
            message: `${error.response.data.msg.non_field_errors}`,
            duration: 3000
          }
        )
      }
    },
    // 验证
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^[a-zA-Z]{4}$/.test(this.captchaCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}

</script>

<style lang="less">
  .container {
    padding: 74px 44px;
    .title h1 {
      font-size: 40px;
      color: #191919;
      font-weight: 400;
    }
    .title p {
      margin-top: 14px;
      color: #b3b3b3;
      font-size: 20px;
    }
    .form-item {
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      .inp {
        display: block;
        border: none;
        outline: none;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        flex: 1;
      }
      img {
        width: 94px;
        height: 31px;
      }
      button {
        height: 31px;
        border: none;
        font-size: 13px;
        color: #cea26a;
        background-color: transparent;
        padding-right: 9px;
      }
      button:disabled {
        cursor: not-allowed;
        color: #909399;
      }
    }
    .login-btn {
      width: 100%;
      height: 42px;
      margin-top: 39px;
      background: linear-gradient(90deg,#ecb53c,#ff9211);
      color: #fff;
      border-radius: 39px;
      box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
