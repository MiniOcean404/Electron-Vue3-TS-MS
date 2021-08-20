
 <template>
  <div id="content">
    <Menu></Menu>
    <main>
      <router-view class="main"></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import Menu from 'components/Menu.vue'

const emit = defineEmits(['goBack'])
const goBack = () => {
  console.log('go back')
}
</script>

<style lang="scss">
body,
html,
#app,
#content {
  -webkit-app-region: drag; //告诉electron那些在无边框下可以拖拽
  width: 100%;
  height: 100%;
}
#content {
  display: flex;
  main {
    width: 100%;
  }
}
</style>
