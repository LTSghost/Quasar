<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar Practice
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'just back home',
    icon: 'home',
    link: '/'
  },
  // {
  //   title: 'Github',
  //   caption: 'github.com/quasarframework',
  //   icon: 'code',
  //   link: 'https://github.com/quasarframework'
  // },
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev'
  // },
  {
    title: 'Practice1',
    caption: 'Quasar Validation',
    icon: 'check_circle',
    link: '/prac1'
  },
  {
    title: 'Practice2',
    caption: 'Merchandise search/maintain',
    icon: 'shopping_cart',
    link: '/prac2'
  },
  {
    title: 'Practice3',
    caption: 'read JSON and display',
    icon: 'library_books',
    link: '/prac3'
  },
  {
    title: 'test',
    caption: 'test',
    icon: 'quiz',
    link: '/test'
  },
  {
    title: 'Sol1',
    caption: 'Sol1',
    icon: 'tips_and_updates',
    link: '/Sol1'
  },
  {
    title: 'Sol2',
    caption: 'Sol2',
    icon: 'tips_and_updates',
    link: '/Sol2'
  },
  {
    title: 'Sol3',
    caption: 'Sol3',
    icon: 'tips_and_updates',
    link: '/Sol3'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
