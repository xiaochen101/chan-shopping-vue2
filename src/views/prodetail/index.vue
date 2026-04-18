<template>
    <div class="prodetail" v-if="goods.code === 200">
      <van-nav-bar fixed title="商品详情" left-arrow @click-left="$router.go(-1)" />
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="item in swipeList" :key="item.images_id"><img :src="item.link" alt=""></van-swipe-item>
      </van-swipe>
      <div class="swipe-num">{{swipeNum + 1}} / {{swipeLength}}</div>
      <!-- 商品详情 -->
      <div class="info">
        <div class="price">
          <div class="now"><span>￥</span>{{goods.detail_info.goods.now_price}}</div>
          <div class="old"><span>￥</span>{{goods.detail_info.goods.old_price}}</div>
        </div>
        <div class="sold">已售{{goods.detail_info.goods.sold}}件</div>
      </div>
      <div class="protitle">
        <p>{{goods.detail_info.goods.name}}</p>
      </div>
      <div class="service">
        <div class="left-words">
          <span><van-icon name="certificate" />{{goods.detail_info.after_sale}}</span>
          <span><van-icon name="certificate" />{{goods.detail_info.delivery}}</span>
        </div>
      </div>
      <!-- 评价 -->
      <div class="comment">
        <div class="comment-title">
          <div class="left">商品评价 ({{(goods.comment_info.comments_list).length}}条)</div>
          <div class="right">查看更多 <van-icon name="arrow" /> </div>
        </div>
        <div class="comment-list" v-for=" item in goods.comment_info.comments_list" :key="item.comment_id">
          <div class="comment-item">
            <div class="comment-top">
              <img :src="item.user.link" alt="" >
              <div class="name">{{item.user.username}}</div>
              <van-rate :size="23" :value="item.score" color="rgb(244, 162, 19)" void-icon="star" void-color="#eee"/>
            </div>
            <div class="comment-content">
              <p>{{item.content}}</p>
            </div>
            <div class="comment-time">
              <span>{{item.create_time}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品描述 -->
      <div class="description">
        <div class="description-title">商品描述</div>
        <div class="description-img" v-for="item in goods.detail_info.description_images" :key="item.description_images_id">
          <img :src="item.link" alt="">
        </div>
      </div>
      <!-- 购物车 -->
      <van-goods-action>
        <van-goods-action-icon @click="$router.push('/home')" icon="wap-home-o" text="首页" />
        <van-goods-action-icon @click="$router.push('/cart')" icon="cart-o" :badge="cartBadge"  text="购物车" />
        <van-goods-action-button @click="showPopup('加入购物车')" type="warning" text="加入购物车" />
        <van-goods-action-button @click="showPopup('立即购买')" type="danger" text="立即购买" />
      </van-goods-action>
      <!-- 购物车弹出框 -->
      <van-popup @close="closePopup" v-model="show" round closeable close-icon="close" position="bottom" :style="{ height: '50%' }" >
        <div class="cart-item">
          <div class="cart">
            <img :src="goods.detail_info.goods.link" alt="">
            <div class="shopping">
              <div class="price">￥{{goods.detail_info.goods.now_price}}</div>
              <div class="stock">库存：{{goods.detail_info.goods.stock}}</div>
            </div>
          </div>
          <div class="count-box">
            <span>数量</span>
            <CountBox v-model="countBoxNum"></CountBox>
          </div>
          <div class="checkout">
            <button class="checkout-btn"
              @click="addCart"
             :class="{ 'checkout-btn-active': buttonText === '立即购买' }"
             v-if="goods.detail_info.goods.stock > 0">
              {{buttonText}}
            </button>
            <button class="checkout-btn-done"  v-else disabled>商品已抢完</button>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { getProductDetail } from '@/api/prodetail'
import { addCart } from '@/api/cart'
export default {
  name: 'ProDetailIndex',
  data () {
    return {
      swipeNum: 0,
      show: false,
      buttonText: '',
      countBoxNum: 1,
      swipeLength: 0,
      swipeList: [],
      goods: {}
    }
  },
  components: {
    CountBox
  },
  computed: {
    getProductId () {
      return this.$route.params.id
    },
    cartBadge () {
      const total = this.$store.getters.cartTotal.badge || ''
      return total <= 0 ? '' : (total > 99 ? '99+' : total)
    }
  },
  async created () {
    const data = await getProductDetail(this.getProductId)
    this.goods = data
    this.swipeLength = (data.detail_info.preview_images).length
    this.swipeList = data.detail_info.preview_images
  },

  methods: {
    onChange (index) {
      this.swipeNum = index
    },
    showPopup (text) {
      this.buttonText = text
      this.show = true
    },
    closePopup () {
      this.countBoxNum = 1
    },
    async addCart () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '您还没登录，请先登录重新试试吧',
          cancelButtonText: '再逛逛',
          confirmButtonText: '去登录'
        })
          .then(() => {
            this.$router.push({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return
      }
      if (this.buttonText === '加入购物车') {
        const params = {
          goodsId: this.getProductId,
          goodsNum: this.countBoxNum

        }
        const data = await addCart(params)
        this.$store.commit('cart/setCartTotalInfo', {
          badge: data.data.total_goods_num
        })
        this.show = false
      } else {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'buyNow',
            goodsIds: this.getProductId,
            goodsNum: this.countBoxNum,
            deliveryType: 10,
            payType: 10
          }
        }).catch(() => {})
      }
    }

  }
}
</script>

