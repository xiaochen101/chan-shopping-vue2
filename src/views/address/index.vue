<template>
    <div class="address">
        <van-nav-bar title="收货地址" @click-left="$router.go(-1)" left-arrow  />
        <div class="address-info" v-if="list.length > 0">
           <van-address-list @select="change"  @add="onAdd" @edit="onEdit" v-model="chosenAddressId" :list="list"  default-tag-text="默认"/>
        </div>
        <!-- 空地址列表 -->
        <div class="address-empty" v-else>
          <van-empty description="地址为空，去添加吧">
            <van-button @click="$router.push('/addList')" round type="danger" class="bottom-button">新增地址</van-button>
          </van-empty>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import { setDefaultAddress } from '@/api/address'
export default {
  data () {
    return {
      chosenAddressId: '',
      list: []
    }
  },
  created () {
    this.getAddressList()
  },
  computed: {
    ...mapState('address', ['addressList'])
  },
  methods: {
    onAdd () {
      this.$router.push('/addList')
    },
    onEdit (content) {
      this.$router.push({
        path: '/editAddress',
        query: { id: content.id }
      })
    },
    async getAddressList () {
      if (this.$store.getters.token) {
        await this.$store.dispatch('address/getaddressActions')
      }
      if (this.addressList && this.addressList.address_list) {
        const newAddressList = this.addressList.address_list.map(item => {
          const fullAddress = [
            item.province,
            item.city,
            item.district,
            item.detailed_address
          ].join('')
          return {
            id: String(item.id),
            name: item.receiver_name,
            tel: item.receiver_phone,
            address: fullAddress,
            isDefault: item.is_default
          }
        })
        this.list = newAddressList
        const defaultAddress = newAddressList.find(item => item.isDefault)
        if (defaultAddress) {
          this.chosenAddressId = defaultAddress.id
        } else if (newAddressList.length > 0) {
          this.chosenAddressId = newAddressList[0].id
        }
      }
    },
    async change (item) {
      await setDefaultAddress({
        address_id: item.id
      })
      this.getAddressList()
    }
  }

}
</script>

<style lang="less" scoped>
.van-address-list__bottom {
    background-color: transparent;
}
.bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
