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
          <nuxt-link to="/" style="text-decoration: none; color: black;"><h1>VelogClone</h1></nuxt-link>
          <h1></h1>
          <!-- <nuxt-link>About</nuxt-link> -->
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
            <v-list-item-title>
              <nuxt-link 
                id="titleLink"
                class="font-weight-bold pa-0 ma-0" 
                :to = "item.to"
                style="text-decoration: none;"
              >
                {{ item.title }}
              </nuxt-link>
            </v-list-item-title>
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
          { title: '트렌딩', icon: 'mdi-trending-up', to: '/' },
          { title: '최신 포스트', icon: 'mdi-clock-outline', to: '/recent' },
          { title: '카테고리', icon: 'mdi-tag-outline', to: '/category' },
        ],
      }
    },
  }
</script>
<style scoped>
  #titleLink {
    text-decoration: none;
    color: black;
  }
  #titleLink:hover{
    color: #1565C0;
  }
  #titleLink:active{
    color: #1565C0;
  }

</style>