<style lang="less" scoped>

.prodetail {
  position: relative;
  padding-top: 46px;
  padding-bottom: 65px;
  background-color: #fafafa;
}
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 375px;
    height: 375px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }

  }

}
.swipe-num {
    position: absolute;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    right: 10px;
    top: 370px;
    border-radius: 25px;
    color:#fff;
    background: rgba(0, 0, 0, 0.1);
  }
  .info {
    display: flex;

    justify-content: space-between;
    margin-top: 18px;
    width: 100%;
    padding: 18px 22px;
    .price {
      display: flex;
      align-items: center;
      .now {
        color: #fa2209;
        font-size: 31px;
        span {
        font-size: 19px;
        }
      }
      .old {
        color: #959595;
        font-size: 19px;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .sold {
      display: flex;
      align-items: flex-end;
      white-space: nowrap;
      font-size: 12px;
      color: #959595;
    }
  }
  .protitle {
    padding: 0 22px;
    p {
    width: 100%;
    font-size: 22px;
   }
  }
  .service {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 22px;
    .left-words {
      display: flex;
      flex-direction: column;
      .van-icon-certificate:before {
        color: #fa2209;
        font-size: 19px;
      }
      span {
        font-size: 19px;
        margin: 5px 11px;
      }
    }
    .right-icon {
      .van-icon-arrow:before {
        font-size: 19px;
        color: #999;
      }

    }
  }

  .comment {
    padding: 18px 22px;
    .comment-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      .left {
        color: #303133;
        font-size: 20px;
      }
      .right {
        display: flex;
        align-items: center;
        color: #777;
        font-size: 16px;
        .van-icon-arrow:before {
          font-size: 20px;
          color: #999;
      }

      }
    }
    .comment-list {
      padding: 11px 3px;
      margin-bottom: 7px;
      border-bottom: 1px solid #f5f5f5;
      .comment-item {
        .comment-top {
          display: flex;
          align-items: center;
          img {
            width: 37px;
            height: 37px;
            margin-right: 7px;
            border-radius: 50%;
          }
          .name {
            margin-right: 7px;
            font-size: 17px;
          }

        }
        .comment-content {
          margin: 17px 0;
          font-size: 19px;
          color: #333;
        }
        .comment-time {
          font-size: 17px;
          color: #999;
        }
      }

    }
  }
  .description {
    margin-top: 18px;
    .description-title {
      padding: 19px 22px;
      font-size: 20px;
    }
    .description-img {
      img {
        width: 375px;
      }
    }
  }
  ::v-deep .van-goods-action {
    height: 65px;

  }
  ::v-deep .van-goods-action-icon__icon {
    font-size: 30px;
  }
  .van-goods-action-icon {
    font-size: 14px;
    font-weight: 500;
    color: #000;
  }
  .info,
  .protitle,
  .comment,
  .description {
    background-color: #fff;
  }
.cart-item {
  padding: 22px 18px;
  .cart {
    display: flex;
    margin-bottom: 29px;
      img {
        width: 134px;
        height: 134px;
      }
      .shopping {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 26px 7px 20px;
        .price {
          font-size: 35px;
          color: #fe560a;
          margin-bottom: 7px;
        }
        .stock {
          font-size: 17px;
          color: #525252;
          margin-bottom: 10px;
        }
      }
  }
  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    span {
      font-size: 20px;
      color: #303133;
    }

  }
  .checkout {
    display: flex;
    justify-content: center;
    .checkout-btn {
      margin-top: 30px;
      width: 320px;
      height: 59px;
      background: linear-gradient(to right,#ffd01e,#ff8917);
      border: none;
      border-radius: 28px;
      color: #fff;
    }
    .checkout-btn-done {
      margin-top: 30px;
      width: 320px;
      height: 59px;
      background-color: #ccc;
      border: none;
      border-radius: 28px;
      color: #fff;

    }
  }
  .checkout-btn-active {
      background: linear-gradient(to right,#ff6034,#ee0a24) !important;
  }

}
</style>
