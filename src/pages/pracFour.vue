<template>
    <q-list style="width:300px" class="q-pa-lg">
        <q-btn color="primary" :icon="showCompMyQitem ? 'visibility' : 'visibility_off'" label="toggleCompMyQitem" @click="showCompMyQitem = !showCompMyQitem" />
        <br>
        <br>
        <MyQitemExpansion v-if="showCompMyQitem"/>
    </q-list>
</template>

<script setup>
import MyQitemExpansion from 'components/MyQitemExpansion.vue'
import { ref } from 'vue'
const showCompMyQitem = ref(true)
</script>