<template>
    <q-page class="q-ma-sm">

        <!-- upperSearchTable -->
        <div class="q-mb-xs" style="padding: 30px; box-shadow: 1px 1px 1px 1px grey;">
            <div class="q-gutter-x-xl row q-mb-lg">
            <div class="col-3">  
                <q-input outlined v-model="itemNo" dense>
                    <template v-slot:before>
                        <!-- <span class="text-subtitle2" style="color: black;"> {{ $t('merchNo') }} </span> -->
                        <span class="text-subtitle2" :class="themeChange ? 'text-black' : 'text-white' "> {{ $t('merchNo') }} </span>
                    </template>
                </q-input>
            </div>
            <div class="col-3">  
                <q-input outlined v-model="itemName" dense >
                    <template v-slot:before>
                        <span class="text-subtitle2" style="color: black;"> {{ $t('merchName') }} </span>
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
                        <span class="text-subtitle2" style="color: black;"> {{ $t('taxType') }} </span>
                    </template>
                </q-select>
            </div>
            </div>

            <div class="q-gutter-x-xl row q-mb-lg">
                <div class="col-3">  
                    <q-input outlined v-model="effDateFrom" dense
                        type="date"
                    >
                        <template v-slot:before>
                            <span class="text-subtitle2" style="color: black;"> {{ $t('eff_date_from') }} </span>
                        </template>
                    </q-input>
                </div>
                <div class="col-3">  
                    <q-input outlined v-model="effDateTo" dense 
                        type="date"
                    >
                        <template v-slot:before>
                            <span class="text-subtitle2" style="color: black;"> {{ $t('eff_date_to') }} </span>
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
                <q-input label="商品代號 *" readonly stack-label outlined v-model="editForm.model.ITEM_NO"></q-input>
                </div>
                <div class="col-12">
                <q-input label="商品名稱 *" stack-label outlined v-model="editForm.model.ITEM_NAME"></q-input>
                </div>
                <div class="col-12">
                <q-input label="價格 *" 
                stack-label 
                outlined 
                v-model="editForm.model.PRICE"
                :rules="[val => !!val || '商品價格不能為空',val => val >= 0 || '商品價格不能為負值']"
                ></q-input>
                </div>
                <div class="col-12"> 
                <q-input
                ref="startDateRef"
                outlined 
                lazy-rules
                label="適用開始日"
                v-model="editForm.model.EFF_DATE_FROM"
                :rules="[(val) => !!val || '請輸入適用開始日',]">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editForm.model.EFF_DATE_FROM">
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
                v-model="editForm.model.EFF_DATE_TO"
                :rules="[(val) => !!val || '請輸入適用結束日',]">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editForm.model.EFF_DATE_TO">
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
                v-model="editForm.model.TAX" 
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

        <!-- editSuccessed -->
        <q-dialog v-model="editForm.isSuccessed">
            <q-card style="width: 300px">
                <q-card-section >
                <div class="text-h6">{{ $t('merchEditTitle') }}</div>
                </q-card-section>

                <q-card-section class="q-pt-lg">
                    {{ updateSuccessedMsg }}
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat :label="$t('confirm')" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- deleteDialog -->
        <q-dialog v-model="delForm">
            <q-card>
                <q-card-section>
                <div class="text-h6">{{ $t('confirmDel') }}?</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ $t('confirmDel') }} : 
                    <br><br>
                    {{ $t('merchNo') }}： {{ delProps.ITEM_NO }}
                    <br>
                    {{ $t('merchName') }}： {{ delProps.ITEM_NAME }}
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
import { exportFile, Loading, useQuasar } from 'quasar'
import { ref, onMounted, reactive, watchEffect, watch, computed} from 'vue'
import { useI18n } from 'vue-i18n'
import json from '../assets/Practice2_Data.json'
import axios from 'axios'
import { useStore } from 'vuex'

const $store = useStore()
const { t,locale } = useI18n({ useScope: 'global' })

const itemNo = ref('')
const itemName = ref('')
const taxParam = ref('')
const effDateFrom = ref('')
const effDateTo = ref('')
const themeChange = ref(true)

watch(sessionStorage, () => {
    console.log("sessChange");
    themeChange.value = !themeChange.value
})

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
    }

    return ""
})

// query 
const param = reactive({
  "ITEM_NO": itemNo,
  "ITEM_NAME": itemName,
  "TAX": taxComputed,
  "EFF_DATE_FROM": effDateFrom,
  "EFF_DATE_TO": effDateTo
})

