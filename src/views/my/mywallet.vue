<template>
    <div class="wallet">
        <van-nav-bar fixed title="我的钱包" left-arrow @click-left="$router.go(-1)" />
        <div class="wallet-container">
            <img src="@/assets/wallet.png" alt="">
            <p class="money">{{userAsset.balance}}</p>
            <p class="text">账户余额（元）</p>
        </div>
        <button class="recharge " @click="onRecharge">充值</button>
        <div class="log">
            <div class="history" @click="onRecharge">充值记录</div>
            <div class="orderdetail" @click="onRecharge">账单详情</div>
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
      this.$store.dispatch('user/getuserAssetActions')
    }
  },
  computed: {
    ...mapState('user', ['userAsset'])
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
.wallet {
    padding-top: 46px;
}
.wallet-container {
    margin: 75px auto;
    text-align: center;
    img {
        width: 180px;
        height: 130px;

    }
    .money {
        margin-top: 10px;
        font-size: 28px;
        color: #303133;
    }
    .text {
        margin-top: 7px;
        font-size: 13px;
        color: #cec1c1;
    }
}
.recharge {
    display: block;
    width: 230px;
    height: 42px;
    margin: 0 auto;
    border: none;
    border-radius: 25px;
    background: #786cff;
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.log {
    margin-top: 40px;
    padding: 0 50px;
    display: flex;
    justify-content: space-evenly;
    font-size: 14px;
    color: #5e5e5e;
}
</style>
