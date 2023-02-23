<template>
    <q-page class="flex-center q-pa-lg">

        <div> 準備開始填寫 </div>

        <div>
            <h3>準備填寫</h3>
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

        <div class="q-mt-lg">
            <q-btn color="primary" icon="start" label="開始填寫" @click="router.push({ path: '/questionnaire2' })" />
        </div>

        
    </q-page>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, 
        watchEffect, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const btn1Disable = ref(true)
const btn2Disable = ref(true)
const btn3Disable = ref(true)
const btn4Disable = ref(true)

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



</script>