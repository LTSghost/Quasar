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
            >
                <template v-slot:prepend>
                    <q-icon name="language"></q-icon>
                </template>
            </q-select>

            <!-- <div>Quasar v{{ $q.version }}</div> -->
            <!-- <q-btn flat color="white" :icon="theme ? 'dark_mode' : 'light_mode'" label="" @click="themeChange" /> -->
            <q-toggle
            v-model="second"
            color="yellow"
            :icon="theme ? 'light_mode' : 'dark_mode'"
            />

            <q-btn-dropdown
            dropdown-icon="change_history"
            :icon="dropdownIMG"
            :rounded="true"
            class="glossy"
            color="skyBlue"
            >
            <div class="row no-wrap q-pa-md">

                <div class="column">
                <div class="text-h6 q-mb-md">{{ $t('currentAccount') }}</div>
                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ $t('MainAccount') }} <span>{{ loginUser }}</span></div>
                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ $t('MainAccountName') }} <span>{{ loginUserName }}</span></div>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                <q-avatar size="72px">
                    <img src="~assets/traing_teemo.svg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs"></div>

                <q-btn
                    color="primary"
                    :label="$t('logOut')"
                    push
                    size="sm"
                    @click="logOut"
                    v-close-popup
                />
                </div>
            </div>
            </q-btn-dropdown>

        </q-toolbar>
        </q-header>

        <!-- show-if-above --> 
        <q-drawer
            v-model="leftDrawerOpen"
            style="background-color:#009688"
            bordered
        >
        <q-list>
            <q-item-label
                header
                class="border"
                style="color: aliceblue;"
            >
                {{ $t('toolbarLinks') }}
            </q-item-label>
            <q-separator color="grey" />
            
            <!-- 原始連結 -->
            <!-- <q-expansion-item
            
            :icon="menuIcon1"
            :label="$t('MainLayoutLink1')"
            style=" color: black;"
            >

            <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
            />
            </q-expansion-item>
            <q-separator color="grey" /> -->
            <!-- 練習1 -->
            <!-- <q-expansion-item
            icon="code"
            :label="$t('MainLayoutLink2')"
            >  
            <EssentialLink
                v-for="link in exercise1Links"
                :key="link.title"
                v-bind="link"
                />
            </q-expansion-item>
            <q-separator color="grey" /> -->
            <!-- 練習2 -->
            <!-- <q-expansion-item
            default-opened
            icon="code"
            :label="$t('MainLayoutLink3')"
            >
            <MyQitemExpansion/>
            </q-expansion-item>
            <q-separator color="grey" /> -->
            <!-- 練習3 -->
            <!-- <q-expansion-item
            expand-separator
            icon="tips_and_updates"
            :label="$t('MainLayoutLink4')"
            >
            <EssentialLink
                v-for="link in exercise2SolLinks"
                :key="link.title"
                v-bind="link"
            />
            </q-expansion-item> -->


            <div v-for="(item,index) in data" :key="index">
            <q-expansion-item
              :icon="item.ICON"
              :label=item.MENU_NAME
              style="background-color:#009688; color: white;"
              expand-icon-class="text-white"
            >
                <MySqlChildExpansion 
                    v-if="item.children"
                    :childs="item.children"
                >

                </MySqlChildExpansion>
            </q-expansion-item>

            </div>
            <q-separator color="grey"/>

        </q-list>
        </q-drawer>

        <q-page-container>
        <router-view />
        </q-page-container>

        <!-- MENU_NAME = {{ name }}
        <br>
        {{ data }} -->
        
    </q-layout>

    <!-- {{ name }} -->

</template>
  
<script setup>
import { useQuasar } from 'quasar'
import { reactive, ref, watch, onMounted, onBeforeMount, watchEffect, onBeforeUpdate } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import MyQitemExpansion from 'components/MyQitemExpansion.vue'
import IsTest  from 'components/IsTest.vue'
import { useI18n } from 'vue-i18n'
import enUS from 'src/i18n/en-US'
import zhTW from 'src/i18n/zh-TW'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios';
import MySqlChildExpansion from 'src/components/MySqlChildExpansion.vue'



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
    link: '/questionnaireBegin'
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

