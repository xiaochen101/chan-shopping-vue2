<template>
  <div class="userinfo">
    <van-nav-bar fixed title="个人信息" left-arrow @click-left="$router.go(-1)" />
    <div class="info">
      <div class="avatar">
        <span>头像</span>
        <div class="img"  @click="onRecharge">
          <img :src="userInfo.link" alt="">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="nickname" >
        <span>昵称</span>
        <div class="input" @click="onRecharge">
          <input disabled type="text" :value="userInfo.username">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="tel">
        <span>账号名</span>
        <div class="input">
          <input type="text" disabled :value="formattedPhone">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  created () {
    if (this.$store.getters.token) {
      this.$store.dispatch('user/getUserInfoActions')
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    formattedPhone () {
      const phone = this.userInfo?.phone_number || ''
      if (phone.length >= 11) {
        return phone.slice(0, 3) + '****' + phone.slice(-4)
      }
      return phone
    }
  },
  methods: {
    onRecharge () {
      this.$dialog.alert({
        message: '功能还在开发中，敬请期待'
      }).then(() => {
        // on close
      })
    }
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  padding-top: 46px;
  background-color: #f5f5f5;
  min-height: 667px;
  .info {
    padding: 15px;
    .avatar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 10px 20px;
      font-size: 14px;
      color: #333;
      .img {
        display: flex;
        align-items: center;
        .van-icon {
          color: #858585;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }

    }
    .nickname,
    .tel {
      background-color: #fff;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333;
      font-size: 14px;
      .van-icon {
          color: #858585;
      }
      input {
        height: 30px;
        text-align: right;
        border: none;
        outline: none;
        color: #858585;
        margin-right: 5px;
        background-color: transparent;
      }
    }
  }
}
</style>
