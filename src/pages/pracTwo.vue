<template>
  <q-page class="flex flex-center">
    <q-table
      title="Merchandise"
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="name">

      <template v-slot:top-right>
        <q-btn class="q-mr-sm" color="primary" label="新增" @click="onClick" />
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

            <!-- <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="setFs(props)"
            > -->

            <q-btn
              flat
              round
              dense
              :icon="'fullscreen'"
              >

              <q-tooltip>{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              dense
              :icon="grid ? 'list' : 'grid_on'"
              @click="grid = !grid"
            >
              <q-tooltip>{{grid ? "List" : "Grid"}}</q-tooltip>
            </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>

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
            <q-badge color="teal">
              {{ props.row.tax }}
            </q-badge>
          </q-td>
          <q-td key="calcium" :props="props">
            <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
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

  </q-page>

</template>

<script setup>
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue'
import json from '../assets/Practice2_Data.json'

// console.log(json[0]['item_no'])
//   "item_no": "01",
//   "item_name": "BCD-535WGHSSEDS9",
//   "price": "4200",
//   "eff_date_from": "2023-01-05",
//   "eff_date_to": "2024-02-05",
//   "tax": "应税"

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

const deleteRow = (event) => {
  event.target.parentElement.parentElement.remove();
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
