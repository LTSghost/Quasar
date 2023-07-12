<template>
  <q-page>
    <q-card class="q-pa-sm">
      <div class="row q-mt-sm">
        <div class="col-1 text-right q-pt-sm q-pr-sm">{{ $t("UserId") }}</div>
        <div class="col-2">
          <q-input dense outlined v-model="query.USER_ID" />
        </div>
        <div class="col-1 text-right q-pt-sm q-pr-sm">{{ $t("UserName") }}</div>
        <div class="col-2">
          <q-input dense outlined v-model="query.USER_NAME" />
        </div>
      </div>
      <div class="row q-pt-sm">
        <div class="col-6">
          <q-btn
            @click="QueryData()"
            color="secondary"
            :label="$t('Query')"
            class="q-mr-xs"
          />
          <q-btn
            @click="Clear()"
            color="secondary"
            :label="$t('Clear')"
            class="q-mr-xs"
          />
          <q-btn
            @click="AddRow()"
            color="secondary"
            :label="$t('Add')"
            class="q-mr-xs"
          />
        </div>
      </div>
    </q-card>
    <q-card v-show="isShowTable">
      <q-table
        title=""
        :rows="userData"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode == 'grid'"
        :filter="filter"
        :pagination="pagination"
        :loading="isLoading"
        color="secondary"
        separator="cell"
        dense
      >
        <template v-slot:header="props">
          <q-tr :props="props" class="table-header">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ $t(col.label) }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:top-right="props">
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$q.lang.label.search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>
        </template>

        <template v-slot:body-cell-IS_VALID="props">
          <q-td :props="props">
            <q-chip
              :color="props.row.IS_VALID == 'Y' ? 'green' : 'orange'"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
              >{{
                (props.row.IS_VALID == null ? "Y" : $t(props.row.IS_VALID)) ==
                "N"
                  ? $t("NStatus")
                  : $t("YStatus")
              }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                dense
                color="secondary"
                icon="edit"
                @click="EditRow(props.row)"
              >
                <!-- <q-tooltip>{{ $t("Update") }}</q-tooltip> -->
              </q-btn>
              <q-btn
                dense
                color="warning"
                icon="vpn_key"
                @click="ResetPassword(props.row)"
              >
                <!-- <q-tooltip>{{ $t("Reset") + $t("Password") }}</q-tooltip> -->
              </q-btn>
              <q-btn
                dense
                color="purple"
                icon="group"
                @click="EditRole(props.row)"
              >
                <!-- <q-tooltip>{{ $t("Reset") + $t("Password") }}</q-tooltip> -->
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="user_dialog">
      <q-card style="width: 400px; max-width: 70vw">
        <q-card-section>
          <div class="text-h6">
            {{ (isAdd ? $t("Add") : $t("Update")) + $t("Data") }}
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form ref="dialogForm" class="q-gutter-md">
            <div class="row q-pt-sm">
              <div class="col-3 text-right q-pt-sm q-pr-sm">
                {{ $t("UserId") }} <span style="color: red">*</span>
              </div>
              <div class="col-8">
                <q-input
                  dense
                  outlined
                  v-model.lazy="dialogData.USER_ID"
                  :readonly="!isAdd"
                  :rules="[(val) => ValidUserId()]"
                  :error-message="dialogData.ERR_USER_ID"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3 text-right q-pt-sm q-pr-sm">
                {{ $t("UserName") }} <span style="color: red">*</span>
              </div>
              <div class="col-8">
                <q-input
                  dense
                  outlined
                  v-model="dialogData.USER_NAME"
                  :rules="[
                    (val) => !!val || $t('PleaseInput') + $t('UserName'),
                  ]"
                />
              </div>
            </div>
            <div class="row" v-show="!isAdd">
              <div class="col-3 text-right q-pt-sm q-pr-sm">
                {{ $t("Status") }} <span style="color: red">*</span>
              </div>
              <div class="col-8">
                <q-toggle
                  color="blue"
                  :label="`${
                    dialogData.IS_VALID == 'Y' ? $t('YStatus') : $t('NStatus')
                  }`"
                  false-value="N"
                  true-value="Y"
                  v-model="dialogData.IS_VALID"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn
            :label="$t('Save')"
            type="submit"
            @click="SaveData()"
            color="secondary"
          />
          <q-btn
            :label="$t('Cancel')"
            type="button"
            color="negative"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="role_dialog">
      <q-card style="width: 400px; max-width: 70vw">
        <q-card-section>
          <div class="text-h6">
            {{ $t("Set") + $t("Role") }}
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form ref="dialogRoleForm" class="q-gutter-md">
            <div class="row q-pt-sm">
              <div class="col-3 text-right q-pt-sm q-pr-sm">
                {{ $t("UserId") }} <span style="color: red">*</span>
              </div>
              <div class="col-8">
                <q-input
                  dense
                  outlined
                  v-model.lazy="roleDialogData.USER_ID"
                  readonly
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3 text-right q-pt-sm q-pr-sm">
                {{ $t("UserName") }} <span style="color: red">*</span>
              </div>
              <div class="col-8">
                <q-input
                  dense
                  outlined
                  readonly
                  v-model="roleDialogData.USER_NAME"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3 text-right q-pt-sm q-pr-sm">
                {{ $t("Role") }} <span style="color: red">*</span>
              </div>
              <div class="col-8">
                <q-option-group
                  dense
                  :options="roleOptions"
                  type="checkbox"
                  v-model="roleDialogData.ROLE"
                  :rules="[(val) => !!val || $t('PleaseSelect') + $t('Role')]"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn
            :label="$t('Save')"
            type="submit"
            @click="SaveRole()"
            color="secondary"
          />
          <q-btn
            :label="$t('Cancel')"
            type="button"
            color="negative"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue'

onMounted(() => {
    axios
    .get("http://localhost:8091/sys_role")
    .then((res) => {
        if (res.status == "200") {
            roleOptions = []
            res.data.forEach((el) => {
                
                // roleOptions.push({label: el.ROLE_NAME, value: el.ROLE_ID})
            })
        }
    })
    .catch((error) => {
        console.error(error.message);
    })
})

const initPassword = 'quasar'
const filter = ""
const isShowTable = false
const isLoading = false
const isAdd = false
const user_dialog = false
const role_dialog = false
const mode = "list"
const roleOptions = []


const query = reactive({
    USER_ID:"",
    USER_NAME:""
})

const dialogData = reactive({
    USER_ID: "",
    ERR_USER_ID: "",
    USER_NAME: "",
    PASSWORD: "",
    IS_VALID: ""
})

const roleDialogData = reactive({
    USER_ID: "",
    USER_NAME: "",
    ROLE: []
})

const columns = [
        {
          name: "USER_ID",
          align: "left",
          label: "UserId",
          field: "USER_ID",
          sortable: true,
        },
        {
          name: "USER_NAME",
          required: true,
          label: "UserName",
          align: "left",
          field: "USER_NAME",
          sortable: true,
        },
        {
          name: "IS_VALID",
          align: "center",
          label: "Status",
          field: "IS_VALID",
          sortable: true,
          style: "width:150px",
        },
        {
          name: "action",
          align: "center",
          label: "Operation",
          field: "action",
          style: "width:150px",
        },
]

const userData = ref([])

const pagination = ref({
    rowsPerPage: 10
})



</script>