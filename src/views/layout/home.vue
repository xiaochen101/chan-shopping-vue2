<template>
    <div class="home" v-if="images.length">
      <van-nav-bar class="nav-bar" title="商城"  fixed />
      <van-search  shape="round" background="rgb(254 254 254 / 96%)" placeholder="请输入搜索关键词"  @click="$router.push('/search')"/>
      <!-- 轮播图 -->
      <van-swipe  class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 公告 -->
      <van-notice-bar left-icon="volume-o" :text="context"/>
      <!-- 分类 -->
      <van-grid :column-num="5">
        <van-grid-item v-for="item in categoryItem" :key="item.id" :icon="item.link" :text="item.text" @click="categoryData(item.text)"/>
      </van-grid>
          <!-- 主会场 -->
      <div class="main">
        <img :src="mainvenueImg" alt="">
      </div>
          <!-- 好物推荐 -->
      <div class="goods">
        <p class="goods-title">—— 好物推荐 ——</p>
        <div class="goods-list">
          <GoodsItem v-for="item in GoodsItems" :key="item.id" :GoodsItems="item"></GoodsItem>
        </div>
      </div>

    </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getIndexList } from '@/api/layout'
export default {
  name: 'HomeIndex',
  data () {
    return {
      images: [], // 轮播图
      context: '', // 通知公告
      categoryItem: [], // 分类
      mainvenueImg: '', // 主会场
      GoodsItems: [] // 好物推荐
    }
  },
  components: {
    GoodsItem
  },
  async created () {
    this.getIndexData()
  },
  methods: {
    async getIndexData () {
      const { item } = await getIndexList()
      const linkList = item[0].data.map((item) => item.link)
      this.images = linkList.slice(0, 4)
      this.context = item[1].data[0].context
      this.categoryItem = item[2].data.slice(0, 10)
      this.mainvenueImg = item[3].data[0].link
      const goodsItem = item[4].data.filter((item) => { return item.is_goods })
      this.GoodsItems = goodsItem
    },
    categoryData (text) {
      this.$router.push({
        path: '/category',
        query: {
          cateName: text
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>

.home {
  padding-top: 46px;
  padding-bottom: 50px;
  height: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}

::v-deep .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #00b6ed;
}
::v-deep .van-grid-item__text {
  color: #000 !important;
  font-size: 14px !important;
  font-weight: 500;
}

// 主会场
.main img {
  display: block;
  width: 100%;
  height: 118px;
}

::v-deep .goods .goods-title {

  font-size: 18px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
::v-deep .van-swipe-item {
  width: 100%;
  height: 184px !important;

}
::v-deep .van-swipe-item img {
  width: 100%;
  height: 184px;
}
::v-deep .van-icon__image {
  border-radius: 25%;
}
::v-deep .van-card__title {
  font-size: 14px;
  color: #000;
}
::v-deep .van-notice-bar {
  background-color: #fff !important;
}

</style>
