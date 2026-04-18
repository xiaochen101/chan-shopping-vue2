<template>
    <div class="btn"><button class="sub" @click="handleSub" :class="{'minInputValueActive': isInputMinvalue}">-</button>
    <input type="text" :value="value" @change="handleInputChange">
    <button class="adds" @click="handleAdd">+</button></div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      this.$emit('input', Math.max((this.value - 1), 1))
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleInputChange (e) {
      const inputNum = +e.target.value
      const finalNum = isNaN(inputNum) || inputNum < 1 ? this.value : inputNum
      this.$emit('input', finalNum)
    }
  },
  computed: {
    isInputMinvalue () {
      return this.value === 1
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
      display: flex;
      align-items: center;
      button {
        width: 44px;
        height: 37px;
        background-color: #f2f3f5;
        font-size: 26px;
        color: #323233;
        text-align: center;
        line-height: 37px;
        border: none;
      }
      .minInputValueActive {
        color: #c8c9cc !important;
        background: #f7f8fa !important;
      }
      input {
        border: none;
        margin: 0 7px;
        width: 59px;
        height: 37px;
        text-align: center;
        line-height: 37px;
        background-color: #f2f3f5;
      }
    }
</style>
