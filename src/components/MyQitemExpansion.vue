<template>
    <!-- <q-list> -->
        <!-- expan-Test -->
        <q-expansion-item
            expand-separator
            :icon="ThirdTimePrac2Json[0]['ICON']"
            :label="ThirdTimePrac2Json[0]['MENU_NAME']"
            :duration="500"
            style="background-color:#009688; color: white;"
            expand-icon-class="text-white"
            group="groupA"
        >
        <!-- <q-separator color="white"/> -->

        <div v-for="(item, key) in ThirdTimePrac2Json[0]['children']" :key="key" >
        <!-- <div v-if="!item['children']"> -->
            <q-expansion-item 
            :header-inset-level="initLevel"
            :icon="item['ICON']"
            :label="item['MENU_NAME']"
            :to="root+item['PAGE']"
            expand-icon="1"
            style="background-color: #00bcd4; color: white;"
            expand-icon-class="text-white"
            />
            <q-separator color="white" />
        <!-- </div> -->
        <!-- <div v-else>
            <q-expansion-item
            expand-separator
            :header-inset-level="initLevel"
            :icon="item['ICON']"
            :label="item['MENU_NAME']"
            style="background-color: #00bcd4; color: white;"
            expand-icon-class="text-white"
            group="my-menu-group"
            >
            <my-q-menu-item
                :ThirdTimePrac2Json="item['children']"
                :init-level="initLevel + 0.3" 
            />
            </q-expansion-item>
            <q-separator dark />
        </div> -->
        </div>

        </q-expansion-item>

        <!-- expan-Prac -->
        <q-expansion-item
            expand-separator
            default-opened
            :icon="ThirdTimePrac2Json[1]['ICON']"
            :label="ThirdTimePrac2Json[1]['MENU_NAME']"
            :duration="500"
            style="background-color:#009688; color: white;"
            expand-icon-class="text-white"
            group="groupA"
        >
        <!-- <q-separator color="white"/> -->

        <div v-for="(item, key) in ThirdTimePrac2Json[1]['children']" :key="key" >
            <q-expansion-item 
                expand-separator
                :header-inset-level="0.5"
                :icon="item['ICON']"
                :label="item['MENU_NAME']"
                :to="root+item['PAGE']"
                expand-icon="1"
                style="background-color: #00bcd4; color: white;"
                expand-icon-class="text-white"
            />
            <q-separator color="white"/>
        </div>
        </q-expansion-item>

    <!-- </q-list> -->
</template>

<script setup>
import json from 'assets/Vue3ThirdTimePrac2.json'
import { reactive, ref } from 'vue'

const root = '/'
const ThirdTimePrac2Json = reactive(json)

</script>