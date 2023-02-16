<template>
  <q-page class="flex flex-center q-pt-lg">
    <q-table
      title="LTS table"
      :rows="LTSrow"
      :columns="[
        {
          name:'expand',
          label:'Expand',
          algin:'center'
        }
        ,
        {
          name:'id',
          label:'Identification',
          field: row => `ID: ${row.id}`,
          align:'center',
          sortable:true,
          classes:'bg-red',
          style:'border-bottom:2px solid yellow',
          headerClasses: 'bg-grey-7 text-white',
          headerStyle: 'font-size: 1.2em'
        },
        {
          name:'name',
          label:'Name',
          field: row => `ID: ${row.name}`,
          align:'center',
          sortable:true,
          classes:'bg-red',
        },
        {
          name:'email',
          label:'Email'
        }
        ]"
        row-key="id"
        separator="cell"
        :pagination="
        {
          sortBy:'name',
          rowsPerPage: 2
        }
        "
        :rows-per-page-options="[1,2,5]"
    >
    <!-- <template #body="props">
      <q-tr :props="props">
        <pre>{{ props }}</pre>
        <q-td :props="props" key="name">
          <q-btn>{{ props.row.name }}</q-btn>
          {{ props.row.name }}
        </q-td>
        <q-td  key="email">
          {{ props.row.email }}
        </q-td>
      </q-tr>
    </template> -->

    <template #body-cell-email="props">
      <q-td>
        <q-btn>{{ props.row.email }}</q-btn>
      </q-td>

    </template>

    </q-table>


    <div class="row">
      <div class="q-pa-md" style="max-width: 350px;">
        <q-list bordered class="rounded-borders" style="width:300px">
          <q-expansion-item
            expand-separator
            default-opened
            icon="email"
            label="Inbox"
            caption="Inbox caption"
            :duration="500"
            style="background-color:#009688; color: white;"
            expand-icon-class="text-white"
          >
            <q-separator color="white"/>
            <q-expansion-item
              header-inset-level="0.5"
              expand-separator
              expand-icon="1"
              icon="receipt"
              label="Receipts"
              style="background-color: #00bcd4; color: white;"
            />
            <q-separator color="white"/>
            <q-expansion-item
              header-inset-level="0.5"
              expand-separator
              expand-icon="1"
              icon="schedule"
              label="Postpond"
              style="background-color: #00bcd4; color: white;"
            />
          </q-expansion-item>


          <!-- expan-Test -->
          <q-expansion-item
            expand-separator
            default-opened
            :icon="ThirdTimePrac2Json[0]['ICON']"
            :label="ThirdTimePrac2Json[0]['MENU_NAME']"
            :duration="500"
            style="background-color:#009688; color: white;"
            expand-icon-class="text-white"
            group="groupA"
          >
            <q-separator color="white"/>

          <div v-for="(item, key) in ThirdTimePrac2Json[0]['children']" :key="key" >
            <div v-if="!item['children']">
              <q-expansion-item 
              :header-inset-level="initLevel"
              :icon="item['ICON']"
              :label="item['MENU_NAME']"
              :to="item['PAGE']"
              expand-icon="1"
              style="background-color: #00bcd4; color: white;"
              expand-icon-class="text-white"
              />
            </div>
            <div v-else>
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
            </div>
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
            <q-separator color="white"/>

          <div v-for="(item, key) in ThirdTimePrac2Json[1]['children']" :key="key" >
              <q-expansion-item 
              expand-separator
              :header-inset-level="0.5"
              :icon="item['ICON']"
              :label="item['MENU_NAME']"
              :to="item['PATH']"
              expand-icon="1"
              style="background-color: #00bcd4; color: white;"
              expand-icon-class="text-white"
              />            
          </div>
          </q-expansion-item>

        </q-list>
        
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          icon="explore"
          label="Counter"
          @show="startCounting"
          @hide="stopCounting"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              Counting: <q-badge color="secondary">{{ counter }}</q-badge>.
              Will only count when opened, using the show/hide events to control count timer.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>

  </q-page>


  
</template>

<script setup>
import { exportFile, Loading, useQuasar } from 'quasar'
import { ref, onMounted, reactive, computed} from 'vue'
import axios from 'axios'
import json from 'assets/Vue3ThirdTimePrac2.json'
import json2 from 'assets/Vue3ThirdTimePrac2.txt'

const initLevel = ref(0)

const ThirdTimePrac2Json = reactive(json)
console.log(ThirdTimePrac2Json[0])
console.log(ThirdTimePrac2Json[1])

const ThirdTimePrac2Txt = ref(json2)
console.log(ThirdTimePrac2Txt.value[0])

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
    id: 262,
    title: 16.0,
    body: "SO ECLAIR"
  },
  {
    name: 'Cupcake',
    id: 305,
    title: 3.7,
    body: "SO CUP"
  },
  {
    name: 'LTS',
    id: 1000,
    title: 10,
    body: "SO LTS"
  },
  {
    name: 'RAN',
    id: 999,
    title: 9,
    body: "SO RAN"
  }
])

const LTSrow = ref(
  [
      {
        id:1,
        name:'LTS',
        email:'LTS@gmail.com'
      },
      {
        id:2,
        name:'LTS2',
        email:'LTS2 @gmail.com'
      },
      {
        id:3,
        name:'aTS3',
        email:'LTS3@gmail.com'
      },
      {
        id:4,
        name:'LTS4',
        email:'LTS4@gmail.com'
      },
      {
        id:5,
        name:'LTS5',
        email:'LTS5@gmail.com'
      },
      {
        id:6,
        name:'LTS6',
        email:'LTS6@gmail.com'
      },
      ]
)
// const LTScol = ref([
//   {
//     name:id,
//     label:'Identification'
//   }
// ])

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
