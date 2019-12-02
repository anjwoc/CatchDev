<template>
  <v-card
    class="mx-auto"
    height="100%"
    width="100%"
  >
    <v-navigation-drawer
      class="white"
      width="100%"
      permanent
    >
      <v-list>
        <v-list-item>
          <h1>VelogClone</h1>
        </v-list-item>
        <v-list-item>
          <v-text-field
            label="검색"
            hide-details
            prepend-inner-icon='mdi-magnify'
            class="mt-4" 
            outlined
          />
        </v-list-item>
        <v-list-item
          class="tile"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title><p class="font-weight-bold pa-0 ma-0">{{ item.title }}</p></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <div align="end" justify="end">
          <p class="font-weight-black pa-2 pb-0">서비스 정책</p>
        </div>

      </template>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { title: '트렌딩', icon: 'mdi-trending-up' },
          { title: '최신 포스트', icon: 'mdi-clock-outline' },
          { title: '태그', icon: 'mdi-tag-outline' },
        ],
      }
    },
  }
</script>
<style scoped>
  .tile.hover {
    background: green;
  }
  .tile.action {
    background: yellow;
  }

</style>