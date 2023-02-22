<template>
    <q-page class="flex-center q-pa-lg">
        {{ allTime }}
        <div class="q-pa-lg" v-if="showTime1">第一頁還剩下 {{ firstTime }} 秒</div>
        <div class="q-pa-lg" v-if="showTime234">第二,三,四頁還剩下 {{ leftTime }} 秒</div>
        <div class="q-pa-lg" v-if="showTimeOut">作答時間結束</div>

        <div class="q-pa-lg" v-if="showpage1">
            page1
            <div class="q-pa-sm" >性別:</div>
            <q-option-group
                v-model="group"
                :options="options"
                color="primary"
            />
        </div>
        <div class="q-pa-lg" v-if="showpage2">page2</div>
        <div class="q-pa-lg" v-if="showpage3">page3</div>
        <div class="q-pa-lg" v-if="showpage4">page4</div>
        <div class="q-pa-lg" v-if="showpage5">page5</div>
        
        <div class="q-pa-lg">
        <q-pagination
            :disable="paginDisable"
            v-model="current"
            :max="4"
        />
        <q-btn class="q-mt-lg" size="8px" color="red" icon="check" label="結束作答" @click="endClick"/>
            <div class="q-mt-sm" v-if="endOneTime">
                第一頁作答時間 {{ 10 - firstTime }}
            </div>
            <div class="q-mt-sm" v-if="endLeftTime">
                第二三四頁作答時間 {{ 10 - leftTime }}
            </div>
        </div>

        <q-btn color="primary" icon="restart_alt" label="再來一次" @click="reset" />
    </q-page>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, 
        watchEffect, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const allTime = ref(0)

const current = ref(1)
const firstTime = ref(10)
const leftTime = ref(10)
const showpage1 = ref(true)
const showpage2 = ref(false)
const showpage3 = ref(false)
const showpage4 = ref(false)
const showpage5 = ref(false)
const showTime1 = ref(true)
const showTime234 = ref(false)
const showTimeOut = ref(false)
const endOneTime = ref(false)
const endLeftTime = ref(false)
const paginDisable = ref(false)

const group = ref()
const options = [
        {
          label: 'Male',
          value: 'op1'
        },
        {
          label: 'Female',
          value: 'op2'
        }
    ]

// const FirstPage = setInterval(() => {
//     countDownFirst()
// }, 1000);

// const countDownFirst = () => {
//     firstTime.value--
//     if (current.value != 1 || firstTime.value < 1) {
//         current.value = 2
//         clearInterval(FirstPage)
//     }
// }

// watchEffect(() => {
//     if (current.value != 1) {
//         const remainPage = setInterval(() => {
//             countDownRemainPage()
//         }, 1000);

//         const countDownRemainPage = () => {
//         leftTime.value--
//         if (leftTime.value < 1) {
//             current.value = 5
//             clearInterval(remainPage)
//         }
//         }
//     }
// })


const allPages = setInterval(() => {
    countUp()
}, 1000)

const countUp = () => {
    
    allTime.value++
    if ( allTime.value == 22) {
        current.value = 5
        console.log(current.value);
        clearInterval(allPages)
        return 0
    }
    if ( allTime.value < 11) {
        firstTime.value = 10 - allTime.value
    } else {
        current.value = 2
    }
    if (current.value !== 1 || allTime.value > 9 && allTime.value < 20 ) {
        leftTime.value = 21 - allTime.value
    }
}





// setInterval(() => {
//     if (startTime.value == 1) {
//         current.value = 2
//     } else {
//         startTime.value--
//     }
// }, 1000);


watchEffect(()=>{
    if (current.value == 1) {
        showTime1.value = true
        showTime234.value = false
        showTimeOut.value = false

        showpage1.value = true
        showpage2.value = false
        showpage3.value = false
        showpage4.value = false
        showpage5.value = false
    }
})
watchEffect(()=>{
    if (current.value == 2) {
        showTime1.value = false
        showTime234.value = true
        showTimeOut.value = false

        showpage1.value = false
        showpage2.value = true
        showpage3.value = false
        showpage4.value = false
        showpage5.value = false
    }
})
watchEffect(()=>{
    if (current.value == 3) {
        showTime1.value = false
        showTime234.value = true
        showTimeOut.value = false

        showpage1.value = false
        showpage2.value = false
        showpage3.value = true
        showpage4.value = false
        showpage5.value = false
    }
})
watchEffect(()=>{
    if (current.value == 4) {
        showTime1.value = false
        showTime234.value = true
        showTimeOut.value = false

        showpage1.value = false
        showpage2.value = false
        showpage3.value = false
        showpage4.value = true
        showpage5.value = false
    }
})
watchEffect(()=>{
    if (current.value == 5) {
        showTime1.value = false
        showTime234.value = false
        showTimeOut.value = true
        
        showpage1.value = false
        showpage2.value = false
        showpage3.value = false
        showpage4.value = false
        showpage5.value = true

        paginDisable.value = true
    }
})

const endClick = () => {
    // clearInterval(FirstPage)
    clearInterval(allPages)
    current.value = 5
    endOneTime.value = true
    endLeftTime.value = true
}

watchEffect(()=>{
    if (current.value == 5) {
        endOneTime.value = true
        endLeftTime.value = true
    }
})

const reset = () => {
    instance.proxy.$forceUpdate()
}

// onMounted(() => {
//     startTime.value--
//     watch(startTime.value, () => {
//         if ( startTime.value > 0 ){
//             setTimeout(() => {
//             startTime.value--
//             }, 1000);
//         }
//     })
// })

// const countdown = computed()


</script>