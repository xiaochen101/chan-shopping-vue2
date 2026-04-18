<template>
  <div class="cart">
    <div class="cart-info" v-if=" cartList?.cart_list?.length > 0 ">
      <van-nav-bar title="购物车" fixed />
      <div class="cart-all">
      <div class="all">共<i>{{cartTotal}}</i>件商品</div>
      <div class="edit" @click="edit()">
        <van-icon name="edit" />
        {{ isEdit ? '取消编辑':'编辑'}}
      </div>
      </div>
      <div class="cart-list" v-for="item in cartList.cart_list" :key="item.cart_info.id">
      <div class="cart-item">
        <van-checkbox @click="changeCheck(item.cart_info.id)"  :value="item.cart_info.is_checked" checked-color="#ee0a24" ></van-checkbox>
        <van-card  @click="$router.push(`/prodetail/${item.cart_info.goodsId}`)" :price="item.goods.now_price"  :title="item.goods.name" :thumb="item.goods.link" />
        <CountBox @input="(goodsNum) => updateCart({'goodsNum':goodsNum,'goodsId':item.cart_info.goodsId})" :value="item.cart_info.goodsNum"></CountBox>
      </div>
      </div>
      <van-submit-bar @submit="goPay" :disabled="selCount === 0" :price="selPrice * 100" :decimal-length="2" :button-text=" isEdit ? '删除':`结算(${selCount})`">
      <van-checkbox @click="changeAllcheck" :value="isAllcheck" checked-color="#ee0a24">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- 空购物车 -->
    <div class="cart-info-empty" v-else>
      <van-nav-bar title="购物车" fixed />
      <van-empty description="购物车为空">
        <van-button round type="danger" class="bottom-button" @click="$router.push('/home')">去逛逛</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartPage',
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isAllcheck'])
  },
  components: {
    CountBox
  },
  created () {
    if (this.$store.getters.token) {
      this.$store.dispatch('cart/getCartActions')
    }
  },
  methods: {
    edit () {
      this.isEdit = !this.isEdit
    },
    changeCheck (cartId) {
      this.$store.dispatch('cart/updateCheckStatusActions', cartId)
    },
    changeAllcheck () {
      this.$store.dispatch('cart/updateAllCheckStatusActions', !this.isAllcheck)
    },
    updateCart (params) {
      this.$store.dispatch('cart/updateCartActions', params)
    },
    async goPay () {
      if (this.isEdit) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '确认删除吗',
          cancelButtonText: '取消',
          confirmButtonText: '删除'
        })
          .then(async () => {
            await this.$store.dispatch('cart/delSelect')
            this.isEdit = !this.isEdit
          })
          .catch(() => {
            // on cancel
          })
      } else {
        const cartIds = this.selCartList.map(item => item.cart_info.id)

        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: cartIds,
            deliveryType: 10,
            payType: 10
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 667px;
}
.cart-all {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  .all {
    i {
      font-style: normal;
      margin: 0 2px;
      color: #fa2209;
      font-size: 16px;
    }
  }
  .edit {
    .van-icon {
      font-size: 18px;
    }
  }
}
.cart-item {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 10px 10px 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  .van-card {
    background-color: #fff;
    font-size: 15px;
    width: 310px;
    padding: 8px 0;

    .van-card__content {
      padding: 10px 5px;
    }
    .van-card__thumb {
      width: 100px;
      height: 100px;
    }
    .van-card__title {
      font-weight: 500;
    }
    .van-card__price {
      color: #fa2209;
    }
  }

  .btn {
    position: absolute;
    right: 15px;
    bottom: 28px;
    ::v-deep button {
      width: 30px ;
      height: 30px ;
      font-size: 14px;
      line-height: 30px;

    }
    ::v-deep input {
      width: 40px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;

    }

  }

}
.van-submit-bar {
  bottom: 50px;

}
  .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
