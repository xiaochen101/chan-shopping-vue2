<template>
  <div class="list">
    <van-nav-bar title="编辑收货地址" @click-left="$router.go(-1)" left-arrow  />
    <van-address-edit @save="onSave" @delete="onDelete" :address-info="addressInfo"  show-delete show-set-default  :area-list="areaList" />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { mapState } from 'vuex'
import { updateAddress, deleteAddress } from '@/api/address'
export default {
  data () {
    return {
      areaList,
      addressInfo: {}
    }
  },
  computed: {
    ...mapState('address', ['addressList'])
  },
  created () {
    this.echo()
  },
  methods: {
  // 回显
    async echo () {
      if (this.$store.getters.token) {
        await this.$store.dispatch('address/getaddressActions')
      }
      const addressId = this.$route.query.id
      const addressList = this.addressList.address_list
      const editAdress = addressList.find(item => String(item.id) === addressId)

      // 获取省编码/城市编码/地区编码
      const getAreaCode = (list, name) => {
        for (const key in list) {
          if (list[key] === name) {
            return key
          }
        }
        return ''
      }

      // 调用函数获取编码
      const provinceCode = getAreaCode(areaList.province_list, editAdress.province)
      const cityCode = getAreaCode(areaList.city_list, editAdress.city)
      const countyCode = getAreaCode(areaList.county_list, editAdress.district)

      // 拼接编码
      const areaCode = `${provinceCode} ${cityCode} ${countyCode}`

      this.addressInfo = {
        id: editAdress.id,
        name: editAdress.receiver_name,
        tel: editAdress.receiver_phone,
        province: editAdress.province,
        city: editAdress.city,
        county: editAdress.district,
        addressDetail: editAdress.detailed_address,
        areaCode: areaCode,
        isDefault: editAdress.is_default
      }
    },
    async onSave (content) {
      await updateAddress(
        {
          address_id: content.id,
          receiver_name: content.name,
          receiver_phone: content.tel,
          province: content.province,
          city: content.city,
          district: content.county,
          detailed_address: content.addressDetail,
          is_default: content.isDefault
        }
      )
      this.$toast('更新地址成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    },
    async onDelete (content) {
      await deleteAddress({
        address_id: content.id
      })
      this.$toast('删除地址成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    }
  }

}
</script>

<style>

</style>
