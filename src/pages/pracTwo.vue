<template>
  <q-page class="flex flex-center">
    <q-table
      title="Merchandise"
      :grid="isGrid"
      :rows="rows"  
      :columns="columns"
      :filter="filter"
      :pagination="pagination"
      separator="cell"
      row-key="name">

      <template v-slot:top-right="props">

        <q-btn class="q-mr-sm" color="primary" label="新增" @click="addDialog" />

        <!-- <q-input class="q-mr-sm" outlined bottom-slots v-model="text" label="search" :dense="dense">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
        </q-input> -->

        <!-- <q-input  dense standout v-model="text" label="search"  class="q-mr-sm">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input> -->


        <!-- filter input -->
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- fullscreen -->
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        ></q-btn>

        <!-- list or grid -->
        <q-btn
          flat
          round
          dense
          :icon="isGrid ? 'list' : 'grid_on'"
          @click="isGrid = !isGrid"
        >
          <q-tooltip>{{isGrid ? "List" : "Grid"}}</q-tooltip>
        </q-btn>

        <!-- exportTable -->
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>

      <!-- <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>{{ props.cols[0].label }}</q-th>
          <q-th>{{ props.cols[1].label }}</q-th>
          <q-th>{{ props.cols[2].label }}</q-th>
          <q-th>{{ props.cols[3].label }}</q-th>
          <q-th>{{ props.cols[4].label }}</q-th>
          <q-th>{{ props.cols[5].label }}</q-th>
          <q-th>{{ props.cols[6].label }}</q-th>
        </q-tr>
      </template> -->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="item_no" :props="props">
            {{ props.row.item_no }}
          </q-td>
          <q-td key="item_name" :props="props">
              {{ props.row.item_name }}
          </q-td>
          <q-td key="price" :props="props">
              {{ props.row.price }}
          </q-td>
          <q-td key="eff_date_from" :props="props">
              {{ props.row.eff_date_from }}
          </q-td>
          <q-td key="eff_date_to" :props="props">
              {{ props.row.eff_date_to }}
          </q-td>
          <q-td key="tax" :props="props">
            <q-badge v-if="props.row.tax === '应税'" color="green">
              {{ props.row.tax }}
            </q-badge>
            <q-badge v-else-if="props.row.tax === '免税'" color="orange">
              {{ props.row.tax }}
            </q-badge>
            <q-badge v-else color="cyan">
              {{ props.row.tax }}
            </q-badge>
          </q-td>
          <q-td key="calcium" :props="props">
            <q-btn dense color="blue" @click="editDialog(props)" icon="edit"></q-btn>
            <q-btn dense color="red" @click="deleteRow(props)" icon="delete" class="q-ml-sm"></q-btn>
            <!-- <q-btn dense round flat color="grey" @click="deleteOrNot(props)" icon="delete"></q-btn> -->
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <!-- <q-table
    title="Simple"
    :rows="data"
    :columns="columns"
    row-key="name"
    dense>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
        <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
      </q-td>          
    </template>
    </q-table> -->

    <!-- addDialog -->
    <q-dialog v-model="addForm.isEdit">
      <q-card class="q-pa-lg" style="max-width: 500px; width: 100%">
        <h5 class="text-center text-bold q-mb-lg">新增資料</h5>
        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
          <!-- <div class="form">
          </div> -->
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
              outlined 
              label="商品代號 *" 
              stack-label
              :rules="itemNoRules"
              v-model="addForm.model.item_no"
              >
              </q-input>
            </div>
            <div class="col-12">
              <q-input label="商品名稱 *" stack-label outlined v-model="addForm.model.item_name"></q-input>
            </div>
            <div class="col-12">
              <q-input label="價格 *" stack-label outlined v-model="addForm.model.price"></q-input>
            </div>
            <div class="col-12"> 
            <q-input
            ref="startDateRef"
            outlined 
            lazy-rules
            label="適用開始日"
            v-model="addForm.model.eff_date_from"
            :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div>

            <div class="col-12"> 
            <q-input
            ref="endDateRef"
            outlined 
            lazy-rules
            label="適用結束日 *"
            v-model="addForm.model.eff_date_to"
            :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div>

            <div class="col-12"> 
            <q-select
            ref="taxTypeRef"
            filled
            lazy-rules
            v-model="addForm.model.tax" 
            :options="taxOpt"
            label="稅別 *"
            :rules="[val => !!val || '請選擇稅別']"/>
           </div>
            <div class="col-6">
              <q-btn v-close-popup unelevated color="primary" class="full-width" label="保存" @click="handleAdd"></q-btn>
            </div>
            <div class="col-6">
              <q-btn v-close-popup unelevated color="grey-7" class="full-width" label="取消"></q-btn>
            </div>
          </div>
        </form>
      </q-card>
    </q-dialog>

    <!-- editDialog -->
    <q-dialog v-model="editForm.isEdit">
      <q-card class="q-pa-lg" style="max-width: 500px; width: 100%">
          <h5 class="text-center text-bold q-mb-lg">新增資料</h5>
          <div class="form">
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input label="商品代號 *" readonly stack-label outlined v-model="editForm.model.item_no"></q-input>
            </div>
            <div class="col-12">
              <q-input label="商品名稱 *" stack-label outlined v-model="editForm.model.item_name"></q-input>
            </div>
            <div class="col-12">
              <q-input label="價格 *" stack-label outlined v-model="editForm.model.price"></q-input>
            </div>
            <div class="col-12"> 
            <q-input
            ref="startDateRef"
            outlined 
            lazy-rules
            label="適用開始日"
            v-model="editForm.model.eff_date_from"
            :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div>

            <div class="col-12"> 
            <q-input
            ref="endDateRef"
            outlined 
            lazy-rules
            label="適用結束日 *"
            v-model="editForm.model.eff_date_to"
            :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div>

            <div class="col-12"> 
            <q-select
            ref="taxTypeRef"
            filled
            lazy-rules
            v-model="editForm.model.tax" 
            :options="taxOpt"
            label="稅別 *"
            :rules="[val => !!val || '請選擇稅別']"/>
           </div>
            <div class="col-6">
              <q-btn v-close-popup unelevated color="primary" class="full-width" label="保存" @click="handleEdit"></q-btn>
            </div>
            <div class="col-6">
              <q-btn v-close-popup unelevated color="grey-7" class="full-width" label="取消"></q-btn>
            </div>
          </div>
      </q-card>
    </q-dialog>

    <!-- deleteDialog -->
    <q-dialog v-model="delForm">
      <q-card>
        <q-card-section>
          <div class="text-h6">確認刪除?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          確認刪除 {{ item_name }}
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="確認" @click="delConform()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>

