<template>
  <div class="user-detail">
      <!-- 用户名/头像 -->
    <div class="header" v-if="$store.getters.token">
      <div class="user-info" @click=" goPage('/userinfo')">
        <div class="avatar">
          <img :src="userInfo.link" alt="">
        </div>
        <div class="info">
          <div class="name">{{userInfo.username}}</div>
          <div class="tel">{{formattedPhone}}</div>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <div class="user-info" >
        <div class="avatar">
          <img src="@/assets/default-avatar.png" alt="">
        </div>
        <div class="info">
          <div class="name">未登陆</div>
          <div class="tel"  @click="$router.push({
              path: '/login',
              query: {
                backUrl:$route.fullPath
              }
            })">点击登录账户</div>
        </div>
      </div>
    </div>
    <!-- 资产 -->
    <div class="asset">
      <div class="asset-item" @click=" goPage('/wallet')">
        <span v-if="$store.getters.token">{{userAsset.balance}}</span>
        <span v-else>***</span>
        <span>账户余额</span>
      </div>
      <div class="asset-item" @click=" goPage('/points')">
        <span v-if="$store.getters.token">{{userAsset.points}}</span>
        <span v-else>***</span>
        <span>积分</span>
      </div>
      <div class="asset-item" @click=" goPage('/coupons')">
        <span v-if="$store.getters.token">{{userAsset.coupon_count}}</span>
        <span v-else>***</span>
        <span>优惠券</span>
      </div>
      <div class="asset-item" @click=" goPage('/wallet')">
        <van-icon name="balance-pay" />
        <span>钱包</span>
      </div>
    </div>
    <!-- 订单中心 -->
    <div class="orders-center">
      <div class="orders-item" @click="goMyOrder(0)">
        <van-icon name="balance-list-o" />
        <span>全部订单</span>
      </div>
      <div class="orders-item" @click="goMyOrder(10)">
        <van-icon name="clock-o" />
        <span>待支付</span>
      </div>
      <div class="orders-item" @click="goMyOrder(20)">
        <van-icon name="logistics" />
        <span>待发货</span>
      </div>
      <div class="orders-item" @click="goMyOrder(30)">
        <van-icon name="send-gift-o" />
        <span>待收货</span>
      </div>
    </div>
    <!-- 服务 -->
    <div class="service">
      <div class="title">我的服务</div>
      <div class="service-items">
        <div class="service-item" @click=" goPage('/address')">
          <van-icon name="location-o" />
          <span>收货地址</span>
        </div>
        <div class="service-item"  @click=" goPage('/getcoupons')">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="service-item" @click=" goPage('/coupons')">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="service-item" @click=" goPage('/help')">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="service-item" @click=" goPage('/points')">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="service-item" @click=" goPage('/exchange')">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>

    </div>
    <!-- 登录/退出登录 -->
    <div class="login-out" v-if="$store.getters.token">
      <button @click="logOut" >退出登录</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserIndex',
  data () {
    return {}
  },
  created () {
    if (this.$store.getters.token) {
      this.$store.dispatch('user/getUserInfoActions')
      this.$store.dispatch('user/getuserAssetActions')
    }
  },
  computed: {
    ...mapState('user', ['userInfo', 'userAsset']),
    formattedPhone () {
      const phone = this.userInfo?.phone_number || ''
      if (phone.length >= 11) {
        return phone.slice(0, 3) + '****' + phone.slice(-4)
      }
      return phone
    }
  },
  methods: {
    goMyOrder (type) {
      this.$store.getters.token
        ? this.$router.push({
          path: '/myorder/',
          query: { type: type }
        })
        : this.$router.push({
          path: '/login',
          query: {
            backUrl: this.$route.fullPath
          }
        })
    },
    logOut () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '你确认要退出登录么？'
      })
        .then(() => {
          this.$store.dispatch('user/logout')
        })
        .catch(() => {

        })
    },
    goPage (url) {
      this.$store.getters.token
        ? this.$router.push(url)
        : this.$router.push({
          path: '/login',
          query: {
            backUrl: this.$route.fullPath
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user-detail {
  background-color: #f5f5f5;
  min-height: 667px;

}
.header {
  display: flex;
  align-items: center;
  height: 140px;
  padding-left: 15px;
  background: #fff url('@/assets/user-header2.png') no-repeat center;
}
.user-info {
  display: flex;
  align-items: center;
  .avatar{
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .info {
    .name {
      font-size: 17px;
      color: #c59a46;
      font-weight: 600;
    }
    .tel {
      margin-top: 7px;
      color: #c59a46;
      font-size: 14px;
    }
  }
}
.asset {
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
  background-color: #fff;

  .asset-item {
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #666;
    }
    span:first-child{
      margin-bottom: 7px;
      color: #fa2209;
      font-size: 16px;
    }
  }
  .asset-item:last-child{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .van-icon {
      margin-bottom: 3px;
      font-size: 22px;
      color: #666;
    }
  }
}
.orders-center {
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
  margin: 10px 14px;
  padding: 10px 0;
  .orders-item {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #666;
    span {
      margin-top: 5px;
    }
    .van-icon {
      font-size: 22px;
    }
  }
}
.service {
  background-color: #fff;
  margin: 10px 14px;
  padding: 10px 0;
  .title {
    font-size: 15px;
    color: #303133;
    margin-bottom: 10px;
    padding-left: 12px;
  }
  .service-items {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    color: #666;
    .service-item {
      display: flex;
      flex: 0 0 25%;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
      span {
        margin-top: 5px;
      }
      .van-icon {
        font-size: 22px;
        color: #fa2209;
      }
    }
  }
}
.login-out {
    button {
    width: 60%;
    margin: 30px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
