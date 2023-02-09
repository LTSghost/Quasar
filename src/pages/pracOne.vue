<template>

  <q-page>
    <!-- ac pwd -->
    <div class="row">
        <div class="col q-pl-xl q-pt-xl q-pr-sm q-pb-xs">
          <!-- account -->
          <q-input
          filled
          label="帳號 *"
          v-model="form.account.value"
          :error="form.account.error"
          :error-message="form.account.msg">
            <template v-slot:append>
              <q-icon name="person"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="col q-pl-sm q-pt-xl q-pr-xl q-pb-xs">
          <!-- pwd -->
          <q-input
          filled
          label="密碼 *"
          :type="isPwd? 'password' : 'text'"
          v-model="form.password.value"
          :error="form.password.error"
          :error-message="form.password.msg">
            <template v-slot:append>
              <q-icon
              :name="isPwd? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"></q-icon>
            </template>
          </q-input>
        </div>
    </div>
    <!-- school gradDate -->
    <div class="row">
        <div class="col q-pl-xl q-pt-xs q-pr-sm q-pb-xs">
          <!-- school -->
          <q-input
          filled
          label="畢業學校 *"
          v-model="form.account.value"
          :error="form.account.error"
          :error-message="form.account.msg">
            <!-- <template v-slot:append>
              <q-icon name="person"></q-icon>
            </template> -->
          </q-input>
        </div>
        <div class="col q-pl-sm q-pt-xs q-pr-xl q-pb-xs">
          <!-- graduate_date -->
          <q-input
          filled
          label="畢業日期 *"
          :type="isPwd? 'password' : 'text'"
          v-model="form.password.value"
          :error="form.password.error"
          :error-message="form.password.msg">
            <!-- <template v-slot:append>
              <q-icon
              :name="isPwd? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"></q-icon>
            </template> -->
          </q-input>
        </div>
    </div>
    <!-- old email -->
    <div class="row">
        <div class="col q-pl-xl q-pt-xs q-pr-sm q-pb-xs">
          <!-- old -->
          <q-input
          filled
          label="年齡 *"
          v-model="form.account.value"
          :error="form.account.error"
          :error-message="form.account.msg">
            <!-- <template v-slot:append>
              <q-icon name="person"></q-icon>
            </template> -->
          </q-input>
        </div>
        <div class="col q-pl-sm q-pt-xs q-pr-xl q-pb-xs">
          <!-- email -->
          <q-input
          filled
          label="電子郵件 *"
          :type="isPwd? 'password' : 'text'"
          v-model="form.password.value"
          :error="form.password.error"
          :error-message="form.password.msg">
            <!-- <template v-slot:append>
              <q-icon
              :name="isPwd? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"></q-icon>
            </template> -->
          </q-input>
        </div>
    </div>
    <!-- mobile -->
    <div class="row">
        <div class="col-6 q-pl-xl q-pt-xs q-pr-sm">
          <!-- mobile -->
          <q-input
          filled
          label="手機號碼 *"
          v-model="form.account.value"
          :error="form.account.error"
          :error-message="form.account.msg">
            <!-- <template v-slot:append>
              <q-icon name="person"></q-icon>
            </template> -->
          </q-input>
        </div>
    </div>
    <!-- login allowTerm -->
    <div class="q-pa-md fit row wrap justify-center items-start content-start">
        <q-toggle font="text-weight-bold" label="我接受許可證和條款" v-model="toggleValue" color="blue" />
      </div>
    <div class="q-pa-md fit row wrap justify-center items-start content-start">
      <div>
        <q-btn color="primary" label="提交" @click="submitLogin" />
        <q-btn class="q-ml-sm" color="white" text-color="blue" label="重置" @click="submitLogin" />
      </div>
    </div>
      <!-- <div class="q-pt-lg">
        <q-btn color="primary" icon="check" label="Show another notification" @click="showNotification" />
      </div> -->


  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const toggleValue = ref(false)
const isPwd = ref(true)

const form = ref({
  account: {
    value:"",
    account:true,
    required:true
  },
  password: {
    value:"",
    required:true
  }
})

const submitLogin = () => {
  alert("login")
}

</script>
