<template>
  <div class="header">
    <h1 class="header-title">Wizzards</h1>
    <a class="header-link" href="/#/SpellBuilder/">Spell Creator</a>
    <a class="header-link" href="/#/game/">Game</a>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  }
}
</script>

<style>
.header {
  background-color: #f3e8e8;
  text-align: left;
  width: 100%;
  max-width: 600px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 25px;
  color: #3f000b;
  height: 60px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.header-title,
.header-link {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}
.header-link {
  width: 160px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-size: 110%;
  float: right;
  border-radius: 10px;
  padding: 0 10px;
  margin: 0 10px;
}
.header-link:hover {
  background-color: #f3caca;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}
.header-title {
  text-shadow: -2px 2px white;
  padding: 0 20px;
}

@media screen and (max-width: 540px) {
  .header-link {
    padding: 0;
    margin: 0;
  }
}

@media screen and (max-width: 500px) {
  .header-link {
    font-size: 100%;
    width: 115px;
  }
}

@media screen and (max-width: 410px) {
  .header-title {
    padding: 0 0 0 10px;
    font-size: 160%;
    float: left;
  }
}

@media screen and (max-width: 360px) {
  .header-link {
    font-size: 90%;
    width: 95px;
  }
}
</style>