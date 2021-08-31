<template></template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PropType } from 'vue';

@Options({
  name: 'hello',
  props: {
    // prop类型转换
    msg: String as PropType<string>
  },
  data() {
    return {}
  },
  components: {}
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<style scoped lang="scss">
</style>
