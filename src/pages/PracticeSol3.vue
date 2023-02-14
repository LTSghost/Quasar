<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title=""
        :rows="fetchData"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        :filter="filter"
        :pagination="pagination"
        :loading="loading"
        color="primary"
        separator="cell"
        @request="onRequest"
        no-data-label="查无资料"
      >
        <template v-slot:header="props">
          <q-tr :props="props" class="table-header">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                <span style="font-weight: bold">内容:</span>
                {{ props.row.body }}
              </div>
            </q-td>
          </q-tr>
        </template>

        <template v-slot:top-right="props">
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
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { exportFile, is, useQuasar } from "quasar";
import axios from "axios";

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

export default {
  data() {
    return {
      filter: "",
      loading: false,
      //是否为新增
      isAdd: false,
      //是否关闭弹窗
      isClosePop: false,
      //是否显示弹窗
      quotes_dialog: false,
      //查询结果显示方式
      mode: "list",
      //弹窗数据
      dialogData: {
        item_no: "",
        err_item_no: "",
        item_name: "",
        price: null,
        eff_date_from: null,
        eff_date_to: null,
        tax: "",
      },
      //查询结果table列名
      columns: [
        {
          name: "userId",
          align: "left",
          label: "用户编号",
          field: "userId",
          sortable: true,
        },
        {
          name: "id",
          label: "编号",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "title",
          align: "left",
          label: "名称",
          field: "title",
          sortable: true,
        },
        // {
        //   name: 'body',
        //   align: 'left',
        //   label: '内容',
        //   field: 'body'
        // }
      ],
      //查询结果数据资料
      fetchData: [],
      //分页设置
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  mounted() {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    onRefresh() {
      this.pagination.page = 0;
      this.onRequest({
        pagination: this.pagination,
        filter: undefined,
      });
    },
    async onRequest(props) {
      // this.loading = true;

      const config = {
        params: {},
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': true,
          // 'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
          // 'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
          "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
        responseType: "json",
        timeout: 50000,
      };

      await axios
        .get("http://jsonplaceholder.typicode.com/posts", config)
        .then((response) => {
          const { code, data } = response.data;
          if (response.status == "200" && response.data) {
            this.fetchData = response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    //汇出查询数据
    ExportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.fetchData.map((row) =>
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
          icon: "warning",
        });
      }
    },
  },
};
</script>
