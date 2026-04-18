<template>
    <div class="goods-item" >
        <van-card
            :price="GoodsItems.now_price"
            :origin-price="GoodsItems.old_price"
            :desc="sold"
            :title="GoodsItems.name"
            :thumb="GoodsItems.link"
            @click="$router.push(`/prodetail/${GoodsItems.id}`)"
        >

        </van-card>
    </div>
</template>

<script>
export default {
  name: 'GoodsItemIndex',
  data () {
    return {
      sold: ''
    }
  },
  props: ['GoodsItems'],
  created () {
    this.getSold()
  },
  methods: {
    getSold () {
      this.sold = `已售 ${this.GoodsItems.sold}`
    }
  }
}
</script>

<style lang="less" scoped>
    .van-card {
      width: 94%;
      margin: 10px auto;
      padding: 10px;
      color: #323233;
      font-size: 14px;
      background-color: #fff;
      .van-card__content {
        padding: 10px;
      }
      .van-card__price {
        color: #fa2209;
      }
      .van-card__thumb {
        width: 88px;
        height: 88px;
      }
      .van-card__desc {
        font-size: 12px;
      }
    }
</style>
