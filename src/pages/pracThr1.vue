<template>
  <q-page class="flex flex-center q-pt-lg">
    <q-table
      :grid="isGrid"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="userId"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <q-btn
    flat
    round
    dense
    :icon="isGrid ? 'list' : 'grid_on'"
    @click="isGrid = !isGrid"
    >
    <q-tooltip>{{grid ? "Grid" : "List"}}</q-tooltip>
    </q-btn>


  </q-page>
</template>

<script setup>
import { exportFile, Loading, useQuasar } from 'quasar'
import { ref, onMounted, reactive, computed} from 'vue'
import axios from 'axios'

const filter = ref('')
const isGrid = ref('false')

const columns = ref([
  {
    userId: 'userId',
    required: true,
    label: '用戶編號',
    align: 'left',
    field: row => row.userId,
    format: val => `${val}`,
    sortable: true
  },
  { userId: 'id', align: 'left', label: '編號', field: 'id', sortable: true },
  { userId: 'title', align: 'center', label: '名稱', field: 'title', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rows = ref([
  {
    name: 'Frozen Yogurt',
    id: 159,
    title: 6.0,
    body: "SO Frozen"
  },
  {
    name: 'Ice cream sandwich',
    id: 237,
    title: 9.0,
    body: "SO ICE"
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    body: "SO ECLAIR"
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    body: "SO CUP"
  },
  {
    name: 'LTS',
    calories: 1000,
    fat: 10,
    body: "SO LTS"
  },
  {
    name: 'RAN',
    calories: 999,
    fat: 9,
    body: "SO RAN"
  }
])

const rows2 = ref([
  {
  userId:"LTS",
  id:1,
  title:"Varus",
  body:"777"
  },
  {
  userId:"LTS1",
  id:"male",
  title:"Varus",
  body: "ddj"
  },
])

const resData = reactive({})
const getAxios = () => {
  axios.get(`http://jsonplaceholder.typicode.com/posts`
  ).then((res) => {
    resData.value = res.data
    console.log(resData.value[0])
  }).catch((error)=>{
    console.log(error, "getData failure")
  })
}
getAxios()

onMounted(()=>{
    axios.get(`http://jsonplaceholder.typicode.com/posts`
    ).then((res)=>{
        //獲取伺服器的回傳資料
        resData.value = res.data
        // resData.value = res.data[0]['userId']
    })
    .catch((error)=>{
        console.log(error,'失敗');
    })
})

// export CSV
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

console.log($q.screen.lt.md)
console.log($q.screen.xs)

// const isGrid = computed({
//       get: _ => attrs?.grid,
//       set: v => { emit('update:grid', v) }
//     })

const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.value.map(col => wrapCsvValue(col.label))].concat(
    rows.value.map(row => columns.value.map(col => wrapCsvValue(
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
