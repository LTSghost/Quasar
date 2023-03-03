<template>
    <q-page class="q-ma-sm">

        <div class="q-mb-xs" style="padding: 30px; box-shadow: 1px 1px 1px 1px grey;">
            <div class="q-gutter-x-xl row q-mb-lg">
            <div class="col-3">  
                <q-input outlined v-model="itemNo" dense>
                    <template v-slot:before>
                        <span class="text-subtitle2" style="color: black;">{{ merchNo }}</span>
                    </template>
                </q-input>
            </div>
            <div class="col-3">  
                <q-input outlined v-model="itemName" dense >
                    <template v-slot:before>
                        <span class="text-subtitle2" style="color: black;">{{ merchName }}</span>
                    </template>
                </q-input>
            </div>
            <div class="col-3">
                <q-select
                    outlined
                    dense
                    lazy-rules
                    clearable 
                    v-model="taxParam" 
                    :options="taxOpt"
                >
                    <template v-slot:before>
                        <span class="text-subtitle2" style="color: black;">{{ texType }}</span>
                    </template>
                </q-select>
            </div>
            </div>

            <div class="q-gutter-x-xl row q-mb-lg">
                <div class="col-3">  
                    <q-input outlined v-model="effDateFrom" dense>
                        <template v-slot:before>
                            <span class="text-subtitle2" style="color: black;">{{ eff_date_from }}</span>
                        </template>
                    </q-input>
                </div>
                <div class="col-3">  
                    <q-input outlined v-model="effDateTo" dense 
                        :options="taxOpt"
                    >
                        <template v-slot:before>
                            <span class="text-subtitle2" style="color: black;">{{ eff_date_to }}</span>
                        </template>
                    </q-input>
                </div>
            </div>
        
            <div class="q-gutter-xs">
                <q-btn color="teal" :label="val.label" v-for="(val,index) in buttonObj" :key="index" @click="val.active"/>
            </div>
        </div>

        <div v-if="isQuery">
        <q-table
        :title="$t('pracTwoTitle')"
        :grid="isGrid"
        :rows="getData"  
        :columns="merchCol"
        :filter="filter"
        :pagination="pagination"
        separator="cell"
        row-key="name"
        :rows-per-page-options="[1,2,5,10]">

        <template v-slot:top-right="props">

            <q-btn class="q-mr-sm" color="primary" :label="$t('pracTwoAdd')" @click="addDialog" />

            <!-- filter input -->
            <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$t('pracTwoSearch')"
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
            :label="$t('pracTwoCSV')"
            no-caps
            @click="exportTable"
            />
        </template>

        <template v-slot:body="props">
            <q-tr :props="props">
            <q-td key="ITEM_NO" :props="props">
                {{ props.row.ITEM_NO }}
            </q-td>
            <q-td key="ITEM_NAME" :props="props">
                {{ props.row.ITEM_NAME }}
            </q-td>
            <q-td key="PRICE" :props="props">
                {{ props.row.PRICE }}
            </q-td>
            <q-td key="EFF_DATE_FROM" :props="props">
                {{ props.row.EFF_DATE_FROM }}
            </q-td>
            <q-td key="EFF_DATE_TO" :props="props">
                {{ props.row.EFF_DATE_TO }}
            </q-td>
            <q-td key="TAX_NAME" :props="props">
                <q-badge v-if="props.row.TAX_NAME === '應稅' || props.row.TAX_NAME === 'taxable'" color="green">
                {{ props.row.TAX_NAME }}
                </q-badge>
                <q-badge v-else-if="props.row.TAX_NAME === '免稅' || props.row.TAX_NAME === 'tax_free'" color="orange">
                {{ props.row.TAX_NAME }}
                </q-badge>
                <q-badge v-else color="secondary">
                {{ props.row.TAX_NAME }}
                </q-badge>
            </q-td>
            <q-td key="calcium" :props="props">
                <q-btn dense color="blue" @click="editDialog(props)" icon="edit"></q-btn>
                <!-- <q-btn dense color="red" @click="deleteRow(props.row)" icon="delete" class="q-ml-sm"></q-btn> -->
                <q-btn dense color="red" @click="deleteOrNot(props)" icon="delete" class="q-ml-sm"></q-btn>
            </q-td>
            </q-tr>
        </template>

        </q-table>
        </div>


        <div v-if="false">
        <q-table
        :title="$t('pracTwoTitle')"
        :grid="isGrid"
        :rows="rows"  
        :columns="columns"
        :filter="filter"
        :pagination="pagination"
        separator="cell"
        row-key="name"
        :rows-per-page-options="[1,2,5,10]">

        <template v-slot:top-right="props">

            <q-btn class="q-mr-sm" color="primary" :label="$t('pracTwoAdd')" @click="addDialog" />

            <!-- filter input -->
            <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$t('pracTwoSearch')"
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
            :label="$t('pracTwoCSV')"
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
                <q-badge v-if="props.row.tax === '应税'" color="green">
                {{ props.row.tax }}
                </q-badge>
                <q-badge v-else-if="props.row.tax === '免税'" color="orange">
                {{ props.row.tax }}
                </q-badge>
                <q-badge v-else color="secondary">
                {{ props.row.tax }}
                </q-badge>
            </q-td>
            <q-td key="calcium" :props="props">
                <q-btn dense color="blue" @click="editDialog(props)" icon="edit"></q-btn>
                <!-- <q-btn dense color="red" @click="deleteRow(props.row)" icon="delete" class="q-ml-sm"></q-btn> -->
                <q-btn dense color="red" @click="deleteOrNot(props)" icon="delete" class="q-ml-sm"></q-btn>
            </q-td>
            </q-tr>
        </template>

        </q-table>
        </div>

        <!-- addDialog -->
        <q-dialog v-model="addForm.isEdit">
        <q-card class="q-pa-lg" style="max-width: 500px; width: 100%">
            <h5 class="text-center text-bold q-mb-lg">{{ $t('pracTwoAddDialog') }}</h5>
            <div>
            <q-form
                @submit.prevent.stop="onSubmitAdd"
                class="q-gutter-md"
            >
                <!-- <div class="row q-col-gutter-md"> -->
                    <div class="col-12">
                    <q-input
                    outlined 
                    :label="$t('pracTwoItemNo') + ' *'" 
                    stack-label
                    :rules="itemNoRules"
                    v-model="addForm.model.item_no"
                    >
                    </q-input>
                    </div>
                    <div class="col-12">
                    <q-input :label="$t('pracTwoItemName') + ' *'" 
                    stack-label 
                    outlined
                    :rules="[val => !!val || '商品名稱不能為空']"
                    v-model="addForm.model.item_name"
                    ></q-input>
                    </div>
                    <div class="col-12">
                    <q-input :label="$t('pracTwoPrice') + ' *'" 
                    stack-label 
                    outlined 
                    v-model="addForm.model.price" 
                    :rules="[val => !!val || '商品價格不能為空',val => val >= 0 || '商品價格不能為負值']"
                    ></q-input>
                    </div>
                    <div class="col-12"> 
                    <q-input
                    ref="startDateRef"
                    outlined 
                    lazy-rules
                    :label="$t('pracTwoStartDay')"
                    stack-label=""
                    :placeholder="$t('pracTwoDayPlaceHolder')"
                    v-model="addForm.model.eff_date_from"
                    :rules="[(val) => !!val || '請輸入適用開始日',]">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="addForm.model.eff_date_from">
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
                    :label="$t('pracTwoEndDay') + ' *'"
                    stack-label=""
                    :placeholder="$t('pracTwoDayPlaceHolder')"
                    v-model="addForm.model.eff_date_to"
                    :rules="[(val) => !!val || '請輸入適用結束日']">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="addForm.model.eff_date_to">
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
                    :label="$t('pracTwoTax') + ' *'"
                    :rules="[val => !!val || '請選擇稅別']"/>
                </div>
                <!-- </div> -->
                <!-- <div class="col-6">
                <q-btn v-close-popup unelevated color="primary" class="full-width" label="新增" @click="handleAdd"></q-btn>
                </div>
                <div class="col-6">
                <q-btn v-close-popup unelevated color="grey-7" class="full-width" label="取消"></q-btn>
                </div> -->
                <div align="right">
                <q-btn label="新增" type="submit" color="primary"/>
                <q-btn v-close-popup label="取消" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            </div>
        </q-card>
        </q-dialog>

        <!-- editDialog -->
        <q-dialog v-model="editForm.isEdit">
        <q-card class="q-pa-lg" style="max-width: 500px; width: 100%">
            <h5 class="text-center text-bold q-mb-lg">{{ $t('pracTwoModifyDialog') }}</h5>
            <!-- <div class="row q-col-gutter-md">
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
            </div> -->
            <q-form
                @submit="onSubmitEdit"
                class="q-gutter-md"
            >
            <div class="row q-col-gutter-md">
                <div class="col-12">
                <q-input label="商品代號 *" readonly stack-label outlined v-model="editForm.model.item_no"></q-input>
                </div>
                <div class="col-12">
                <q-input label="商品名稱 *" stack-label outlined v-model="editForm.model.item_name"></q-input>
                </div>
                <div class="col-12">
                <q-input label="價格 *" 
                stack-label 
                outlined 
                v-model="editForm.model.price"
                :rules="[val => !!val || '商品價格不能為空',val => val >= 0 || '商品價格不能為負值']"
                ></q-input>
                </div>
                <div class="col-12"> 
                <q-input
                ref="startDateRef"
                outlined 
                lazy-rules
                label="適用開始日"
                v-model="editForm.model.eff_date_from"
                :rules="[(val) => !!val || '請輸入適用開始日',]">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editForm.model.eff_date_from">
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
                :rules="[(val) => !!val || '請輸入適用結束日',]">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editForm.model.eff_date_to">
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
                <!-- <div class="col-6">
                <q-btn v-close-popup unelevated color="primary" class="full-width" label="保存" @click="handleEdit"></q-btn>
                </div>
                <div class="col-6">
                <q-btn v-close-popup unelevated color="grey-7" class="full-width" label="取消"></q-btn>
                </div> -->
            </div>
                <div>
                <q-btn label="保存" type="submit" color="primary"/>
                <q-btn v-close-popup label="取消" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
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
            <!-- <q-card-section>
            idx {{ item_index }}
            </q-card-section> -->

            <q-card-actions align="right" class="text-primary">
            <q-btn flat label="取消" v-close-popup />
            <q-btn flat label="確認" @click="deleteRow(delete_index)" v-close-popup/>
            </q-card-actions>
        </q-card>
        </q-dialog>

    </q-page>

