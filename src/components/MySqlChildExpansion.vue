<template>
    <div v-for="(item,index) in childs" :key="index">
            <q-separator color="grey"/>
            <q-expansion-item
              :icon="item.ICON"
              :label=item.MENU_NAME
              :header-inset-level="0.5"
              expand-icon="1"
              :to="root+item['PAGE'].split('/')[3].replace('.vue','')"
              active-class="text-orange text-weight-bolder"
            >
            </q-expansion-item>
    </div>
    <q-separator color="grey"/>
</template>

<script setup>
import { ref } from 'vue';

const root = '/'

const props = defineProps({
    childs: Array
})

</script>