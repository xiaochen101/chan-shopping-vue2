<template>
    <div class="search">
      <van-nav-bar title="搜索" left-arrow @click-left="$router.go(-1)" />
      <van-search
        v-model="search"
        show-action
        placeholder="请输入搜索关键词"
        @search="goSearch(search)"
      >
        <template #action>
          <div @click="goSearch(search)" >搜索</div>
        </template>
      </van-search>
      <div v-if="hasHistory" class="search-history" >
        <div class="title" >
          <span>最近搜索</span>
          <van-icon name="delete-o" size="14" @click="delSearch" />
        </div>
       <div class="list">
          <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">{{item}}</div>
      </div>
      </div>
    </div>

</template>

<script>
import { setHistory, getHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: getHistory()
    }
  },
  computed: {
    hasHistory () {
      return this.history.length > 0
    }
  },

  methods: {
    goSearch (key) {
      if (key) {
        key = key.trim()
        const index = this.history.indexOf(key)
        if (index !== -1) {
          this.history.splice(index, 1)
        }
        this.history.unshift(key)
        setHistory(this.history)
        this.$router.push(`/searchlist?search=${key}`)
      } else {
        this.$toast('请输入搜索关键词')
      }
    },
    delSearch () {
      this.history = []
      setHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
.search-history .title {
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
      span{
        color: #777;
        font-size: 14px;
      }
}

.van-search__action {
  width:71px;
  background: #fa2209 ;
  color: #fff ;
  font-size: 14px;
  text-align: center;
  border-radius: 0 5px 5px 0;
}

.van-search__action:active {
  background: #fa2209 ;
}
.list {
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
.list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
}
</style>
