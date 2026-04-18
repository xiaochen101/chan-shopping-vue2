<template>
    <div class="pay">
      <van-nav-bar title="订单支付"  @click-left="$router.go(-1)" left-arrow  fixed />
      <!-- 地址 -->
      <div class="address" @click="$router.push('/address')">
        <div class="address-info" >
          <van-icon name="location-o" />
          <div class="address-relations">
            <div class="user">{{address_info?.receiver_name}} {{address_info?.receiver_phone}}</div>
            <div class="adress-del">{{address_info.province}}{{address_info.city}}{{address_info.district}}{{address_info.detailed_address}}</div>
          </div>

        </div>
        <div class="more">
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 订单 -->
      <div class="pay-list" >
        <van-card v-for="item in orderInfo.goods_list" :key="item.goodsId" :num="item.goodsNum"
          :price="item.goodsPrice"  :title="item.goodsName" :thumb="item.goodsLink">
        </van-card>
        <div class="flow-num-box">
          <span>共 {{amount_detail.totalGoodsNum}} 件商品，合计：</span>
          <span class="money">￥{{amount_detail.totalAmount}}</span>
        </div>

      </div>
      <!-- 支付详情 -->
      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{amount_detail.totalAmount}}</span>
        </div>
        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>
        <div class="pay-cell" v-if="address_info">
          <span>配送费用：</span>
          <span class="freight-amount">￥{{amount_detail.freightAmount}}</span>
        </div>
        <div class="pay-cell" v-else>
          <span>配送费用：</span>
          <span>请选择配送地址</span>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span><van-icon color="#ff9700" name="balance-o" />余额支付（可用 ¥ {{user_asset_info.balance}} 元）</span>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio  name="10"  checked-color="#fa2209"></van-radio>
          </van-radio-group>
        </div>
      </div>
      <!-- 买家留言 -->
      <div class="buytips">
        <textarea v-model="remark" placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10" ></textarea>
      </div>
      <!-- 提交订单 -->
      <van-submit-bar @submit="onSubmit" :price="amount_detail.payAmount *100" button-text="提交订单">
      </van-submit-bar>
    </div>
</template>

<script>
import { getDefaultAddress } from '@/api/address'
import { getCheckoutPreview, checkoutSubmit } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      radio: '10',
      orderInfo: {},
      address_info: {},
      amount_detail: {},
      user_asset_info: {},
      addressId: 1,
      remark: ''
    }
  },
  async created () {
    this.checkoutPriview()
  },
  methods: {
    async checkoutPriview () {
      const res = await getDefaultAddress()
      this.addressId = res.data.id
      const params = this.$route.query
      if (params.cartIds) {
        params.cartIds = Array.isArray(params.cartIds) ? params.cartIds : [params.cartIds]
      }

      if (!params.mode) {
        return this.$router.replace('/')
      }
      const { data } = await getCheckoutPreview({
        ...params,
        addressId: this.addressId
      })

      this.orderInfo = data
      this.address_info = data.address_info
      this.amount_detail = data.amount_detail

      this.user_asset_info = data.user_asset_info
    },
    async onSubmit () {
      const params = this.$route.query
      if (params.cartIds) {
        params.cartIds = Array.isArray(params.cartIds) ? params.cartIds : [params.cartIds]
      }
      const obj = {
        ...params,
        addressId: this.addressId,
        remark: this.remark
      }
      await checkoutSubmit(obj)
      this.$router.replace('/myorder')
    }
  }

}
</script>

<style lang="less" scoped>
.pay {
  background-color: #f5f5f5;
  min-height: 667px;
  padding-top: 46px;
  padding-bottom: 50px;
}
.address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  padding: 20px;
  background-color: #fff;
  .address-info {
    display: flex;
    align-items: center;
    .van-icon {
      margin-right: 12px;
    }
  }
}

.pay-list {
  margin: 10px 0;

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
      width: 100px;
      height: 88px;
    }

  }
  .flow-num-box {
    padding: 10px;
    text-align: right;
    color: #323233;
    font-size: 14px;
    background-color: #fff;
    .money {
      color: #fa2209;
    }
  }

}
.pay-cell {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  font-size: 14px;
  color: #323233;
  .red {
    color: #fa2209;
  }
  .freight-amount {
    color: #fa2209;
  }
}
.pay-way {
  padding: 0 10px;
  background-color: #fff;
  font-size: 14px;
  color: #323233;
  .pay-cell {
  padding: 10px 0;
  }
  .van-icon {
    margin-right: 5px;
    font-size: 20px;
  }

}

.buytips {
  padding: 10px 0;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 150px;
  }
}

</style>
