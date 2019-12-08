<template>
  <v-card class="mx-auto" max-height="250" outlined>
    <v-container>
      <p class="font-weight-medium caption ma-0 pa-0">{{ datetime }}</p>
      <a id="postLink" class="ma-0 pa-0">{{ title }}</a>
      <p class="body-1" v-if="bodyText.length >= 150"> {{ lengthCheck() }} </p>
      <p class="body-1" v-else> {{ bodyText }} </p>
      
    </v-container>
    
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      limit: 80,
      bodyText: '기술 스택 정하기 - 해당 기술을 고르면, 예를 들어 프레임워크면 해당 프레임워크를 고른 이유, 장점, 다른 프레임워크와의 차이점 정도는 알아두고 적어두기 2. 실제 생활에 불편한 점을 접목시켜 만들면 좋음 3. 꼭 배포해서 데모사이트 주소도 포트폴리오에 포함시키기 위해서',
      datetime: '2019년 3월 16일',
      title: '자바스크립트 개발자라면 알아야 할 33가지 개념 #1 콜스택 (번역)',
    }
  },
  computed: {
    
  },
  methods: {
    lengthCheck: function(){
      return this.bodyText + " ...";
    }
  }


}
</script>
<style scoped>
#postLink{
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
#postLink:hover {
  color: #0D47A1;
}
#postLink:active {
  color: #0D47A1;
}

</style>