import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const View = () => import(/* webpackChunkName: "about" */ '../views/Home.vue')

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: View
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