</template>

<script setup>
import { exportFile, useQuasar } from 'quasar'
import { ref, onMounted, reactive, watchEffect, watch, computed} from 'vue'
import { useI18n } from 'vue-i18n'
import json from '../assets/Practice2_Data.json'
import axios from 'axios'

const { t,locale } = useI18n({ useScope: 'global' })

const itemNo = ref('')
const itemName = ref('')
const taxParam = ref('')
const effDateFrom = ref('')
const effDateTo = ref('')


const queryAllparam = reactive({
    "TAX": ""
})

watch(taxParam,()=>{
    console.log("is taxParam.value");
    // QueryProductMethod(queryAllparam)
    axios
    .post(process.env.env_API + "/VueTest/QueryProduct", queryAllparam)
    .then((res) => {
        if (res.status == "200") {

            const mySet = new Set()

            // modify res.data
            /* ex:
            * EFF_DATE_FROM:"2023-01-05T00:00:00"
            * EFF_DATE_TO:"2024-02-05T00:00:00"
            * ITEM_NAME:"BCD-535WGHSSEDS9"
            * ITEM_NO:"01"
            * PRICE:4200
            * TAX_NAME:"零税"
            */
            res.data.forEach(element => {
                delete element.CREATE_TIME
                delete element.CREATOR
                delete element.UPDATE_TIME
                delete element.UPDATER
                delete element.TAX_LANGUAGE
                // delete element.TAX

                mySet.add(element.TAX)
            });

            const myArr = Array.from(mySet)

            // taxParam taxOpt
            const taxArr = myArr.map(item => {
                if (item == '3') {
                    return t('zero_tax')
                }
                if (item == '2') {
                    return t('tax_free')
                }
                if (item == '1') {
                    return t('taxable')
                }
            })

            console.log("array=",taxArr);
            console.log(res.data);

            taxOpt.value = taxArr

        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
})

const taxComputed = computed(() => {
    if (taxParam.value == '零稅' || taxParam.value == 'zero_tax') {
        return '3'
    }
    if (taxParam.value == '免稅' || taxParam.value == 'tax_free') {
        return '2'
    }
    if (taxParam.value == '應稅' || taxParam.value == 'taxable') {
        return '1'
    } else {
        return ""
    }
})

const param = reactive({
  "ITEM_NO": itemNo,
  "ITEM_NAME": itemName,
  "TAX": taxComputed,
  "EFF_DATE_FROM": effDateFrom,
  "EFF_DATE_TO": effDateTo
})

const getData = ref("")

const querySQL = () => {
    isQuery.value = true
    axios
    .post(process.env.env_API + "/VueTest/QueryProduct", param)
    .then((res) => {
        if (res.status == "200") {

            res.data.forEach(element => {
                delete element.CREATE_TIME
                delete element.CREATOR
                delete element.UPDATE_TIME
                delete element.UPDATER
                delete element.TAX_LANGUAGE
            });

            console.log(res.data);

            res.data.map(item => {
                if (item.TAX == '3') {
                    item.TAX_NAME = t('zero_tax')
                }
                if (item.TAX == '2') {
                    item.TAX_NAME = t('tax_free')
                }
                if (item.TAX == '1') {
                    item.TAX_NAME = t('taxable')
                }
            })

            getData.value = res.data

            console.log(getData.value);
            

        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
}
const clearSQL = () => {
    isQuery.value = false
}


// post/(per locale)
watch(locale, () => {
    console.log("is watch locale");
    QueryProductMethod(param)
})


const QueryProductMethod = (param) => {
    axios
    .post(process.env.env_API + "/VueTest/QueryProduct", param)
    .then((res) => {
        if (res.status == "200") {

            const mySet = new Set()

            // modify res.data
            /* ex:
            * EFF_DATE_FROM:"2023-01-05T00:00:00"
            * EFF_DATE_TO:"2024-02-05T00:00:00"
            * ITEM_NAME:"BCD-535WGHSSEDS9"
            * ITEM_NO:"01"
            * PRICE:4200
            * TAX_NAME:"零税"
            */
            res.data.forEach(element => {
                delete element.CREATE_TIME
                delete element.CREATOR
                delete element.UPDATE_TIME
                delete element.UPDATER
                delete element.TAX_LANGUAGE
                // delete element.TAX

                mySet.add(element.TAX)
            });

            const myArr = Array.from(mySet)

            // taxParam taxOpt
            const taxArr = myArr.map(item => {
                if (item == '3') {
                    return t('zero_tax')
                }
                if (item == '2') {
                    return t('tax_free')
                }
                if (item == '1') {
                    return t('taxable')
                }
            })

            console.log("array=",taxArr);

            res.data.map(item => {
                if (item.TAX == '3') {
                    item.TAX_NAME = t('zero_tax')
                }
                if (item.TAX == '2') {
                    item.TAX_NAME = t('tax_free')
                }
                if (item.TAX == '1') {
                    item.TAX_NAME = t('taxable')
                }
            })

            console.log(res.data);

            taxOpt.value = taxArr

            getData.value = res.data

        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
}
QueryProductMethod(param)


const merchCol = [
  {
    name: 'ITEM_NO',
    required: true,
    label: '商品代號',
    align: 'left',
    field: row => row.ITEM_NO,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'ITEM_NAME', align: 'center', label: '商品名稱', field: row => row.ITEM_NAME, sortable: true },
  { name: 'PRICE', label: '價格', field: 'PRICE',align:'center', sortable: true },
  { name: 'EFF_DATE_FROM', label: '適用開始日', field: 'EFF_DATE_FROM',align:'center',sortable: true },
  { name: 'EFF_DATE_TO', label: '適用結束日', field: 'EFF_DATE_TO',align:'center',sortable: true },
  { name: 'TAX_NAME', label: '稅別', field: 'TAX_NAME',align:'center',sortable: true },
  { name: 'calcium', label: '操作', field: 'calcium',align:'center'}
]

/*
// post/(per locale)
watchEffect(()=>{
    locale.value
    QueryProductMethod()
})
*/



const filter = ref('')
const isGrid = ref(false)
const rows = ref(json)

const isQuery = ref(false)

const $q = useQuasar()

const merchNo = ref("商品代號")
const merchName = ref("商品名稱")
const texType = ref("稅別")
const eff_date_from = ref("適用開始日")
const eff_date_to = ref("適用結束日")

const buttonObj = reactive([
    {
        label: "查詢",
        active: querySQL
    },
    {
        label: "清空",
        active: clearSQL
    },
    {
        label: "新增",
        active: querySQL
    }
])


// const taxOpt = ref(["应税","免税","零税"])
const taxOpt = ref("")



const itemNoRules = [
  val => !!val || '請輸入商品代號',
  val => (/^[0-9]+/.test(val)) || "請輸入數字",
  val => !allRowNo.includes(val) || "商品代碼已重複"
]

const pagination = ref({
      sortBy: 'name',
      descending: false,
      rowsPerPage: 5
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
  { name: 'price', label: '價格', field: 'price',align:'center', sortable: true },
  { name: 'eff_date_from', label: '適用開始日', field: 'eff_date_from',align:'center',sortable: true },
  { name: 'eff_date_to', label: '適用結束日', field: 'eff_date_to',align:'center',sortable: true },
  { name: 'tax', label: '稅別', field: 'tax',align:'center',sortable: true },
  { name: 'calcium', label: '操作', field: 'calcium',align:'center'}
]

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

const startDateRef = ref(null)
const endDateRef = ref(null)
const taxTypeRef = ref(null)

// delete dialog state
const delForm = ref(false)
const delete_name = ref("")
const delete_index = ref("")

const deleteOrNot = (props) => {
  delForm.value = true
  delete_name.value = props.row["item_name"]
  delete_index.value = rows.value.indexOf(props.row)
}
// conform delete row
const deleteRow = (delete_index) => {
  rows.value.splice(delete_index,1)
}


var allRowNo = []
const addDialog = () => {
  addForm.value.model["item_no"] = null
  addForm.value.model["item_name"] = null
  addForm.value.model["price"] = null
  addForm.value.model["eff_date_from"] = null
  addForm.value.model["eff_date_to"] = null
  addForm.value.model["tax"] = null

  allRowNo = []

  // create recent all rows item_no in an array
  for (let i = 0; i < rows.value.length; i++) {
    allRowNo.push(rows.value[i]['item_no'])
  }
  console.log(allRowNo);

  addForm.value.isEdit = true
}
const handleAdd = () => {
  // key ['item_no','item_name'...]
  // console.log(addForm.value.model[key])
  rows.value.push({
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
const onSubmitAdd = () => {
  console.log("submitAdd")

    // key ['item_no','item_name'...]
  // console.log(addForm.value.model[key])
  rows.value.push({
    "item_no": addForm.value.model["item_no"],
    "item_name": addForm.value.model["item_name"],
    "price": addForm.value.model["price"],
    "eff_date_from": addForm.value.model["eff_date_from"].replaceAll('/','-'),
    "eff_date_to": addForm.value.model["eff_date_to"].replaceAll('/','-'),
    "tax": addForm.value.model["tax"]
  })

  addForm.value.model["item_no"] = null
  addForm.value.model["item_name"] = null
  addForm.value.model["price"] = null
  addForm.value.model["eff_date_from"] = null
  addForm.value.model["eff_date_to"] = null
  addForm.value.model["tax"] = null

  addForm.value.isEdit = false
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
const onSubmitEdit = () => {
  // console.log(editForm.value.model)
  // key ['item_no','item_name'...]
  for (let key in editForm.value.model) {
    editForm.value.data.row[key] = editForm.value.model[key]
    editForm.value.model[key] = null
  }
  editForm.value.isEdit = false
}

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