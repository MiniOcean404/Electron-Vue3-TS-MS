<template>
  <el-button class="login-button" type="primary" @click="loginWindow">登录账号</el-button>
</template>

<script setup lang="ts">
import { defineEmits, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'

const {
  remote: { BrowserWindow }
} = window.require('electron')

const store = useStore()
const emit = defineEmits<{
  (e: 'loginWindow'): void
  (e: 'AlreadyLogin', cookie: string): void
}>()

onBeforeMount(() => { })

function loginWindow() {
  const loginWindow = new BrowserWindow({ width: 1000, height: 800 })
  loginWindow.loadURL('https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F')
  loginWindow.webContents.on('did-navigate', (event, url) => {
    if (url !== 'https://www.jd.com/') return

    loginWindow.webContents.session.cookies
      .get({ domain: '.jd.com' })
      .then((cookies) => {
        const cookie = cookies.reduce((str, cookie) => {
          const { name, value } = cookie
          str += `${name}=${value};`
          return str
        }, '')

        loginWindow.destroy()
        emit('loginEd' as any, cookie)
        ElNotification({ type: 'success', title: '成功', message: '账号已添加' })
      })
      .catch(() => {
        ElNotification({ type: 'error', title: '失败', message: '获取Cookie超时或者出现其他问题' })
      })
  })
}
</script>

<style lang="scss" scoped>
.login-button {
  margin: 10px 0px 20px 20px;
}
</style>
