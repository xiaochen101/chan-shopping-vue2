<template>
    <div class="search-list">
       <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />
       <van-search :value="querySearch" placeholder="请输入搜索关键词" shape="round" readonly @click="$router.push('/search')" />
       <div class="sort-btns">
         <div class="sort-item" v-for=" item in list" :key="item.label"
          :class="{ active: currentActive === item.label }" @click="changeActive(item.label)" >{{item.label}}
            <div class="icon" v-if="item.hasIcon">
              <van-icon name="arrow-up"  @click.stop="handleArrow('up')" :class="{active: currentActive === '价格' && priceSortType === 'up' }" />
              <van-icon name="arrow-down" @click.stop="handleArrow('down')" :class="{ active: currentActive === '价格' && priceSortType === 'down' }"  />
            </div>
          </div>
       </div>
       <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="onLoad"
           offset="50"
           :immediate-check="false"
       >
          <van-empty description="暂无商品"  v-if="GoodsItems.length === 0"  />
          <GoodsItem  v-else v-for="item in GoodsItems" :key="item.id" :GoodsItems="item"></GoodsItem>
       </van-list>

    </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getGoodsList } from '@/api/search-list'
export default {
  name: 'ListIndex',
  data () {
    return {
      list: [
        { label: '综合', hasIcon: false },
        { label: '销量', hasIcon: false },
        { label: '价格', hasIcon: true }
      ],
      currentActive: '综合',
      priceSortType: 'up',
      GoodsItems: [],
      currentPage: 1,
      loading: false,
      finished: false,
      sortType: 'default', // 排序类型：default/price/sales
      sortOrder: 'desc' // 排序方向：desc（降序）/asc（升序）

    }
  },
  components: {
    GoodsItem: GoodsItem
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  created () {
    this.getData()
  },
  methods: {
    changeActive (label) {
      this.currentActive = label
      this.currentPage = 1
      this.finished = false
      this.GoodsItems = []
      if (label === '综合') {
        this.sortType = 'default'
      } else if (label === '销量') {
        this.sortType = 'sold'
      } else if (label === '价格') {
        this.priceSortType = 'up'
        this.sortType = 'price'
        this.sortOrder = 'desc'
      }
      // 重新加载数据
      this.getData()
    },
    handleArrow (params) {
      this.currentActive = '价格'
      this.currentPage = 1
      this.finished = false
      this.GoodsItems = []

      this.sortType = 'price'
      if (params === 'up') {
        this.priceSortType = 'up'
        this.sortOrder = 'desc' // 向上箭头：价格降序（最高）
      } else {
        this.priceSortType = 'down'
        this.sortOrder = 'asc' // 向下箭头：价格升序（最低）
      }

      this.getData()
    },
    async getData () {
      const res = await getGoodsList({
        keywords: this.querySearch,
        page: this.currentPage,
        sort_type: this.sortType,
        sort_order: this.sortOrder
      })
      this.GoodsItems = res.data
    },
    async onLoad () {
      this.currentPage += 1
      const res = await getGoodsList({
        keywords: this.querySearch,
        page: this.currentPage,
        sort_type: this.sortType,
        sort_order: this.sortOrder
      })
      this.GoodsItems = [...this.GoodsItems, ...res.data]
      // 判断是否加载完所有数据
      if (this.currentPage >= res.total_pages) {
        this.finished = true
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  padding-top: 46px;
}
.sort-btns {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 14px;
    margin-bottom: 14px;
    height: 36px;
    line-height: 36px;
    .sort-item {
      display: flex;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      .icon {
        display: flex;
        margin-left: 14px;
        flex-direction: column;
        justify-content: space-around;
        font-size: 16px;
        ::v-deep .van-icon-arrow-down {
          margin-top: -11px;
        }
        ::v-deep .van-icon {
          font-weight: 600;
            color: #333;
        }

        ::v-deep .van-icon.active {
          color: #e49a3d;
        }

        ::v-deep .van-icon-arrow-down {
          margin-top: -11px;
        }
      }
    }
    .sort-item.active {
      color: #e49a3d;
    }
}
</style>
