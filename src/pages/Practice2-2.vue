<template>
  <div class="row">
    <div class="q-pa-md">
      <!-- 动态菜单 -->
      <q-list bordered style="width: 300px">
        <my-q-menu-item :my-router="menuList" :init-level="0" />
      </q-list>
    </div>
  </div>
</template>

<script>
import MyQMenuItem from "src/components/MyMenuItem.vue";

export default {
  components: {
    MyQMenuItem,
  },
  data() {
    return {
      menuList: [
        {
          MENU_ID: "MD0001",
          MENU_NAME: "测试",
          SEQ_NO: 1,
          PAGE: "",
          ICON: "format_size",
          PATH: "",
          children: [
            {
              MENU_ID: "MD0002",
              MENU_NAME: "测试1",
              SEQ_NO: 1,
              PAGE: "pages/Test1.vue",
              ICON: "directions",
              PATH: "",
              children: null,
            },
            {
              MENU_ID: "MD0003",
              MENU_NAME: "测试2",
              SEQ_NO: 2,
              PAGE: "pages/Test2.vue",
              ICON: "directions",
              PATH: "",
              children: null,
            },
          ],
        },
        {
          MENU_ID: "MD0004",
          MENU_NAME: "练习",
          SEQ_NO: 2,
          PAGE: "",
          ICON: "school",
          PATH: "",
          children: [
            {
              MENU_ID: "MD0005",
              MENU_NAME: "练习1",
              SEQ_NO: 1,
              PAGE: "pages/Practice1.vue",
              ICON: "directions",
              PATH: "",
              children: null,
            },
            {
              MENU_ID: "MD0006",
              MENU_NAME: "练习2",
              SEQ_NO: 2,
              PAGE: "pages/Practice2.vue",
              ICON: "directions",
              PATH: "",
              children: null,
            },
            {
              MENU_ID: "MD0007",
              MENU_NAME: "练习3",
              SEQ_NO: 3,
              PAGE: "pages/Practice3.vue",
              ICON: "directions",
              PATH: "",
              children: null,
            },
            {
              MENU_ID: "MD0008",
              MENU_NAME: "练习4",
              SEQ_NO: 4,
              PAGE: "pages/Practice4.vue",
              ICON: "directions",
              PATH: "",
              children: null,
            },
          ],
        },
      ],
    };
  },
};
</script>
