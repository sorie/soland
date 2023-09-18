<template>
  <header 
      id="main__header" 
      class="main__header"
    >
      <router-link 
        to="/cont_list" 
        class="logo"
      >
      jeong sori
      </router-link>
      <ul 
        class="menu"
      >
        <router-link to="/cont_list">List</router-link>
        <router-link to="/cont_examples">Components</router-link>
        <router-link to="/cont_videoChat" 
          @click="notworking()">webRTC</router-link
        >
      </ul>
      <span 
        class="main__header-hide" 
        @click="headHide"
      >
        숨기기
      </span>
  </header>
</template>

<script>
export default {
  methods : {
    notworking() {
      return alert('오류 검사 중입니다.');
    }
  }
}
</script>