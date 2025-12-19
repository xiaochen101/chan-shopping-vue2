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
.van-card__title {
    font-weight: 700;

}
.van-card__bottom {
    text-align: right;
    line-height: 5.33333vw;
}
.van-card__price {
    color: #ea0707;
}
</style>
