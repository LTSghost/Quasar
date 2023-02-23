<template>
    <div>
        <p> {{ title }} </p> 
        <div v-for="question in questions" :key="question.id">
            <h4>Question {{ question.id }}</h4>
            <p>{{ question.text }}</p>
            <div v-if="question.type === 'radio'">
                <div class="q-pa-md">
                    <q-option-group
                    :options="question.options"
                    type="radio"
                    v-model="question.group"
                    
                    />
                </div>
                <!-- <button @click="emit('someInt', question.group)">submit</button> -->
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    title: String,
    questions: Array
})

// const emit = defineEmits(['someInt'])

// const callBack = () => {
//     emit('someInt', 11)
// }


</script>