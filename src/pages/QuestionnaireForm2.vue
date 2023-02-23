<template>
    <q-page class="flex-center q-pa-lg">

        <div v-show="firstPageTime"> 第一頁填寫時間 {{ timer.minutes }} 分 {{ timer.seconds.value - 10 }} 秒 </div>
        <div v-show="leftPageTime"> 第二三四頁填寫時間 {{ timer.minutes }} 分 {{ timer.seconds }} 秒 </div>
        <div v-show="endPage"> 填寫時間已結束 </div>

        <div v-show="page1">
            <!-- <QuestionnaireItem @someInt="callBack" title="page1" :questions="page1Questions"/> -->
            <QuestionnaireItem title="page1" :questions="page1Questions"/>
            <button @click="page1Btn">第二頁</button>
        </div>
        <div v-show="page2">
            <QuestionnaireItem title="page2" :questions="page2Questions"/>
            <button @click="endBtn">結束填寫</button>
        </div>
        <div v-show="page3">
            <QuestionnaireItem title="page3" :questions="page3Questions"/>
            <button @click="endBtn">結束填寫</button>
        </div>
        <div v-show="page4">
            <QuestionnaireItem title="page4" :questions="page4Questions"/>
            <button @click="endBtn">結束填寫</button>
        </div>

        <div v-show="page5">
            <h3>ALL DONE</h3>
        </div>
        
        <br>
        <br>
        <q-btn 
            class="q-mr-sm"
            v-for="(item, key, index) in items" :key="index"
            color="primary" 
            :label=item.label
            @click="handleClick(item)" 
            :disable=item.disable
        />

        <div v-show="page5" class="q-mt-lg">
            <q-btn 
                :disable="count !== 0"
                color="primary" 
                icon="restart_alt" 
                label="重新填寫" 
                @click="router.push({ path: '/questionnaireBegin' })" 
            />  
            <span class="q-ml-md" v-if="count !== 0"> {{ count }} 秒後可重新填寫</span>
        </div>

        <!-- {{ getRes }}    -->

        <div v-if="timer.minutes.value == 0 && timer.seconds.value == 0">
            <br>
            {{ page1Questions[0].text }} {{ page1Questions[0].group }}
            <br>
            {{ page1Questions[1].text }} {{ page1Questions[1].group }}
            <br>
            {{ page2Questions[0].text }} {{ page2Questions[0].group }}
            <br>
            {{ page3Questions[0].text }} {{ page3Questions[0].group }}
            <br>
            {{ page4Questions[0].text }} {{ page4Questions[0].group }}
        </div>

        <!-- <q-table
            title="Survey Result"
            :data="page1Questions"
            row-key="name"
        /> -->

    </q-page>
    <!-- <pre style="max-height: 77em;">{{ page1Questions }}</pre> -->
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, 
        watchEffect, getCurrentInstance } from 'vue'
import { useTimer } from 'vue-timer-hook'
import QuestionnaireItem from 'src/components/QuestionnaireItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const time = new Date();
time.setSeconds(time.getSeconds() + 20); // 10 minutes timer
const timer = useTimer(time);

const firstPageTime = ref(true)
const leftPageTime = ref(false)
const endPage = ref(false)

const title = ref('My Questionnaire')
const page1 =ref(true)
const page2 =ref(false)
const page3 =ref(false)
const page4 =ref(false)
const page5 =ref(false)

const btn1Disable = ref(false)
const btn2Disable = ref(true)
const btn3Disable = ref(true)
const btn4Disable = ref(true)

const getRes = ref('')

const items = reactive([
    {
        label:1,
        disable:btn1Disable
    },
    {
        label:2,
        disable:btn2Disable
    },
    {
        label:3,
        disable:btn3Disable
    },
    {
        label:4,
        disable:btn4Disable
    },
])

const page1Questions = reactive([
    {
        id: 1,
        text: 'What is your favorite color?',
        type: 'radio',
        options: [
            { label: 'blue', value: 'blue' },
            { label: 'green', value: 'green', color: 'green' },
            { label: 'red', value: 'red', color: 'red' }
        ],
        group: null
    },
    {
        id: 2,
        text: 'What is your starch source?',
        type: 'radio',
        options: [
            { label: 'noodle', value: 'noodle' },
            { label: 'rice', value: 'rice', color: 'green' },
            { label: 'bread', value: 'bread', color: 'red' }
        ],
        group: null
    }
])

const page2Questions = reactive([
    {
        id: 3,
        text: 'What is your gender?',
        type: 'radio',
        options: [
            { label: 'male', value: 'male', color: 'blue' },
            { label: 'female', value: 'female', color: 'red' },
        ],
        group: null
    }
])

const page3Questions = reactive([
    {
        id: 4,
        text: 'Life or Work?',
        type: 'radio',
        options: [
            { label: 'Life', value: 'Life', color: 'blue' },
            { label: 'Work', value: 'Work', color: 'brown' },
        ],
        group: null
    }
])

const page4Questions = reactive([
    {
        id: 5,
        text: 'Love or Money?',
        type: 'radio',
        options: [
            { label: 'Love', value: 'Love', color: 'red' },
            { label: 'Money', value: 'Money', color: 'yellow' },
        ],
        group: null
    }
])

const handleClick = (item) => {
    if (item.label == 1) {

    }
    if (item.label == 2) {
        page1.value = false
        page2.value = true
        page3.value = false
        page4.value = false
    }
    if (item.label == 3) {
        page1.value = false
        page2.value = false
        page3.value = true
        page4.value = false
    }
    if (item.label == 4) {
        page1.value = false
        page2.value = false
        page3.value = false
        page4.value = true
    }
}

const callBack = (res) => {
    getRes.value = res
    console.log(res);
}

// click page1Btn will set time to 10 sec
const page1Btn = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10);
    timer.restart(time);
}

const endBtn = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 0);
    timer.restart(time);
}

const count = ref(3)


// firstPageEnding
watchEffect(() => {
    if (timer.seconds.value - 10 == 0) {
        btn1Disable.value = true
        firstPageTime.value = false
        leftPageTime.value = true

        if (page1.value == true){
            page1.value = false
            page2.value = true
        }

        btn1Disable.value = true
        btn2Disable.value = false
        btn3Disable.value = false
        btn4Disable.value = false
    }
})

// allEnd
watchEffect(()=>{
    if (timer.minutes.value == 0 && timer.seconds.value == 0) {
        firstPageTime.value = false
        leftPageTime.value = false
        endPage.value = true

        page1.value = false
        page2.value = false
        page3.value = false
        page4.value = false
        page5.value = true

        btn1Disable.value = true
        btn2Disable.value = true
        btn3Disable.value = true
        btn4Disable.value = true

        const resetCount = setInterval(() => {
            countDown()
        }, 1000);

        const countDown = () => {
            count.value--
            if ( count.value == 0 ) {
                clearInterval(resetCount) 
            }
        }
    }
})



</script>