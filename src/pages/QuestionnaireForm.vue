<template>
    <q-page class="flex flex-center q-pt-lg">
        <q-table
            title="questionnaire"
            :data="data"
            :columns="columns"
            row-key="name"
        />
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
const test = ref("testtt")
</script>