const getData = ref("")

const querySQL = () => {
    console.log("execute querySQL");
    isQuery.value = true
    axios
    .post(process.env.env_API + "/VueTest/QueryProduct", param)
    // .get("http://localhost:8080/api/v1/products")
    .then((res) => {
        if (res.status == "200") {

            res.data.forEach(element => {
                delete element.CREATE_TIME
                delete element.CREATOR
                delete element.UPDATE_TIME
                delete element.UPDATER
                delete element.TAX_LANGUAGE
            });

            console.log("responseData = ",res.data);

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
                item.EFF_DATE_FROM = item.EFF_DATE_FROM.replace('T00:00:00','')
                item.EFF_DATE_TO = item.EFF_DATE_TO.replace('T00:00:00','')
            })

            getData.value = res.data

            console.log("getData = ",getData.value);
            

        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })

    querySysrole()
}
const clearSQL = () => {
    console.log("execute clearSQL");

    itemNo.value = ""
    itemName.value = ""
    taxParam.value = ""
    effDateFrom.value = ""
    effDateTo.value = ""

    isQuery.value = false
}
const addSQL = (param) => {
    console.log("execute addSQL");

    addProductMethod(param)

    Loading.show({
          message: t('merchAddMsg')
    })
    setTimeout(() => {
        Loading.hide()
        querySQL()
    }, 500);

}
const updateSQL = (param) => {
    console.log("execute updateSQL");

    updateProductMethod(param)
    setTimeout(() => {
        querySQL()
    }, 300);
}
const deleteSQL = (param) => {
    console.log("execute deleteSQL");

    deleteProductMethod(param)
    setTimeout(() => {
        querySQL()
    }, 300);
}


