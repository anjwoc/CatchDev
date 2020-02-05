  
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
              <v-subheader id="main-color" style="font-size: 15px;" v-if="item.heading">
                <v-icon id="main-color" class="mr-2">{{item.icon}}</v-icon>{{ item.heading }}
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
            exact-active-class="menu"
            link
          >
            <v-list-item-action>
              <v-icon style="color: rgb(216, 168, 19);">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="menu-text">
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
  import FloatingButton from '~/components/FloatingButton'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'mdi-home', text: 'Index', to: '/' },
        { icon: 'mdi-trending-up', text: 'Popular Study', to: '/trending' },
        { icon: 'mdi-clock-outline', text: 'Recent Recruit', to: '/new' },
        { divider: true },
        { heading: 'Categorys', icon: 'mdi-table-of-contents' },
        { icon: 'mdi-alpha-l-box', text: 'Language', to: '/category/language' },
        { icon: 'mdi-briefcase', text: 'Employment', to: '/category/employ' },
        { icon: 'mdi-pencil', text: 'State Examination', to: '/category/exam' },
        { icon: 'mdi-certificate', text: 'Certificate', to: '/category/certificate' },
        { icon: 'mdi-language-javascript', text: 'Programming', to: '/category/programming' },
        { icon: 'mdi-dots-horizontal', text: 'etc', to: '/category/etc' },
      ],
    }),
    components: {
      FloatingButton
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