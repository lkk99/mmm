const Layout = () => import('@/layout/index.vue')
const User = () => import('@/views/users/index.vue')

export default [
  {
    path: '/users',
    component: Layout,
    name: 'users',
    meta: {
      title: '个人中心',
    },
    icon: 'user',
    children: [
      {
        path: '',
        name: 'userIndex',
        component: User,
        meta: {
          title: '个人中心'
        },
      },
    ],
  },
]