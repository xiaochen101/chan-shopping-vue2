<template>
    <div class="category">
      <van-nav-bar title="全部分类" fixed />
         <!-- 搜索框 -->
      <van-search
        readonly
        shape="round"
        background="#f1f1f2"
        placeholder="请输入搜索关键词"
        @click="$router.push('/search')"
      />
      <van-tree-select height="525" :items="items" :main-active-index.sync="active"  @click-nav="onload"  >
         <template #content>
          <van-empty description="暂无商品"  v-if="categoryChildItem.length === 0"  />
          <van-grid :column-num="3">
            <van-grid-item  v-for="item in categoryChildItem" :key="item.id" :icon="item.link" :text="item.text" @click="handelData(item.text)" />
          </van-grid>

         </template>
      </van-tree-select>
    </div>
</template>

<script>
import { getIndexList } from '@/api/layout'
import { getCategoryChild } from '@/api/category'
export default {
  name: 'CategoryIndex',
  data () {
    return {
      active: 0,
      items: [],
      categoryItem: [],
      category_id: '',
      categoryChildItem: []
    }
  },
  async created () {
    await this.getIndexData()
    if (this.categoryItem.length > 0) {
      let index = 0
      for (let i = 0; i < this.items.length; i++) {
        if (this.$route.query.cateName === this.items[i].text) {
          index = i
        }
      }
      this.onload(index)
    }
  },

  methods: {
    async getIndexData () {
      const { item } = await getIndexList()

      this.categoryItem = item[2].data
      this.items = this.categoryItem.map((item) => { return { text: item.text } })
    },
    async onload (index) {
      this.active = index
      this.category_id = this.categoryItem[index].id
      const res = await getCategoryChild({
        category_id: this.category_id
      })
      this.categoryChildItem = res.data
    },
    handelData (text) {
      this.$router.push(`/searchlist?search=${text}`)
    }

  }
}
</script>

<style lang="less" scoped>
.category {
  padding-top: 46px;
}
::v-deep .van-search  {
  background: #fff !important;
}
::v-deep .van-tree-select__nav-item {
  padding: 0;
}
::v-deep .van-sidebar-item {
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: 500;
}
::v-deep .van-grid-item__content--center{
height: 127px;
padding: 0;
img {
  width: 60px;
  height: 60px;
}
.van-grid-item__text {
  margin-top: 10px;
  font-size: 16px;
  color: #000;
}

}
::v-deep [class*=van-hairline]::after {
  border: none;
}

</style>
