import { orderSubmit } from 'api/order'
export const columns = [
	{
		title: '商品图', //标题
		dataIndex: 'imageSrc', //要取值的属性名
		slots: { customRender: 'img' } //自定义复杂slot，带scope
	},
	{
		dataIndex: 'name',
		key: 'name',
		slots: { customRender: 'name', title: 'customTitle' }
	},
	{
		title: 'skuId',
		dataIndex: 'skuId',
		key: 'skuId'
	},
	{
		title: '时间',
		dataIndex: 'buyDate',
		key: 'buyDate'
	},
	{
		title: '行为',
		width: 150,
		slots: { customRender: 'action' }
	}
]

export const actions = new Map([
	['Spike', orderSubmit],
	['Reservation', orderSubmit]
])
