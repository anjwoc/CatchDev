<template>
  <div>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-card outlined width="100%">
          <div>
            <p class="font-weight-black ma-0 pa-0">{{name}}</p>
            <v-btn class="font-weight-black ma-0 pa-0 ml-4" color="black" text v-on="on">
              {{ title === '' ? '선택' : title }}
              <v-icon>mdi-menu-swap</v-icon>
            </v-btn>
          </div>
        </v-card>
      </template>
      <v-card>
        <v-card-title>Select {{name}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list>
            <v-list-item
              v-for="(item, index) in Items"
              :key="index"
              @click="onSelectItem(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      Items: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        dialog: false,
        title: '',
        categoryDialog: false,
        
      }
    },
    methods: {
      onSelectItem(val){
        this.title = val;
        this.$emit('receive', val);
        this.dialog = false;
      }

    },

  }
</script>

<style scoped>

</style>