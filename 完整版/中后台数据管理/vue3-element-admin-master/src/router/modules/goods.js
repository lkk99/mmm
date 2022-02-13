const Layout = () => import('@/layout/index.vue')
// const GoodsList = () => import('@/views/goods/index.vue')
// const GoodsEdit = () => import('@/views/goods/edit.vue')

export default [
  {
    path: '/goods',
    component: Layout,
    name: 'goods',
    meta: {
      title: '商品管理',
    },
    icon: 'example',
    children: [
      {
        path: 'index',
        name: 'goodsIndex',
        icon: 'nested',
        component: () => import('@/views/goods/index.vue'),
        meta: {
          title: '商品列表'
        },
      },
      {
        path: 'create',
        name: 'goodsCreate',
        icon: 'form',
        component: () => import('@/views/goods/create.vue'),
        meta: {
          title: '商品新增'
        },
      },
      {
        path: 'edit/:id?',
        name: 'goodsEdit',
        icon: 'form',
        component: () => import('@/views/goods/edit.vue'),
        meta: {
          title: '商品编辑'
        },
        hidden:true,
        props:true,
      },
    ],
  },
]