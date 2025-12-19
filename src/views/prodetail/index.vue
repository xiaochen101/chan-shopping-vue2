<template>
    <div class="prodetail">
      <van-nav-bar fixed title="商品详情" left-arrow @click-left="$router.go(-1)" />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <div class="swipe-num">{{swipeNum + 1}} / 4</div>

    </div>
</template>

<script>
export default {
  name: 'ProDetailIndex',
  data () {
    return {
      swipeNum: 0
    }
  },
  methods: {
    onChange (index) {
      this.swipeNum = index
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  position: relative;
  padding-top: 46px;

}
.my-swipe {
  position: relative;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 375px;
    height: 375px;
    text-align: center;
    background-color: pink;

  }

}
.swipe-num {
    position: absolute;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    right: 10px;
    bottom: 30px;
    border-radius: 25px;
    color:#fff;
    background: rgba(0, 0, 0, 0.1);

  }
</style>
