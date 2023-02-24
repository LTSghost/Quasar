<template>
    <div>
        {{ test }}

        <q-btn color="primary" label="POST" @click="postAxios" />

    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue'

const test = ref("hello World")

const userid = ref('admin')
const password = ref('quasar')

const paramObj = reactive({
    USER_ID: userid,
    PASSWORD: password
})

const popErrMsg = (msg) => {
    console.log(msg)
}

const postAxios = () => {
  axios
    .post(process.env.env_API + "/VueTest/Login", paramObj)
    .then((res) => {
    if (res.status == "200") {
        if (res.data.Status == "Y") {
            $router.push("/IndexPage").then((e) => {
                $q.notify({
                    message: res.data.Message,
                    color: "green",
                    position: "bottom",
                    timeout: 1000,
                })
            })
        } else {
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
postAxios()

</script>