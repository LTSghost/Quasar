
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'test4', component: () => import('pages/test4.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'prac1', component: () => import('pages/pracOne.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'prac2', component: () => import('pages/pracTwo.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'prac3', component: () => import('pages/pracThr.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'test', component: () => import('src/pages/pracTest.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Sol1', component: () => import('pages/PracticeSol1.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Sol2', component: () => import('pages/PracticeSol2.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Sol3', component: () => import('pages/PracticeSol3.vue') }
    ]
  },
  
  // {
  //   path: '/prac1',
  //   component: () => import('pages/Bprac1.vue')
  // },
  // {
  //   path: '/prac2',
  //   component: () => import('pages/Bprac2.vue')
  // },
  // {
  //   path: '/prac3',
  //   component: () => import('pages/Bprac3.vue')
  // },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
