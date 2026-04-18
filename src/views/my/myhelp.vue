<template>
  <div class="help">
    <van-nav-bar fixed title="帮助" left-arrow @click-left="$router.go(-1)" />
    <div class="text">
        <h2>关于小程序</h2>
        <p>这是一款正在开发中的购物商城 APP，提供商品浏览、下单支付、订单管理、优惠券领取、售后退换货等一站式购物服务。目前功能持续完善中，我们将不断优化体验，为您带来便捷、安心的购物体验。</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.help {
    padding: 46px 15px;
    .text {
        margin-top: 20px;
        h2 {
            font-weight: 400;
            font-size: 23px;
            color: #333;
            margin-bottom: 7px;
        }
        p {
            font-size: 14px;
            color: #666;
        }
    }
}
</style>
