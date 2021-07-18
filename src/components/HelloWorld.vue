<template></template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
	name: 'hello',
	props: {
		msg: String
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

<style scoped lang="scss"></style>
