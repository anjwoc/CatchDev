<template>
  <v-container >
    <v-card
      max-width="410"
      max-height="450"
      height="450"
      outlined
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="190px"
      ></v-img>
      <v-card-text text style="position: relative">
        
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="white"
        >
          <v-avatar>
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </v-btn>
      </v-card-text>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mb-3 font-weight-regular" style="color: #7986CB;">ID: 테스트 계정</div>
          <h2 class="mb-1" style="font-size: 25px;">Headline 5</h2>
          <v-list-item-subtitle style="color: #90A4AE;">3일 전 / 6개의 댓글</v-list-item-subtitle>
          
          <v-container></v-container>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
      <v-card-subtitle class="mt-0 pt-0">
        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </v-card-subtitle>


    </v-card>
  </v-container>
</template>
<script>
export default {
  
}
</script>
<style scoped>

</style>