const Layout = () => import('@/layout/index.vue')
const ManageList = () => import('@/views/manage/list.vue')
// const ManageCreate = () => import('@/views/manage/create.vue')

export default [
  {
    path: '/manage',
    component: Layout,
    name: 'manage',
    meta: {
      title: '用户列表',
    },
    icon: 'tree',
    children: [
      {
        path: 'list',
        name: 'manageIndex',
        icon: 'nested',
        component: ManageList,
        meta: {
          title: '用户管理'
        },
      },
      // {
      //   path: 'create',
      //   name: 'manageCreate',
      //   icon: 'form',
      //   component: ManageCreate,
      //   meta: {
      //     title: '商品创建'
      //   },
      // },
    ],
  },
]