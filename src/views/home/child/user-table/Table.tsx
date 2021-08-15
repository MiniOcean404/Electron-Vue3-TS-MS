import { defineComponent, defineEmits, defineProps, computed, reactive, render } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import './index.scss'

export default defineComponent({
  name: 'Table',
  emit: ['deleteAccount'],
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    const store = useStore()
    const isHaveContent = computed(() => props.tableData.length)

    function deleteAccount(scope: any) {
      const index = scope.$index
      const row = scope.row
      store.commit('user/REMOVE_SOME_ONE', index)
      ElNotification({ type: 'success', title: '成功', message: '删除成功' })
    }

    return {
      deleteAccount
    }
  },
  render() {
    const { tableData, deleteAccount } = this

    return (
      <>
        <el-table data={tableData} style="width: 100%" height="90%" border="true">
          <el-table-column prop="name" label="用户名" align="center" />
          <el-table-column prop="isLogin" label="是否登录" align="center" />
          <el-table-column prop="isPlusMember" label="是否会员" align="center" />
          <el-table-column width="100">
            {{
              default: (scope: any) => (
                <el-button type="primary" onClick={deleteAccount.bind(this, scope)}>
                  删除
                </el-button>
              )
            }}
          </el-table-column>
        </el-table>
      </>
    )
  }
})
