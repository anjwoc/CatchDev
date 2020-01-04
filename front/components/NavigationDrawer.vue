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
          <nuxt-link to="/" style="text-decoration: none; color: black;"><h1>CatchDev</h1></nuxt-link>
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

        <v-treeview
          v-model="tree"
          class="font-weight-black mt-4"
          :open="open"
          :items="items"
          activatable
          hoverable
          item-key="name"
          open-on-click
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon class="mr-5" v-if="!item.file">
              {{ open ? 'mdi-menu-open' : 'mdi-menu' }}
            </v-icon>
            <v-icon class="mr-5" style="opacity: 0.75;" v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
          <template v-slot:label="{ item, open }">
            <nuxt-link id="titleLink" :to="item.to" v-if="item.to">{{ item.name }}</nuxt-link>
            <div v-else>{{ item.name }}</div>
          </template>
        </v-treeview>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div align="end" justify="end">
          <p class="font-weight-black pa-2 pb-0" style="font-size: 20px;">Contact</p>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        open: ['카테고리'],
        files: {
          trending: 'mdi-trending-up',
          new: 'mdi-clock-outline',
          category: 'mdi-table-of-contents',
          language: 'mdi-alpha-l-box',
          briefcase: 'mdi-briefcase',
          exam: 'mdi-pencil',
          certificate: 'mdi-certificate',
          programming: 'mdi-language-javascript',
          etc: 'mdi-dots-horizontal',
          allContents: 'mdi-collapse-all'
        },
        tree: [],
        items: [
          {
            name: '인기 스터디',
            file: 'trending',
            to: '/trending'
          },
          {
            name: '최신 스터디',
            file: 'new',
            to: '/new'
          },
          {
            name: '카테고리',
            children: [
              {
                name: '어학',
                file: 'language',
                to: '/category/language'
              },
              {
                name: '취업',
                file: 'briefcase',
                to: '/category/employ'
              },
              {
                name: '고시',
                file: 'exam',
                to: '/category/exam'
              },
              {
                name: '자격증',
                file: 'certificate',
                to: '/category/certificate'
              },
              {
                name: '프로그래밍',
                file: 'programming',
                to: '/category/programming'
              },
              {
                name: '기타',
                file: 'etc',
                to: '/category/etc'
              },
            ],
          },
          
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