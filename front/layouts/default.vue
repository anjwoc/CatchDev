  
<template>
  <v-app id="keep">
    <floating-button />
    <v-app-bar
      app
      id="tab-color"
      clipped-left
    >
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer" />
      <div id="main-color" class="title pb-0 ml-3 mr-5">
        <nuxt-link class="amber--text" id="main-link" to="/">CatchDev StudyPlatform</nuxt-link>
      </div>
      <v-text-field
        solo-inverted
        flat
        dark
        hide-details
        label="Search"
        prepend-inner-icon="search"
        v-on:keyup.enter="onSearchPosts"
      />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      id="tab-color"
      app
      clipped
    >
      <v-list
        dense
        id="tab-color"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader class="menu-text" style="font-size: 15px;" v-if="item.heading">
                <v-icon class="amber--text mr-2">{{item.icon}}</v-icon>
                <div class="amber--text">{{ item.heading }}</div>
              </v-subheader>
            </v-col>
          </v-row>

          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />

          <v-list-item
            v-else
            :key="i"
            :to="item.to"
            active-class="yellow--text menu"
            link
          >
            <v-list-item-action>
              <v-icon class="amber--text">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="amber--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content
      fluid
      id="background"
      class="fill-height"
    >
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
  import FloatingButton from '~/components/FloatingButton';
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      searchWord: '',
      items: [
        { icon: 'mdi-home', text: 'Index', to: '/' },
        { icon: 'mdi-trending-up', text: 'Popular Study', to: '/popularStudy' },
        { icon: 'mdi-clock-outline', text: 'Recent Recruit', to: '/recentRecruit' },
        { divider: true },
        { icon: 'mdi-tag-multiple', text: 'Hashtags', to: '/tags' },
        { divider: true },
        { heading: 'Categorys', icon: 'mdi-table-of-contents' },
        { icon: 'mdi-alpha-l-box', text: '어학', to: '/category/어학' },
        { icon: 'mdi-briefcase', text: '취업', to: '/category/취업' },
        { icon: 'mdi-pencil', text: '고시', to: '/category/고시' },
        { icon: 'mdi-certificate', text: '자격증', to: '/category/자격증' },
        { icon: 'mdi-language-javascript', text: '프로그래밍', to: '/category/프로그래밍' },
        { icon: 'mdi-dots-horizontal', text: '기타', to: '/category/기타' },
      ],
    }),
    methods: {
      onSearchPosts(event) {
        this.$router.push({ path: `/post/search/${event.target.value}`});
      }
    },
    components: {
      FloatingButton,
    }
  }
</script>

<style>
#main-link{
  color: #A1A8B0;
  text-decoration: none;
}
.menu{
  background-color: rgb(77, 85, 92);
  color: rgb(216, 168, 19);
}
.menu-text{
  color: rgb(216, 168, 19);
}

#keep .v-navigation-drawer__border {
  display: none
}
#tab-color{
  background-color: #343D46;
}
#background{
  background-color: #38424B;
}
.main-color{
  text-decoration: none;
  color: #A1A8B0;
}
.card{
  background-color: #434F5B;
}
</style>