<template>
    <div class="myorder">
      <van-nav-bar fixed title="我的订单" left-arrow @click-left="$router.go(-1)" />
      <van-tabs v-model="active" @change="onClick"  >
        <van-tab  v-for="tab in tabList" :key="tab.name" :title="tab.title" :name="tab.name">
          <van-list v-if="order_list.length>0" v-model="loading" :immediate-check="false" offset="50" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="orders" v-for="item in order_list" :key="item.id">
            <div class="time-stauts">
              <div class="time">{{item.create_time}}</div>
              <div class="status">{{getOrderStatusText(item.orderStatus)}}</div>
            </div>
            <div class="goods-card" v-for="goods in item.ordersItems" :key="goods.id">
              <van-card :num="goods.goodsNum" :price="goods.goodsPrice"  :title="goods.goodsName" :thumb="goods.goodsLink" />
            </div>
            <div class="total-amount">
              <span>共{{item.goodsTotalNum}}件商品，合计：</span>
              <span class="money">￥{{item.payAmount}}</span>
            </div>
            <div class="cancel" v-if="canCancelOrder(item.orderStatus)">
              <button @click="cancelOrder(item.id)">取消订单</button>
            </div>
            </div>
          </van-list>
          <van-empty v-else description="暂无相关数据" />
        </van-tab>
      </van-tabs>
    </div>
</template>

<script>
import { getOrderList, orderCancel } from '@/api/order'
export default {
  name: 'MyorderIndex',
  data () {
    return {
      active: 70,
      order_list: [],
      loading: false,
      finished: false,
      page: 1,
      orderStatus: 70,
      tabList: [
        { name: 70, title: '全部' },
        { name: 10, title: '待支付' },
        { name: 20, title: '待发货' },
        { name: 30, title: '待收货' },
        { name: 40, title: '待评价' }
      ]
    }
  },
  async created () {
    if (this.$store.getters.token) {
      const type = this.$route.query.type
      if (type !== undefined && !isNaN(Number(type))) {
        this.active = Number(type)
        this.orderStatus = Number(type)
      }
      this.getData(this.page, this.orderStatus)
    }
  },
  methods: {
    canCancelOrder (status) {
      const allowCancelStatus = [10, 20, 30]
      return allowCancelStatus.includes(status)
    },
    cancelOrder (orderId) {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确认取消订单吗？'
      })
        .then(async () => {
          await orderCancel({ orderId: orderId })
          this.page = 1
          this.getData(this.page, this.orderStatus)
        })
        .catch(() => {

        })
    },
    async onLoad () {
      try {
        const { data } = await getOrderList({
          page: this.page + 1,
          order_status: this.orderStatus
        })
        const newList = data.order_list
        this.order_list = [...this.order_list, ...newList]
        this.page += 1
        this.finished = this.page >= data.total_pages
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async getData (page, orderStatus) {
      this.loading = true
      try {
        const { data } = await getOrderList({
          page: page,
          order_status: orderStatus
        })
        this.order_list = data.order_list
        this.page = page
        this.finished = this.page >= data.total_pages
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    getOrderStatusText (status) {
      const statusMap = {
        10: '待支付',
        20: '待发货',
        30: '待收货',
        40: '待评价',
        50: '已完成',
        60: '已取消'
      }
      return statusMap[status] || '未知状态'
    },
    onClick (name) {
      this.orderStatus = name
      this.page = 1
      this.$router.replace({
        path: this.$route.path,
        query: { type: name }
      }).catch(() => {})
      this.getData(this.page, this.orderStatus)
    }

  }
}
</script>

<style lang="less" scoped>
.myorder {
  padding-top: 46px;
  min-height: 667px;
  background-color: #f5f5f5;
}
.van-tab {
  font-size: 15px;
}
.orders {
  width: 94%;
  margin: 10px auto;
  background-color: #fff;
  padding: 10px;
  .time-stauts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    .time {
      color: #777;
    }
    .status {
      color: #fa2209;
    }

  }
  .goods-card {
    .van-card {
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
    }
  }
  .total-amount {
    text-align: right;
    text-align: right;
    color: #323233;
    font-size: 14px;
    background-color: #fff;
    .money {
      color: #fa2209;
    }
  }
  .cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      border-radius: 7px;
      padding: 4px 14px;
      font-size: 14px;
      color: #383838;
      border: 1px solid #a8a8a8;
      background-color: transparent;
    }
  }
}

</style>
