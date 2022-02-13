const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '/class',
    component: Layout,
    name: 'class',
    meta: {
      title: '商品分类',
    },
    icon: 'example',
    children: [
      {
        path: 'index',
        name: 'classIndex',
        icon: 'nested',
        component: () => import('@/views/class/index.vue'),
        meta: {
          title: '列表'
        },
      },
      {
        path: 'create',
        name: 'classCreate',
        icon: 'form',
        component: () => import('@/views/class/create.vue'),
        meta: {
          title: '新增'
        },
      },
      {
        path: 'edit/:id?',
        name: 'classEdit',
        icon: 'form',
        component: () => import('@/views/class/edit.vue'),
        meta: {
          title: '编辑'
        },
        hidden:true,
        props:true,
      },
    ],
  },
]