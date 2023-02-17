<template>
    <div>
        {{ test }} <br>
        {{ message }}
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore }  from 'vuex'

const $store = useStore()

const test = ref("哭阿 我是'components/IsTest.vue'")

const message = computed(()=>{
    return $store.state.showcase.msg
})

</script>