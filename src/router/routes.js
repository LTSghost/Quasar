
const routes = [
  {
    path: '/login',
    component: () => import('pages/AccountLogin.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout2.vue')
  },
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
      { path: 'prac1_result', component: () => import('pages/pracOne_result.vue') }
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
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "pages/Practice1.vue", component: () => import('pages/pracOne.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pages/Practice2.vue', component: () => import('pages/pracTwo.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pages/Practice3.vue', component: () => import('pages/pracThr.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pages/Practice4.vue', component: () => import('pages/pracFour.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pages/Test1.vue', component: () => import('components/IsTest.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pages/Test2.vue', component: () => import('pages/pracTest.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'exer2Sol', component: () => import('pages/Practice2-1.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'exer2Sol_Result', component: () => import('pages/PracticeResult2-1.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'exer2Sol2', component: () => import('pages/Practice2-2.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'questionnaire', component: () => import('pages/QuestionnaireForm.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'questionnaireBegin', component: () => import('pages/QuestionnaireFormBegin.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'questionnaire2', component: () => import('pages/QuestionnaireForm2.vue') }
    ]
  },


  // MainLayout2
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'UserSet', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'RoleSet', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'MenuSet', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice1-1', component: () => import('pages/pracOne.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice1-2', component: () => import('pages/pracTwo.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice1-3', component: () => import('pages/pracThr.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice1-4', component: () => import('pages/pracFour.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice2-1', component: () => import('pages/pracOne.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice2-2', component: () => import('pages/pracFour.vue') }
    ]
  },
  {
    path: '/Practice3-1',
    component: () => import('pages/AccountLogin.vue')
  },
  {
    path: '/Practice3-2',
    component: () => import('layouts/MainLayout2.vue')
  },
  { 
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: 'Practice3-3', component: () => import('pages/merchMaintain.vue') }
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
