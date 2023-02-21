<!-- 动态菜单 item 递归实现
   myRouter： 菜单列表
   initLevel： 菜单初始化缩进等级
   -->
<template>
  <div>
    <div v-for="(item, index) in myRouter" :key="index">
      <!-- 当没有子菜单时，结束递归 -->
      <div v-if="!item.children">
        <q-expansion-item
          :header-inset-level="initLevel"
          expand-icon="1"
          :to="item.PATH"
          :icon="item.ICON"
          :label="item.MENU_NAME"
          header-class="bg-cyan text-white"
          expand-icon-class="text-white"
        />
        <q-separator inset dark />
      </div>
      <!-- 子菜单依然存在时，继续递归 -->
      <div v-else>
        <q-expansion-item
          expand-separator
          :header-inset-level="initLevel"
          :to="item.PATH"
          :icon="item.ICON"
          :label="item.MENU_NAME"
          header-class="bg-teal text-white"
          expand-icon-class="text-white"
          group="my-menu-group"
        >
          <!-- 进入下一次递归 -->
          <my-q-menu-item
            :my-router="item.children"
            :init-level="initLevel + 0.3"
          />
        </q-expansion-item>
        <q-separator dark />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-q-menu-item",
  data() {
    return {};
  },
  props: ["myRouter", "initLevel"],
};
</script>