</template>

<script setup>
import { exportFile, Loading, useQuasar } from 'quasar'
import { ref } from 'vue'
import json from '../assets/Practice2_Data.json'

// console.log(json[0]['item_no'])
//   "item_no": "01",
//   "item_name": "BCD-535WGHSSEDS9",
//   "price": "4200",
//   "eff_date_from": "2023-01-05",
//   "eff_date_to": "2024-02-05",
//   "tax": "应税"

const filter = ref('')
const isGrid = ref(false)

const itemNoRules = [
  val => !!val || '請輸入商品代號',
  val => (/^[0-9]+/.test(val)) || "請輸入數字"
]

const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 8
    })

const columns = [
  {
    name: 'item_no',
    required: true,
    label: '商品代號',
    align: 'left',
    field: row => row.item_no,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'item_name', align: 'center', label: '商品名稱', field: row => row.item_name, sortable: true },
  { name: 'price', label: '價格', field: 'price', sortable: true },
  { name: 'eff_date_from', label: '適用開始日', field: 'eff_date_from' },
  { name: 'eff_date_to', label: '適用結束日', field: 'eff_date_to' },
  { name: 'tax', label: '稅別', field: 'tax' },
  { name: 'calcium', label: '操作', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = json

// const rows = [
//   {
//     item_no: 'Frozen Yogurt',
//     calories: 159,
//     fat: 6.0,
//     carbs: 24,
//     protein: 4.0,
//     sodium: 87,
//     calcium: '14%',
//     iron: '1%'
//   },
//   {
//     name: 'Ice cream sandwich',
//     calories: 237,
//     fat: 9.0,
//     carbs: 37,
//     protein: 4.3,
//     sodium: 129,
//     calcium: '8%',
//     iron: '1%'
//   },
//   {
//     name: 'Eclair',
//     calories: 262,
//     fat: 16.0,
//     carbs: 23,
//     protein: 6.0,
//     sodium: 337,
//     calcium: '6%',
//     iron: '7%'
//   },
//   {
//     name: 'Cupcake',
//     calories: 305,
//     fat: 3.7,
//     carbs: 67,
//     protein: 4.3,
//     sodium: 413,
//     calcium: '3%',
//     iron: '8%'
//   },
//   {
//     name: 'Gingerbread',
//     calories: 356,
//     fat: 16.0,
//     carbs: 49,
//     protein: 3.9,
//     sodium: 327,
//     calcium: '7%',
//     iron: '16%'
//   },
//   {
//     name: 'Jelly bean',
//     calories: 375,
//     fat: 0.0,
//     carbs: 94,
//     protein: 0.0,
//     sodium: 50,
//     calcium: '0%',
//     iron: '0%'
//   },
//   {
//     name: 'Lollipop',
//     calories: 392,
//     fat: 0.2,
//     carbs: 98,
//     protein: 0,
//     sodium: 38,
//     calcium: '0%',
//     iron: '2%'
//   },
//   {
//     name: 'Honeycomb',
//     calories: 408,
//     fat: 3.2,
//     carbs: 87,
//     protein: 6.5,
//     sodium: 562,
//     calcium: '0%',
//     iron: '45%'
//   },
//   {
//     name: 'Donut',
//     calories: 452,
//     fat: 25.0,
//     carbs: 51,
//     protein: 4.9,
//     sodium: 326,
//     calcium: '2%',
//     iron: '22%'
//   },
//   {
//     name: 'KitKat',
//     calories: 518,
//     fat: 26.0,
//     carbs: 65,
//     protein: 7,
//     sodium: 54,
//     calcium: '12%',
//     iron: '6%'
//   }
// ]

// dialog
const addForm = ref({
  data: null,
  model: {
    item_no: null,
    item_name: null,
    price: null,
    eff_date_from: null,
    eff_date_to: null,
    tax:null
  },
  isEdit: false
})
const addFormItem_NoRef = ref(null)

const editForm = ref({
  data:null,
  model:{
    item_no: null,
    item_name: null,
    price: null,
    eff_date_from: null,
    eff_date_to: null,
    tax:null
  },
  isEdit: false
})
const delForm = ref(false)

const startDate = ref("年/月/日")
const startDateRef = ref(null)
const endDate = ref("年/月/日")
const endDateRef = ref(null)
const taxType = ref("")
const taxTypeRef = ref(null)
const taxOpt = ["应税","免税","零税"]

const onSubmit = () => {
  console.log("submit")
  item_Ref.value.validate()
}

const item_name = ref("")
const deleteOrNot = (props) => {
  delForm.value = true
  item_name.value = props.row["item_name"]

  if (delTrue.value == true) {
    deleteRow(props)
  }

}
const delTrue = ref(false)
const delConform = () => {
  // delTrue.value = true
  item_name.value = "哭阿"
}

const selected = []
const deleteRow = (props) => {
  var index = rows.indexOf(props.row)

  rows.splice(index,1)

  console.log(rows)

  nothingDialog()

  // pagination.value.rowsNumber = 
  // console.log(rows[0])
  // rows.splice(rows.indexOf(0), 1);
  // console.log(rows)

    //   let self = this;
    //   this.selected.filter(function(item){
    //     self.data.splice(self.data.indexOf(item), 1);
    //     return item;
    //   });
    //   this.selected = [];
    // },
    // deleteval(index){
    //   console.log(index)
    //   this.data.splice(index, 1);

    //   console.log(this.data)
    // }
}

const addDialog = () => {
  addForm.value.isEdit = true
}
const handleAdd = () => {
  // key ['item_no','item_name'...]
  // console.log(addForm.value.model[key])
  rows.push({
  "item_no": addForm.value.model["item_no"],
  "item_name": addForm.value.model["item_name"],
  "price": addForm.value.model["price"],
  "eff_date_from": addForm.value.model["eff_date_from"],
  "eff_date_to": addForm.value.model["eff_date_to"],
  "tax": addForm.value.model["tax"]
  })

  addForm.value.model["item_no"] = null
  addForm.value.model["item_name"] = null
  addForm.value.model["price"] = null
  addForm.value.model["eff_date_from"] = null
  addForm.value.model["eff_date_to"] = null
  addForm.value.model["tax"] = null
}

const editDialog = (props) => {
  editForm.value.isEdit = true

  console.log(props.row)
  // key ['item_no','item_name'...]
  for (let key in props.row) {
    editForm.value.model[key] = props.row[key]
  }

  // editForm.value.model.item_no = 10
  // console.log(editForm.value.model["item_no"])
  editForm.value.data = props
  
  console.log(editForm.value.data)
}
const handleEdit = () => {
  // console.log(editForm.value.model)
  // key ['item_no','item_name'...]
  for (let key in editForm.value.model) {
    editForm.value.data.row[key] = editForm.value.model[key]
    editForm.value.model[key] = null
  }
  
  // console.log(editForm.value.data.row['item_no'] = 10)
}

const nothingDialog = () => {
  addForm.value.isEdit = true
  addForm.value.isEdit = false
}

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const $q = useQuasar()

const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label))].concat(
    rows.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[ col.field === void 0 ? col.name : col.field ],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'table-export.csv',
    "\ufeff"+content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}

</script>