const paramObj = reactive({
    MENU_ID: "",
    MENU_NAME: "",
    P_MENU_ID: ""
})

const dynamicStyle = reactive([{
  color:"red",
  fontSize: "14px",
  transition: "ease-in-out 0.2s"
},
{
  color:"red",
  fontSize: "14px",
  transition: "ease-in-out 0.2s"   
}])

const name = ref("")
const data = ref("")

console.log(data);
// console.log(data[0]);
console.log(name);


console.log(dynamicStyle);


    
const dropdownIMG = "img:http://localhost:8080/img/traing_teemo.fe480e78.svg"
const $router = useRouter()
const $store = useStore()
const loginUser = ref($store.state.showcase.loginUser)
const loginUserName = ref($store.state.showcase.loginUserName)
const $q = useQuasar()
const { t,locale } = useI18n({ useScope: 'global' })
const leftDrawerOpen = ref(false)
const theme = ref(true)

const logOut = () => {
    userChange('GUEST')
    nameChange('GUEST')
    $router.push('/login')
}



// watchEffect(()=>{
//     name.value = t('systemManage')
//     console.log(name);
// })
// watch(data,()=>{
//     console.log(data.value[0].MENU_NAME);   
//   },
//   { deep : true}
// )



// action vuex
const userChange = (userId) => {
    $store.dispatch('showcase/updateUser', userId)
}
const nameChange = (userName) => {
    $store.dispatch('showcase/updateUserName', userName)
}


const second = ref(true)
watch(()=> second.value == false, () =>{
    theme.value = !theme.value
    $q.dark.toggle()
})

// post/(per locale)
watchEffect(()=>{
    locale.value
    axios
    .post(process.env.env_API + "/VueTest/QueryMenuInfo", paramObj)
    .then((res) => {
    if (res.status == "200") {
        
        // name.value = res.data[0].MENU_NAME + " " + res.data[1].MENU_NAME

        // res.data.forEach((v,i)=>{
        //     data.push(v)
        // })
        

        res.data[0].MENU_NAME = t('systemManage')
        res.data[0].children[0].MENU_NAME = t('userSet')
        res.data[0].children[1].MENU_NAME = t('roleSet')
        res.data[0].children[2].MENU_NAME = t('menuSet')
        res.data[1].MENU_NAME = t('practice1')
        res.data[1].children[0].MENU_NAME = t('practice1_1')
        res.data[1].children[1].MENU_NAME = t('practice1_2')
        res.data[1].children[2].MENU_NAME = t('practice1_3')
        res.data[1].children[3].MENU_NAME = t('practice1_4')
        res.data[2].MENU_NAME = t('practice2')
        res.data[2].children[0].MENU_NAME = t('practice2_1')
        res.data[2].children[1].MENU_NAME = t('practice2_2')
        res.data[3].MENU_NAME = t('practice3')
        res.data[3].children[0].MENU_NAME = t('practice3_1')
        res.data[3].children[1].MENU_NAME = t('practice3_2')
        res.data[3].children[2].MENU_NAME = t('practice3_3')
        // console.log(res.data[0].MENU_NAME);

        data.value = res.data

        console.log(res.data[0]);
        // console.log(data[0][0].MENU_NAME);

    } else {
        popErrMsg("not found")
    }
})
.catch((error)=>{
    console.error(error.message)
    popErrMsg("not found")
})
})


const localeOptions = reactive([
    { value: 'en-US', label: 'English' },
    { value: 'zh-TW', label: '繁體中文' }
])

const toggleLeftDrawer = () => {
    console.log($store.state.showcase.loginUser);
    if ($store.state.showcase.loginUser == 'GUEST') {
        $q.notify({
            message: "請先登入帳號",
            color: "red",
            position: "bottom",
            timeout: 1000,
        })
        $router.push('/login')
    } else {
        leftDrawerOpen.value = !leftDrawerOpen.value
    }
}

// detect language
watch(locale,()=>{  
    console.log(locale.value)
    localStorage.setItem('locale', locale.value)
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