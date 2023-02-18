<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title=""
        :rows="goodsData"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode == 'grid'"
        :filter="filter"
        :pagination="pagination"
        :loading="isLoading"
        color="primary"
        separator="cell"
      >
        <template v-slot:header="props">
          <q-tr :props="props" class="table-header">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:top-right="props">
          <q-btn
            @click="AddRow()"
            color="primary"
            label="新增"
            class="q-mr-xs"
          />

          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="search"
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
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
              {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
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
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
              {{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="ExportTable"
          />
        </template>
        <template v-slot:body-cell-tax="props">
          <q-td :props="props">
            <q-chip
              :color="
                props.row.tax == '应税'
                  ? 'green'
                  : props.row.tax == '免税'
                  ? 'orange'
                  : 'secondary'
              "
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >
              {{ props.row.tax }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                dense
                color="primary"
                icon="edit"
                @click="EditRow(props.row)"
              />
              <q-btn
                dense
                color="red"
                icon="delete"
                @click="DeleteData(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="quotes_dialog">
      <q-card style="width: 600px; max-width: 60vw">
        <q-card-section>
          <div class="text-h6">
            {{ isAdd ? "新增资料" : "修改资料" }}
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
            <q-list>
              <q-item>
                <q-item-section>
                  <!-- <q-item-label class="q-pb-xs">商品代号</q-item-label> -->
                  <q-input
                    dense
                    outlined
                    v-model.lazy="dialogData.item_no"
                    label="商品代号 *"
                    :readonly="!isAdd"
                    :rules="[(val) => ValidItemNo()]"
                    :error-message="dialogData.err_item_no"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <!-- <q-item-label class="q-pb-xs">商品名称</q-item-label> -->
                  <q-input
                    dense
                    outlined
                    v-model="dialogData.item_name"
                    label="商品名称 *"
                    :rules="[(val) => !!val || '请输入商品名称']"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <!-- <q-item-label class="q-pb-xs">价格</q-item-label> -->
                  <q-input
                    dense
                    outlined
                    v-model="dialogData.price"
                    label="价格 *"
                    type="number"
                    input-class="text-right"
                    :rules="[(val) => !!val || '请输入价格']"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <!-- <q-item-label class="q-pb-xs">适用开始日</q-item-label> -->
                  <q-input
                    dense
                    outlined
                    v-model="dialogData.eff_date_from"
                    mask="date *"
                    label="适用开始日"
                    stack-label=""
                    type="date"
                    :rules="[(val) => !!val || '请输入适用开始日']"
                  >
                </q-input>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <!-- <q-item-label class="q-pb-xs">适用结束日</q-item-label> -->
                  <q-input
                    dense
                    outlined
                    v-model="dialogData.eff_date_to"
                    mask="date"
                    label="适用结束日 *"
                    stack-label=""
                    type="date"
                    :rules="[(val) => !!val || '请输入适用结束日']"
                  ></q-input>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <!-- <q-item-label class="q-pb-xs">税别</q-item-label> -->
                  <q-select
                    dense
                    outlined
                    clearable
                    v-model="dialogData.tax"
                    label="税别 *"
                    hint=""
                    :options="taxOptions"
                    lazy-rules
                    :rules="[(val) => !!val || '请选择税别']"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn
            label="保存"
            type="submit"
            @click="SaveData()"
            color="primary"
            v-close-popup="isClosePop"
          />
          <q-btn label="取消" type="button" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { exportFile, is, useQuasar } from "quasar";

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  return `"${formatted}"`;
}

function deepClone(obj) {
  if (obj === null) {
    return;
  }
  const newObj = obj.push ? [] : {}; // 如果obj有push方法则 定义newObj为数组，否则为对象。
  for (const attr in obj) {
    if (typeof obj[attr] === "object") {
      newObj[attr] = deepClone(obj[attr]);
    } else {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
}

export default {
  data() {
    return {
      filter: "",
      isLoading: false,
      //是否为新增
      isAdd: false,
      //是否关闭弹窗
      isClosePop: false,
      //是否显示弹窗
      quotes_dialog: false,
      //查询结果显示方式
      mode: "list",
      //税别
      taxOptions: ["应税", "免税", "零税"],
      //弹窗数据
      dialogData: {
        item_no: "",
        err_item_no: "",
        item_name: "",
        price: null,
        eff_date_from: null,
        eff_date_to: null,
        tax: ""
      },
      //查询结果table列名
      columns: [
        {
          name: "item_no",
          align: "left",
          label: "商品代号",
          field: "item_no",
          sortable: true
        },
        {
          name: "item_name",
          required: true,
          label: "商品名称",
          align: "left",
          field: "item_name",
          sortable: true
        },
        {
          name: "price",
          align: "right",
          label: "价格",
          field: "price",
          sortable: true
        },
        {
          name: "eff_date_from",
          align: "left",
          label: "适用开始日",
          field: "eff_date_from",
          sortable: true
        },
        {
          name: "eff_date_to",
          align: "left",
          label: "适用结束日",
          field: "eff_date_to",
          sortable: true
        },
        {
          name: "tax",
          align: "center",
          label: "税别",
          field: "tax",
          sortable: true
        },
        {
          name: "action",
          align: "left",
          label: "操作",
          field: "action"
        }
      ],
      //查询结果数据资料
      goodsData: [
        {
          item_no: "01",
          item_name: "BCD-535WGHSSEDS9",
          price: "4200",
          eff_date_from: "2023-01-05",
          eff_date_to: "2024-02-05",
          tax: "应税"
        },
        {
          item_no: "02",
          item_name: "BCD-178TMPT",
          price: "2550",
          eff_date_from: "2022-12-15",
          eff_date_to: "2023-04-15",
          tax: "免税"
        },
        {
          item_no: "03",
          item_name: "KFR-32GW/K(32556)D2-N5",
          price: "3800",
          eff_date_from: "2022-11-15",
          eff_date_to: "2023-06-30",
          tax: "应税"
        },
        {
          item_no: "04",
          item_name: "BCD-477WDPCU1",
          price: "3200",
          eff_date_from: "2022-11-10",
          eff_date_to: "2023-03-15",
          tax: "零税"
        },
        {
          item_no: "05",
          item_name: "BCD-545WFPB",
          price: "4000",
          eff_date_from: "2022-09-11",
          eff_date_to: "2023-06-25",
          tax: "免税"
        },
        {
          item_no: "06",
          item_name: "KFR-32GW/(32561)FNAa-2",
          price: "1200",
          eff_date_from: "2022-11-10",
          eff_date_to: "2023-03-15",
          tax: "零税"
        },
        {
          item_no: "07",
          item_name: "KFR-23GW/K(23556)D1-N1",
          price: "2200",
          eff_date_from: "2022-10-09",
          eff_date_to: "2023-03-23",
          tax: "应税"
        },
        {
          item_no: "08",
          item_name: "KFR-32GW/K(32556)D1-N2",
          price: "900",
          eff_date_from: "2022-11-12",
          eff_date_to: "2023-07-15",
          tax: "零税"
        }
      ],
      //分页设置
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  methods: {
    //验证商品号码
    ValidItemNo() {
      this.dialogData.err_item_no = "";
      if (!this.dialogData.item_no) {
        // 1. 不能为空
        this.dialogData.err_item_no = "请输入商品代号";
      } else {
        //新增时需要检核商品代号是否已存在
        if (this.isAdd) {
          for (var i = 0; i < this.goodsData.length; i++) {
            if (this.goodsData[i].item_no == this.dialogData.item_no) {
              this.dialogData.err_item_no = "商品代号已存在";
              break;
            }
          }
        }
      }
      return this.dialogData.err_item_no == "";
    },
    //汇出查询数据
    ExportTable() {
      const $q = useQuasar();

      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.goodsData.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("quotes.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "文档下载中...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    //开启新增商品弹窗
    AddRow() {
      this.dialogData = {
        item_no: "",
        err_item_no: "",
        item_name: "",
        price: null,
        eff_date_from: null,
        eff_date_to: null,
        tax: ""
      };

      this.isAdd = true;
      this.quotes_dialog = true;
    },
    //开启修改商品弹窗
    EditRow(data) {
      // this.dialogData = data;
      this.dialogData = deepClone(data);

      this.isAdd = false;
      this.quotes_dialog = true;
    },
    //保存数据
    SaveData() {
      this.$refs.dialogForm.validate().then((success) => {
        if (success) {
          if (this.isAdd) {
            this.goodsData.push(this.dialogData);
          } else {
            for (var i = 0; i < this.goodsData.length; i++) {
              if (this.goodsData[i].item_no == this.dialogData.item_no) {
                this.goodsData[i] = this.dialogData;
                break;
              }
            }
          }

          this.isClosePop = true;
        } else {
          this.isClosePop = false;
        }
      });
    },
    //删除数据
    DeleteData(row) {
      this.$q
        .dialog({
          title: "确认删除",
          message: "确认删除 " + row.item_name + " ?",
          ok: {
            label: "确认",
            push: true,
            color: "negative"
          },
          cancel: {
            label: "取消",
            push: true
          }
        })
        .onOk(() => {
          //将资料从数组中删除
          for (var i = 0; i < this.goodsData.length; i++) {
            if (this.goodsData[i].item_no == row.item_no) {
              this.goodsData.splice(i, 1);
              break;
            }
          }
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    }
  }
};
</script>
