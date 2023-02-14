<template>
  <q-page class="flex flex-center q-pt-lg">
    <q-table
      :grid="isGrid"
      :rows="resData.value"
      :columns="columns"
      row-key="id"
      :filter="filter"
      separator="cell">
      
      <template v-slot:top-right="props">
          <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

              <!-- <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="setFs(props)"
              > -->

              <!-- <q-btn
              flat
              round
              dense
              :icon="inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="inFullscreen"
              >
              <q-tooltip>{{
                inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}</q-tooltip>
              </q-btn> -->

              <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-md"
              ></q-btn>

            <q-btn
            flat
            round
            dense
            :icon="isGrid ? 'list' : 'grid_on'"
            @click="isGrid = !isGrid"
            >
            <q-tooltip>{{grid ? "Grid" : "List"}}</q-tooltip>
            </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-left"
          >
            <!-- {{ props.row[col.name] }} -->
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left"><span class="text-bold">內容:</span>{{ props.row.body }} </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <!-- <div>{{ resData.value }}</div> -->

  </q-page>
</template>

<script setup>
import { exportFile, Loading, useQuasar } from 'quasar'
import { ref, onMounted, reactive} from 'vue'
import axios from 'axios'

const filter = ref('')
const isGrid = ref(false)

const columns = ref([
  {
    name: 'userId',
    required: true,
    label: '用戶編號',
    align: 'left',
    field: row => row.userId,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'id', align: 'left', label: '編號', field: 'id', sortable: true },
  { name: 'title', align: 'center', label: '名稱', field: 'title', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rows = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    body: "SO Frozen"
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
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

const rows2 = ref([{
  name:"LTS",
  gender:"male"
}])


// function setFs(props){
//       props.toggleFullscreen()
//       fd.inFs = props.inFullscreen
//     }
// const setFs = (props) => {
//   props.toggleFullscreen()
//   fd.inFs = props.inFullscreen
// }


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


console.log(columns.value)
console.log([columns.value.map(col => wrapCsvValue(col.label))])

const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.value.map(col => wrapCsvValue(col.label))].concat(
    resData.value.map(row => columns.value.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[ col.field === void 0 ? col.name : col.field ],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  console.log(content)

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
