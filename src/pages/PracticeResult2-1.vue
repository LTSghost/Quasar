<template>
  <div class="q-pa-md" style="max-width: 1000px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-md">
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-input
              disable
              filled
              v-model="userInfo.name"
              label="用户名"
              hint=""
            />
          </div>
          <div class="col-5">
            <q-input
              disable
              filled
              v-model="userInfo.password"
              label="密码"
              type="text'"
              hint=""
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-select
              disable
              filled
              v-model="userInfo.school"
              label="毕业学校 *"
              hint=""
              :options="schoolOptions"
              behavior="menu"
              clearable
            />
          </div>
          <div class="col-5">
            <q-input
              disable
              filled
              label="毕业日期"
              stack-label=""
              v-model="userInfo.graduateDate"
              type="date"
              hint=""
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-input
              disable
              filled
              type="number"
              v-model="userInfo.age"
              label="年龄"
              hint=""
              input-class="text-right"
            />
          </div>
          <div class="col-5">
            <q-input
              disable
              filled
              type="text"
              v-model="userInfo.email"
              label="邮箱"
              hint=""
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-input
              disable
              filled
              type="tel"
              v-model="userInfo.tel"
              label="手机号码"
              hint=""
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-10" style="text-align: center">
            <q-btn
              label="返回"
              type="button"
              color="primary"
              class="q-ml-sm"
              @click="goBack()"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: this.$store.state.showcase.practiceUserInfo,
      schoolOptions: [
        "北京大学",
        "清华大学",
        "山东大学",
        "四川大学",
        "天津大学",
      ],
    };
  },
  computed: {},
  methods: {
    goBack() {
      history.back();
    },
  },
};
</script>
