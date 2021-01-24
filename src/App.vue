<template>
  <div id="app">
    <div class="content">
      <span class="header_h1">Выберите способ доставки</span>
      <Tabs :tabs="tabs" :activeTab="activeTab" @setActiveTab="setActiveTab">
        <template v-slot:tab1> <Delivery/> </template>
        <template v-slot:tab2> <PickUp :marks="marks"/> </template>
      </Tabs>
    </div>
  </div>
</template>

<script>
import Tabs from './components/tabs.vue';
import Delivery from './components/delivery.vue';
import PickUp from './components/pick_up.vue';

export default {
  name: 'App',
  components: {
    Tabs,
    Delivery,
    PickUp,
  },
  data() {
    return {
      activeTab: 0,
      tabs: ['Доставка', 'Самовывоз'],
      marks: [
        [55.801131, 37.508167],
        [55.757556, 37.651592],
      ],
    };
  },
  methods: {
    setActiveTab(tabIndex) {
      this.activeTab = tabIndex;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Monsterrat', sans-serif;;
  line-height: 26px;
  font-size: 14px;
}
</style>
