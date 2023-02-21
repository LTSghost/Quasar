<template>

  <q-page>
    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
      <!-- ac pwd -->
      <div class="row">
        <!-- account -->
          <div class="col q-pl-xl q-pt-xl q-pr-sm q-pb-xs">
            <q-input
            ref="accountRef"
            filled
            lazy-rules
            :label="$t('pracOneAccount')"
            v-model="account"
            :rules="accountRules">
              <template v-slot:append>
                <q-icon name="person"></q-icon>
              </template>
            </q-input>
            
          </div>
          <!-- pwd -->
          <div class="col q-pl-sm q-pt-xl q-pr-xl q-pb-xs">
            <q-input
            ref="pwdRef"
            filled
            lazy-rules
            :label="$t('pracOnePassword')"
            :rules="passwordRules"
            :type="isPwd? 'password' : 'text'"
            v-model="password">
              <template v-slot:append>
                <q-icon
                :name="isPwd? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"></q-icon>
              </template>
            </q-input>
          </div>
      </div>
      <!-- school gradDate -->
      <div class="row">
          <!-- school -->
          <div class="col q-pl-xl q-pt-xs q-pr-sm q-pb-xs"> 
            <q-select
              ref="schoolRef"
              filled
              lazy-rules
              clearable 
              v-model="school" 
              :options="schOpt"
              :label="$t('pracOneSchool')"
              :rules="[val => !!val || '請選擇畢業學校']"
            />
          </div>
          <!-- graduate_date -->
          <div class="col q-pl-sm q-pt-xs q-pr-xl q-pb-xs"> 
            <q-input
              ref="gradDateRef"
              filled
              lazy-rules
              :label="$t('pracOneGradDate')"
              v-model="gradDate"
              placeholder="年/月/日"
              :rules="[(val) => !!val || '請輸入日期']"
              :error="form.gradDate.error"
              :error-message="form.gradDate.msg"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="gradDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
      </div>
      <!-- age email -->
      <div class="row">
          <!-- age -->
          <div class="col q-pl-xl q-pt-xs q-pr-sm q-pb-xs">
            <q-input
              ref="ageRef"
              filled
              lazy-rules
              :label="$t('pracOneAge')"
              v-model="age"
              :rules="ageRules"
              :error="form.age.error"
              :error-message="form.age.msg"
            >
            </q-input>
          </div>
          <!-- email -->
          <div class="col q-pl-sm q-pt-xs q-pr-xl q-pb-xs">
            <q-input
              ref="emailRef"
              filled
              lazy-rules
              :label="$t('pracOneEmail')"
              v-model="email"
              :rules="emailRules"
              :error="form.email.error"
              :error-message="form.email.msg"
            >
            </q-input>
          </div>
      </div>
      <!-- mobile -->
      <div class="row">
          <!-- mobile -->
          <div class="col-6 q-pl-xl q-pt-xs q-pr-sm">
            <q-input
              ref="mobileRef"
              filled
              lazy-rules
              :label="$t('pracOneMobile')"
              v-model="mobile"
              :rules="mobileRules"
              :error="form.mobile.error"
              :error-message="form.mobile.msg"
            >
            </q-input>
          </div>
      </div>
      <!-- login allowTerm -->
      <div class="q-pa-md fit row wrap justify-center items-start content-start">
          <q-toggle font="text-weight-bold" :label="$t('pracOneLicence')" v-model="toggleValue" color="blue" />
      </div>
      <div class="q-pa-md fit row wrap justify-center items-start content-start">
        <div>
          <q-btn color="primary" type="submit" :label="$t('pracOneSubmit')"/>
          <q-btn class="q-ml-sm" type="reset" color="white" text-color="blue" :label="$t('pracOneReset')"/>
        </div>
      </div>
    </form>
  </q-page>
</template>

