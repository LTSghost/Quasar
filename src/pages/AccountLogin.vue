<template>
    <q-layout view="lHh Lpr lFf">
        <q-header reveal elevated :class="theme ? '' : 'bg-grey-6'">
            <div class="row">
            <q-toolbar
                class="col-12"
            >
                <q-space />
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

                <q-toggle
                v-model="second"    
                color="yellow"
                :icon="theme ? 'light_mode' : 'dark_mode'"
                />

            </q-toolbar>
            </div>
        </q-header>

        <div class="row" style="height: 100vh">
            <div class="col-0 col-md-3 flex justify-center content-center">
            <!-- <img src="~assets/login.svg" class="responsive" alt="login-image"> -->
            </div>
            <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
                class="col-12 col-md-6 flex content-center">
            <q-card v-bind:style="$q.screen.lt.sm ? {'width': '80%'} : {'width': '50%'}">
                <q-card-section>
                    <q-avatar size="103px" class="absolute-center shadow-10">
                        <img src="~assets/traing_teemo.svg" alt="avatar">
                    </q-avatar>
                </q-card-section>
                <q-card-section>
                <div class="q-pt-lg">
                    <div class="col text-h6 ellipsis flex justify-center">
                    <h2 class="text-h5 text-uppercase q-my-none text-weight-regular">Vue {{ $t('toolbarTitle') }}</h2>
                    </div>
                </div>
                </q-card-section>
                <q-card-section>
                <q-form class="q-gutter-md" @submit.prevent="postAxios">
                    <!-- userid -->
                    <q-input 
                        ref="idRef"
                        lazy-rules
                        :label="$t('pracOneAccount')"
                        v-model="userid"
                        :rules="idRules"
                        >
                        <template v-slot:append>
                            <q-icon name="person"></q-icon>
                        </template>
                    </q-input>
                    <!-- userPassword -->
                    <q-input 
                        ref="pwdRef"
                        lazy-rules
                        :label="$t('pracOnePassword')" 
                        v-model="password"
                        :rules="passwordRules"
                        :type="isPwd? 'password' : 'text'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                                
                            >
                            </q-icon>
                        </template>
                    </q-input>
                    <div>
                    <q-btn class="full-width" color="primary" :label="$t('Login')" type="submit" rounded></q-btn>
                    <!-- <div class="text-center q-mt-sm q-gutter-lg">
                        <router-link class="text-white" to="/login">Esqueceu a senha?</router-link>
                        <router-link class="text-white" to="/login">Criar conta</router-link>
                    </div> -->
                    </div>
                </q-form>
                </q-card-section>
            </q-card>
            </div>
        </div>

    </q-layout>


</template>

<script setup>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { ref, reactive, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

onMounted(() => {
    if ( !sessionStorage.getItem('id') ) {
        console.log("沒有ID   RRRR");
        
        sessionStorage.setItem('theme','true')
        sessionStorage.setItem('id','GUEST')
        sessionStorage.setItem('name','GUEST')
        sessionStorage.setItem('pwd','GUEST')
    } else {
        console.log("有ID了");
    }

    if (sessionStorage.getItem('theme') == 'true') {
        theme.value = true
        second.value = true
    } else {
        theme.value = true
        second.value = false
    }
})

const $store = useStore()
const $q = useQuasar()
const $router = useRouter()
const { t,locale } = useI18n()

const theme = ref(true)
const second = ref(true)
const isPwd = ref(true)
const localeOptions = [
        { value: 'en-US', label: 'English' },
        { value: 'zh-TW', label: '繁體中文' }
      ]



const userid = ref('admin')
const idRef = ref(null)

const password = ref('quasar')
const pwdRef = ref(null)

const idRules = [
  val => !!val || t('LoginIdRules'),
//   val => (5 < val.length && val.length < 19) || '請輸入6-18字符',
//   val => (/^[a-zA-Z][0-9_a-zA-Z]{1,17}$/.test(val)) || "只能包含數字,字母,下劃線且得字母開頭"
]
const passwordRules = [
  val => !!val || t('LoginPwdRules'),
//   val => (5 < val.length && val.length < 19) || '請輸入6-18字符',
//   val => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+/.test(val)) || "請輸入英文及數字組合，須包含英文大寫跟小寫"
  // (?=.*[a-z]) 需包含小寫
  // (?=.*[A-Z]) 需包含大寫
  // (?=.*\d)    需包含數字
]

const paramObj = reactive({
    USER_ID: userid,
    PASSWORD: password
})

const popErrMsg = (msg) => {
    console.log(msg)
}

const postAxios = () => {
  axios
    // .post(process.env.env_API + "/VueTest/Login", paramObj)
    .post("http://localhost:8083/api/v1/sys_user/validate", paramObj)
    .then((res) => {
        console.log(res);
    if (res.status == "200") {
        if (res.data.Status == "Y") {
            console.log(res.data.User)

            userChange(res.data.User.USER_ID)
            nameChange(res.data.User.USER_NAME)

            sessionStorage.setItem('id', res.data.User.USER_ID)
            sessionStorage.setItem('name', res.data.User.USER_NAME)
            sessionStorage.setItem('pwd', res.data.User.PASSWORD)

            $router.push("/home").then((e) => {
                $q.notify({
                    // message: res.data.Message,
                    message: t('LoginSuccess'),
                    color: "green",
                    position: "bottom",
                    timeout: 1000,
                })
            })
        } else {
            console.log("is error");
            $q.notify({
                    // message: res.data.Message,
                    message: res.data.Message,
                    color: "red",
                    position: "bottom",
                    timeout: 1000,
                })
            popErrMsg(res.data.Message)
        }
    } else {
        popErrMsg("帳號或密碼錯誤")
    }
  })
  .catch((error)=>{
    console.error(error.message)
    popErrMsg("帳號或密碼錯誤")
  })
}



// action vuex
const userChange = (userId) => {
    $store.dispatch('showcase/updateUser', userId)
}
const nameChange = (userName) => {
    $store.dispatch('showcase/updateUserName', userName)
}

// detect theme
// watch(()=> second.value == false, val =>{
//     theme.value = !theme.value
//     $q.dark.toggle()
// })

watch(second, ()=>{
    if (sessionStorage.getItem('theme') == 'true') {
        sessionStorage.setItem('theme','false')
    } else {
        sessionStorage.setItem('theme','true')
    }

    theme.value = !theme.value
    $q.dark.toggle()
})

// detect language
watch(locale,()=>{  
    console.log(locale.value)
    localStorage.setItem('locale', locale.value)
})


const testtt = () => {
    console.log("test testtt");
    axios
    .get("http://localhost:8080/api/v1/sys_menu")
    .then((res) => {
        if (res.status == "200") {

            console.log("responseData = ",res.data);

           
        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
}
testtt()

</script>