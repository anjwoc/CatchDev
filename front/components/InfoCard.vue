<template>
  <v-card
    id="card"
    :class="classType"
    width="18rem"
    height="12rem"
  >
    <div class="item-center">
      <p class="font-weight-bold info-card-text" style="font-size: 1.5rem;">{{info.title}}</p>
      <div class="d-flex row">
        <v-icon x-large color="white" style="margin-left: 3.7rem;">{{info.icon}}</v-icon>
        <v-spacer></v-spacer>
        <h2 style="font-size: 1.5rem; margin-right: 3.7rem;">{{info.number}}</h2>
      </div>
      <v-subheaeder class="info-card-desc">{{info.desc}}</v-subheaeder>
    </div>
  </v-card>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        required: true,
      },
      infoType: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
      }
    },
    computed: {
      classType() {
        if (this.infoType === "green") return "bg-green";
        if (this.infoType === "purple") return "bg-purple";
        if (this.infoType === "orange") return "bg-orange";
        if (this.infoType === "cyan") return "bg-cyan";
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .info-card-desc {
    margin: 0 1.5rem 0 1.5rem;
    font-size: 0.85rem;
  }
  .bg-green {
    background: linear-gradient(135deg,#23bdb8 0,#43e794 100%) !important;
    color: #fff;
  }
  .bg-purple {
    background: linear-gradient(135deg,#9a56ff 0,#e36cd9 100%) !important;
    color: #fff;
  }
  .bg-orange {
    background: linear-gradient(135deg,#f48665 0,#fda23f 100%) !important;
    color: #fff;
  }
  .bg-cyan {
    background: linear-gradient(135deg,#289cf5,#84c0ec) !important;
    color: #fff;
  }
  .item-center {
    padding-top: 2rem;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    justify-items: center;
  }
  #card {
    border-radius: 5px;
    color: #fff;
    box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    border: 0;
    margin: 8px 0 25px 0;
    transition: all .3s ease-in-out;
  }
  .info-card-text {
    text-align: center;
  }
</style>