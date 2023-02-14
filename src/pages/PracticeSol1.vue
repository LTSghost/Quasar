<template>
  <div class="q-pa-md" style="max-width: 1000px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-md">
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-input
              filled
              v-model="name"
              label="用户名 *"
              hint=""
              :rules="[(val) => ValidName()]"
              :error-message="errName"
              lazy-rules
            />
          </div>
          <div class="col-5">
            <q-input
              v-model="password"
              label="密码 *"
              filled
              :type="isPwd ? 'password' : 'text'"
              hint=""
              :rules="[(val) => ValidPassword()]"
              :error-message="errPassword"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-select
              filled
              v-model="school"
              label="毕业学校 *"
              hint=""
              :options="schoolOptions"
              behavior="menu"
              lazy-rules
              clearable
              :rules="[(val) => !!val || '请选择毕业学校']"
            />
          </div>
          <div class="col-5">
            <q-input
              filled
              label="毕业日期 *"
              stack-label=""
              v-model="graduateDate"
              type="date"
              hint=""
              lazy-rules
              :rules="[(val) => !!val || '请输入毕业日期']"
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-input
              filled
              type="number"
              v-model="age"
              label="年龄 *"
              hint=""
              lazy-rules
              input-class="text-right"
              :rules="[
                (val) => !!val || '请输入年龄',
                (val) => (val > 0 && val < 100) || '请输入真实的年龄'
              ]"
            />
          </div>
          <div class="col-5">
            <!-- <q-input
              filled
              type="email"
              v-model="email"
              label="邮箱 *"
              hint=""
              lazy-rules
              :rules="[(val) => !!val || '请输入邮箱']"
            /> -->
            <q-input
              filled
              type="text"
              v-model="email"
              label="邮箱 *"
              hint=""
              lazy-rules
              :rules="[(val) => ValidEmail()]"
              :error-message="errEmail"
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-5">
            <q-input
              filled
              type="tel"
              v-model="tel"
              label="手机号码 *"
              hint=""
              lazy-rules
              :rules="[(val) => ValidTel()]"
              :error-message="errTel"
            />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-10" style="text-align: center">
            <q-toggle v-model="accept" label="我接受许可证和条款" />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col-10" style="text-align: center">
            <q-btn label="提交" type="submit" color="primary" />
            <q-btn
              label="重置"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar"
import { ref } from "vue"

export default {
  data() {
    return {
      name: null,
      errName: null,
      isErrName: false,
      school: null,
      schoolOptions: [
        "北京大学",
        "清华大学",
        "山东大学",
        "四川大学",
        "天津大学"
      ],
      graduateDate: null,
      age: null,
      accept: false,
      password: null,
      errPassword: null,
      isPwd: true,
      email: null,
      errEmail: null,
      tel: null,
      errTel: null
    }
  },
  computed: {},
  methods: {
    ValidName: function () {
      this.errName = ""
      if (!this.name) {
        // 1. 不能为空
        this.errName = "请输入用户名"
      } else if (!/[a-zA-Z]/.test(this.name[0])) {
        // 2. 首字符不是字母
        this.errName = "用户名必须是英文开头"
      } else if (!/\w{6,18}/.test(this.name)) {
        // 3、用户名必须是数字、字母、下划线组成
        this.errName = "用户名只能为包括数字字母下划线的6-18位字符串"
      }
      return this.errName == ""
    },
    ValidPassword: function () {
      this.errPassword = ""
      if (!this.password) {
        this.errPassword = "密码不能为空"
      } else if (
        (/\d+/.test(this.password) &&
          /[a-z]+/.test(this.password) &&
          /[A-Z]+/.test(this.password) &&
          /[a-zA-Z0-9]{6,18}/.test(this.password)) == false
      ) {
        // /\d+/.test(pwd) 检核必须包含数字
        // /[a-z]+/.test(pwd) 检核必须包含小写字母
        // /[A-Z]+/.test(pwd) 检核必须包含大写字母
        //  /[a-zA-Z0-9]{6,18}/.test(pwd) 检核必须为字母数字组合的6-18位字符串
        this.errPassword =
          "密码6-18个字符（字母和数字），大小写字母和数字必须都要有"
      }
      return this.errPassword == ""
    },
    ValidEmail: function () {
      this.errEmail = ""
      let reg_email = new RegExp(
        /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
      ) //邮箱正则
      if (!this.email) {
        this.errEmail = "邮箱不能为空"
      } else if (!reg_email.test(this.email)) {
        this.errEmail = "邮箱格式错误"
      }
      return this.errEmail == ""
    },
    ValidTel: function () {
      this.errTel = ""
      let reg_tel = new RegExp(
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      ) //11位手机号码正则
      //var reg_tel = /^[09]d{8}$/; //以09开头的10位手机号码正则
      if (!this.tel) {
        this.errTel = "手机号不能为空"
      } else if (!reg_tel.test(this.tel)) {
        this.errTel = "手机号格式错误"
      }
      return this.errTel == ""
    },
    onSubmit: function () {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "你需要先接受许可证和条款"
        })
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "提交成功！"
        })
      }
    },
    onReset: function () {
      this.name = null
      this.errName = null
      this.age = null
      this.accept = false
      this.isPwd = true
      this.password = null
      this.errPassword = null
      this.school = null
      this.graduateDate = null
      this.email = null
      this.tel = null
      this.errTel = null
    }
  }
}
</script>
