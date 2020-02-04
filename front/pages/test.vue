  
<template>
  <v-app id="keep">
    <v-app-bar
      app
      id="tab-color"
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <p id="card-text" class="title pb-0 pt-4 ml-3 mr-5">
        CatchDev StudyPlatform
      </p>
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
              <v-subheader id="card-text" style="font-size: 15px;" v-if="item.heading">
                <v-icon id="card-text" class="mr-2">{{item.icon}}</v-icon>{{ item.heading }}
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
            link
          >
            <v-list-item-action>
              <v-icon id="card-text">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title id="card-text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container
        fluid
        id="background"
        class="fill-height"
      >
      <!-- 위에서 색상 지정하는게 내부부분 -->
        <v-row
          justify="center"
          align="center"
        >
          <nuxt />
          
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'mdi-trending-up', text: 'Popular Study' },
        { icon: 'mdi-clock-outline', text: 'Recent Recruit' },
        { divider: true },
        { heading: 'Categorys', icon: 'mdi-table-of-contents' },
        { icon: 'mdi-alpha-l-box', text: 'Language' },
        { icon: 'mdi-briefcase', text: 'Employment' },
        { icon: 'mdi-pencil', text: 'State Examination' },
        { icon: 'mdi-certificate', text: 'Certificate' },
        { icon: 'mdi-language-javascript', text: 'Programming' },
        { icon: 'mdi-dots-horizontal', text: 'etc' },
      ],
    }),
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
#tab-color{
  background-color: #343D46;
}
#background{
  background-color: #38424B;
}
#card-text{
  color: #A1A8B0;
}
.card{
  background-color: #434F5B;
}
.test-card{
  background-color: #434F5B;
  min-width: 600px;
  min-height: 100px;
}
</style>