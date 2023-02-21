<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="theme ? '' : 'bg-grey-6'">
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
          {{ $t('toolbarTitle') }}
        </q-toolbar-title>

        <q-select
            v-model="locale"
            :options="localeOptions"
            :label="$t('chooseLanguage')"
            dense
            borderless
            emit-value
            map-options
            options-dense
            style="width: 150px;"
          />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <!-- <q-btn flat color="white" :icon="theme ? 'dark_mode' : 'light_mode'" label="" @click="themeChange" /> -->
        <q-toggle
          v-model="second"
          color="yellow"
          :icon="theme ? 'light_mode' : 'dark_mode'"
        />
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
          class="border"
        >
        {{ $t('toolbarLinks') }}
        </q-item-label>
        <q-separator color="grey" />
        
        <!-- expand-icon-class="text-black" -->
        <q-expansion-item
          
          icon="link"
          :label="$t('MainLayoutLink1')"
          style=" color: black;"
        >

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
        <q-separator color="grey" />

        <q-expansion-item
          icon="code"
          :label="$t('MainLayoutLink2')"
        >  
          <EssentialLink
              v-for="link in exercise1Links"
              :key="link.title"
              v-bind="link"
            />
        </q-expansion-item>
        <q-separator color="grey" />

        <q-expansion-item
          default-opened
          icon="code"
          :label="$t('MainLayoutLink3')"
        >
          <MyQitemExpansion/>
        </q-expansion-item>
        <q-separator color="grey" />

        <q-expansion-item
          expand-separator
          icon="tips_and_updates"
          :label="$t('MainLayoutLink4')"
        >
          <EssentialLink
            v-for="link in exercise2SolLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, watch } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import MyQitemExpansion from 'components/MyQitemExpansion.vue'
import IsTest  from 'components/IsTest.vue'
import { useI18n } from 'vue-i18n'
import enUS from 'src/i18n/en-US'
import zhTW from 'src/i18n/zh-TW'

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
  {
    title: 'exer2Sol',
    caption: 'exer2Sol',
    icon: 'tips_and_updates',
    link: '/exer2Sol'
  },
  {
    title: 'exer2Sol2',
    caption: 'exer2Sol2',
    icon: 'tips_and_updates',
    link: '/exer2Sol2'
  },
  {
    title: 'questionnaire',
    caption: 'questionnaire',
    icon: 'dynamic_form',
    link: '/questionnaire'
  },
]

const exercise1Links = []
linksList.forEach(element => {
  // console.log(element.link);
  if (['/prac1','/prac2','/prac3'].includes(element.link)) {
    exercise1Links.push(element)
  }
});

const exercise2SolLinks = []
linksList.forEach(element => {
  if (['/exer2Sol','/exer2Sol2'].includes(element.link)) {
    exercise2SolLinks.push(element)
  }
})

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    MyQitemExpansion
  },

  setup () {
    const $q = useQuasar()
    const { locale } = useI18n({ useScope: 'global' })
    const leftDrawerOpen = ref(false)
    const theme = ref(true)
    const themeChange = () => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      theme.value = !theme.value
      $q.dark.toggle()
      return 0
    }
    const second = ref(true)
    watch(()=> second.value == false, val =>{
        theme.value = !theme.value
        $q.dark.toggle()
    })

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'zh-TW', label: '繁體中文' }
      ],
      second,
      essentialLinks: linksList,
      leftDrawerOpen,
      theme,
      themeChange,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      exercise1Links,
      exercise2SolLinks
    }
  }
})
</script>

<style>
  .body--light{

  }
  .body--dark{
    background-color: black;
    color:white;
  }
</style>