<script setup>
import { useQuasar, Loading } from 'quasar';
import { useRouter } from 'vue-router';
import { ref, reactive, watch, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const $store = useStore()
const $q = useQuasar()
const router = useRouter()
const { t, locale } = useI18n()

const toggleValue = ref(false)
const isPwd = ref(true)

// if reference vuex state will turning back the same state
// const account = ref($store.state.showcase.account)

// give default state
const account = ref('abcdefg123456_')
const accountRef = ref(null)
account.value = $store.state.showcase.account

const password = ref($store.state.showcase.password)
const pwdRef = ref(null)

const school = ref($store.state.showcase.school)
const schoolRef = ref(null)

const gradDate = ref($store.state.showcase.gradDate)
const gradDateRef = ref(null)

const age = ref($store.state.showcase.age)
// const age = ref(18)
const ageRef = ref(null)

const email = ref($store.state.showcase.email)
const emailRef = ref(null)

const mobile = ref($store.state.showcase.mobile)
const mobileRef = ref(null)

const date = ref("")

const form = reactive({
  account: {
    value:$store.state.showcase.account,
    ref:null
    // value:"",
    // account:true,
    // required:true
  },
  password: {
    value:"a12345B",
    // value:null,
    required:true
  },
  school: {
    value:"",
    // value:null,
    required:true
  },
  gradDate: {
    value:"年/月/日",
    required:true
  },
  age: {
    value:"18",
    // value:null,
    required:true
  },
  email: {
    value:"JohnnieCena.k.lll@gmail__132as.dff",
    // value:null,
    required:true
  },
  mobile: {
    value:"0989534292",
    // value:null,
    required:true
  }
})

console.log(accountRef.value);
console.log(form.account.ref);



const schOpt = reactive(['台灣大學','清華大學','交通大學','成功大學'])

onBeforeMount(() => {
  if (locale.value == 'zh-TW') {
      console.log(locale);
      schOpt[0] = '台灣大學'
      schOpt[1] = '清華大學'
      schOpt[2] = '交通大學'
      schOpt[3] = '成功大學'
    }
  if (locale.value == 'en-US') {
    console.log(locale);
    schOpt[0] = 'UTA'
    schOpt[1] = 'UTHU'
    schOpt[2] = 'NYCU'
    schOpt[3] = 'NCKU'
  }
  console.log("onBeforeMount");
  watch(locale,()=>{
  console.log(locale.value);
  if (locale.value == 'zh-TW') {
    console.log(locale);
    schOpt[0] = '台灣大學'
    schOpt[1] = '清華大學'
    schOpt[2] = '交通大學'
    schOpt[3] = '成功大學'
  }
  if (locale.value == 'en-US') {
    console.log(locale);
    schOpt[0] = 'UTA'
    schOpt[1] = 'UTHU'
    schOpt[2] = 'NYCU'
    schOpt[3] = 'NCKU'
  }
  })
})



console.log(t('pracOneSchoolList.Fir[0]'));

const nowLanguage = ref($q.lang.getLocale())
console.log(nowLanguage.value)

watch($q.lang.getLocale(), () => {
  console.log(1);
}, {deep:true})

watch(()=> nowLanguage.value == 'en-US', val =>{
  console.log(1);
})


// const schOpt = [
//   { value: 'en-US', label:['台灣大學','清華大學','交通大學','成功大學'] },
//   { value: 'zh-TW', label:['台灣大學','清華大學','交通大學','成功大學'] }
// ]

const accountRules = [
  val => !!val || '請輸入帳號',
  val => (5 < val.length && val.length < 19) || '請輸入6-18字符',
  val => (/^[a-zA-Z][0-9_a-zA-Z]{1,17}$/.test(val)) || "只能包含數字,字母,下劃線且得字母開頭"
]
const passwordRules = [
  val => !!val || '密碼不能為空',
  val => (5 < val.length && val.length < 19) || '請輸入6-18字符',
  val => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+/.test(val)) || "請輸入英文及數字組合，須包含英文大寫跟小寫"
  // (?=.*[a-z]) 需包含小寫
  // (?=.*[A-Z]) 需包含大寫
  // (?=.*\d)    需包含數字
]
const ageRules = [
  val => !!val || '請輸入年齡',
  val => (0 < val && val < 123) || '請輸入正確年齡'
]
const emailRules = [
  val => !!val || '電子郵件不能為空',
  val => (/^[^\.](?!.*\.\.)[^@]+@[a-zA-Z0-9._]+[^\.]$/.test(val)) || '電子郵件格式錯誤'
  // dot 不能作為首尾字符, 不能連續 dot
  // ^[^\.] 字首不能 dot
  // (?!.*\.\.) 後面不能有 連續..
  // [^@]+ 多個任意不含 @ 位元
  // @[a-zA-Z0-9._]+  必須一個 @ 後面只能包含 (英文數字dot以及下劃線)
  // [^\.]$ 字尾不能 dot

  // case JohnnieCena.k.lll@gmail__132as.dff
]
const mobileRules = [
  val => !!val || "手機號碼不能為空",
  val => (/^09[0-9]{8}$/.test(val)) || "手機號碼格式錯誤, ex: 09... 必須10位數字"
]