const querySysrole = () => {
    axios.get("http://localhost:8080/api/v1/sysrole/search?query=")
    .then((res) => {
        if (res.status == "200") {
            console.log(res.data);
        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
}

console.log("new data:", getData.value);


// post/(per locale)
watch(locale, () => {
    console.log("execute watch locale");

    buttonObj[0].label = t('queryBtn')
    buttonObj[1].label = t('clearBtn')
    buttonObj[2].label = t('addBtn')

    merchCol.value[0].label = t('merchNo')
    merchCol.value[1].label = t('merchName')
    merchCol.value[2].label = t('merchPrice')
    merchCol.value[3].label = t('eff_date_from')
    merchCol.value[4].label = t('eff_date_to')
    merchCol.value[5].label = t('taxType')
    merchCol.value[6].label = t('operations')
    
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
                item.EFF_DATE_FROM = item.EFF_DATE_FROM.replace('T00:00:00','')
                item.EFF_DATE_TO = item.EFF_DATE_TO.replace('T00:00:00','')
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

const addProductMethod = (param) => {
    axios
    .post(process.env.env_API + "/VueTest/AddProduct", param)
    .then((res) => {
        if (res.status == "200") {
            console.log(res);
        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
    
}

const updateSuccessedMsg = ref('')
const updateProductMethod = (param) => {
    axios
    .post(process.env.env_API + "/VueTest/UpdateProduct", param)
    .then((res) => {
        if (res.status == "200") {
            updateSuccessedMsg.value = t('merchSuccessEdit')
            // querySQL()
            setTimeout(() => {
                editForm.value.isSuccessed = true
            }, 300);

        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
}

const deleteProductMethod = (param) => {
    axios
    .post(process.env.env_API + "/VueTest/DeleteProduct", param)
    .then((res) => {
        if (res.status == "200") {
            console.log(res);
        } else {
            popErrMsg("not found")
        }
    })
    .catch((error)=>{
        console.error(error.message)
        popErrMsg("not found")
    })
}


const merchCol = ref([
  {
    name: 'ITEM_NO',
    required: true,
    label: t('merchNo'),
    align: 'left',
    field: row => row.ITEM_NO,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'ITEM_NAME', align: 'center', label: t('merchName'), field: row => row.ITEM_NAME, sortable: true },
  { name: 'PRICE', label: t('merchPrice'), field: 'PRICE',align:'center', sortable: true },
  { name: 'EFF_DATE_FROM', label: t('eff_date_from'), field: 'EFF_DATE_FROM',align:'center',sortable: true },
  { name: 'EFF_DATE_TO', label: t('eff_date_to'), field: 'EFF_DATE_TO',align:'center',sortable: true },
  { name: 'TAX_NAME', label: t('taxType'), field: 'TAX_NAME',align:'center',sortable: true },
  { name: 'calcium', label: t('operations'), field: 'calcium',align:'center'}
])

/*
// post/(per locale)
watchEffect(()=>{
    locale.value
    QueryProductMethod()
})
*/



const filter = ref('')
const isGrid = ref(false)

const isQuery = ref(false)

const $q = useQuasar()


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
    ITEM_NO: null,
    ITEM_NAME: null,
    PRICE: null,
    EFF_DATE_FROM: null,
    EFF_DATE_TO: null,
    TAX:null
  },
  isEdit: false,
  isSuccessed: false
})

const startDateRef = ref(null)
const endDateRef = ref(null)
const taxTypeRef = ref(null)

// delete dialog state
const delForm = ref(false)
const delete_name = ref("")
const delete_index = ref("")

const delProps = ref('')
const deleteOrNot = (props) => {
  delForm.value = true
  console.log(props.row.ITEM_NO);

  delProps.value = props.row

  delete_name.value = props.row["item_name"]
  delete_index.value = rows.value.indexOf(props.row)
}
// confirm delete row
const deleteRow = (delete_index) => {
    console.log(delProps.value.ITEM_NO);

    var tmpParam = {
        "ITEM_NO": delProps.value.ITEM_NO
    }
    deleteSQL(tmpParam)

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
  for (let i = 0; i < getData.value.length; i++) {
    allRowNo.push(getData.value[i]['ITEM_NO'])
  }
  console.log(allRowNo);

  addForm.value.isEdit = true
}

const onSubmitAdd = () => {

    console.log("submitAdd")

    var taxText = addForm.value.model.tax
    if (taxText == '零稅' || taxText == 'zero_tax') {
        taxText = 3
    }
    if (taxText == '免稅' || taxText == 'tax_free') {
        taxText = 2
    }
    if (taxText == '應稅' || taxText == 'taxable') {
        taxText = 1
    }

    var tmpParam = {
        "ITEM_NO": addForm.value.model["item_no"],
        "ITEM_NAME": addForm.value.model["item_name"],
        "EFF_DATE_FROM": addForm.value.model["eff_date_from"].replaceAll('/','-'),
        "EFF_DATE_TO": addForm.value.model["eff_date_to"].replaceAll('/','-'),
        "PRICE": addForm.value.model["price"],
        "TAX": taxText,
        "CREATOR": $store.state.showcase.loginUser  
    }
    addSQL(tmpParam)

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
    console.log(key);
    
    if (key == 'TAX') {
        editForm.value.model.TAX = props.row.TAX_NAME
        continue
    }

    editForm.value.model[key] = props.row[key]
  }

  // editForm.value.model.item_no = 10
  // console.log(editForm.value.model["item_no"])
  editForm.value.data = props
  
  console.log(editForm.value.data)
}

const onSubmitEdit = () => {
    var taxText = editForm.value.model.TAX
    if (taxText == '零稅' || taxText == 'zero_tax') {
        taxText = '3'
    }
    if (taxText == '免稅' || taxText == 'tax_free') {
        taxText = '2'
    }
    if (taxText == '應稅' || taxText == 'taxable') {
        taxText = '1'
    }


    var tmpParam = {
        "ITEM_NO": editForm.value.model.ITEM_NO,
        "ITEM_NAME": editForm.value.model.ITEM_NAME,
        "PRICE": editForm.value.model.PRICE,
        "EFF_DATE_FROM": editForm.value.model.EFF_DATE_FROM,
        "EFF_DATE_TO": editForm.value.model.EFF_DATE_TO,
        "TAX": taxText,
        "UPDATER": $store.state.showcase.loginUser
    }
    

    console.log(editForm.value.model.TAX);
    console.log(tmpParam.TAX);
    console.log(tmpParam);

    updateSQL(tmpParam)

    // console.log(editForm.value.model)
    // key ['item_no','item_name'...]
    for (let key in editForm.value.model) {
    editForm.value.data.row[key] = editForm.value.model[key]
    editForm.value.model[key] = null
    }
    editForm.value.isEdit = false
}

const buttonObj = reactive([
    {
        label: t('queryBtn'),
        active: querySQL
    },
    {
        label: t('clearBtn'),
        active: clearSQL
    },
    {
        label: t('addBtn'),
        active: addDialog
    }
])

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
  const content = [merchCol.value.map(col => wrapCsvValue(col.label))].concat(
    getData.value.map(row => merchCol.value.map(col => wrapCsvValue(
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