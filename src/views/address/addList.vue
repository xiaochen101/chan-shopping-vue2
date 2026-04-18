<template>
  <div class="list">
    <van-nav-bar title="新增收货地址"  @click-left="$router.go(-1)" left-arrow  />
    <van-address-edit   show-set-default   @save="onSave" :area-list="areaList" />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { addAddress } from '@/api/address'
export default {
  data () {
    return {
      areaList
    }
  },
  methods: {
    async onSave (content) {
      await addAddress(
        {
          receiver_name: content.name,
          receiver_phone: content.tel,
          province: content.province,
          city: content.city,
          district: content.county,
          detailed_address: content.addressDetail,
          is_default: content.isDefault
        }
      )
      this.$toast('新增地址成功')
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    }

  }

}
</script>

<style>

</style>