// vuex action
const accountChange = () => {
    $store.dispatch('showcase/updateAccount', account.value)
}
const passwordChange = () => {
    $store.dispatch('showcase/updatePassword', password.value)
}
const schoolChange = () => {
    $store.dispatch('showcase/updateSchool', school.value)
}
const gradDateChange = () => {
    $store.dispatch('showcase/updateGradDate', gradDate.value)
}
const ageChange = () => {
    $store.dispatch('showcase/updatAge', age.value)
}
const emailChange = () => {
    $store.dispatch('showcase/updatEmail', email.value)
}
const mobileChange = () => {
    $store.dispatch('showcase/updatMobile', mobile.value)
}


const onSubmit = () => {
  console.log("submit")
  // console.log(accountRef.value);
  // console.log(form.account.ref);
  accountRef.value.validate()
  // form.account.ref.validate()
  pwdRef.value.validate()
  schoolRef.value.validate()
  gradDateRef.value.validate()
  ageRef.value.validate()
  emailRef.value.validate()
  mobileRef.value.validate()


  console.log($store.state.showcase.msg)
  console.log($store.state.showcase.account)  

  


  if (accountRef.value.hasError || pwdRef.value.hasError || schoolRef.value.hasError 
      || gradDateRef.value.hasError || ageRef.value.hasError || emailRef.value.hasError
      || mobileRef.value.hasError) {
          // form has error
          return 0
  }
  else if (toggleValue.value !== true) {
    $q.notify({
      color: 'negative',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      icon: 'done',
      color: 'positive',
      message: 'Submitted'
    })
    Loading.show({
          // message: '提交過程中， 請等待...'
          message: t('pracOneSubmitMsg')
    })

    setTimeout(() => {
      Loading.hide()
      accountChange()
      passwordChange()
      schoolChange()
      gradDateChange()
      ageChange()
      emailChange()
      mobileChange()
      console.log($store.state.showcase.account);
      router.push({ path: '/prac1_result' })
    }, 1000);

    
  }
}
const onReset = () => {
  // form.value.account = ""
  account.value = ""
  password.value = ""
  school.value = ""
  gradDate.value = "年/月/日"
  age.value = ""
  email.value = ""
  mobile.value = ""
  // form.value.password = ""
  // form.value.school = ""
  // date.value = "年/月/日"
  // form.value.age = ""
  // form.value.email = ""
  // form.value.mobile = ""

  form.account.ref.resetValidation()
  pwdRef.value.resetValidation()
  schoolRef.value.resetValidation()
  gradDateRef.value.resetValidation()
  ageRef.value.resetValidation()
  emailRef.value.resetValidation()
  mobileRef.value.resetValidation()
}

const validAccount = () => {
  console.log(account.value.length)
  if (account.value.length < 6) {
    
  }
}
const submitLogin = () => {
  alert("login")
}

const changeAccount = () => {
  $store.dispatch('updateAccount', {account: "abcde"})
  $store.state.account
}


</script>
