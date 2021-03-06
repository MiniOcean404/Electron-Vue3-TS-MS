import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import(/* webpackChunkName: "Home" */ 'views/home/Home')
const Task = () => import(/* webpackChunkName: "Task" */ 'views/task/Task')
const jdTime = () => import(/* webpackChunkName: "jdTime" */ 'views/server-time/server-time')

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/task',
		name: 'task',
		component: Task,
	},
	{
		path: '/jdTime',
		name: 'jdTime',
		component: jdTime,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
