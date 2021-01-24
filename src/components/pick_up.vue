<template>
  <form class="form" @submit.prevent="sendRequest">
    <div class="fields">
      <div class="fields__row">
        <div class="input-elem" :class="{'input-elem_error': errors.addr.length > 0}">
          <input type="radio" id="addr1" name="addr" value="addr1" v-model="addr">
          <label class="label" for="addr1">Пункт Выдачи заказов Песчаная улица, дом 13 </label>
          <span v-if="errors.addr.length > 0" class="error">{{errors.addr}}</span>
        </div>
        <div class="input-elem" :class="{'input-elem_error': errors.addr.length > 0}">
          <input type="radio" id="addr2" name="addr" value="addr2" v-model="addr">
          <label class="label" for="addr2">Пункт Выдачи заказов Подсосенский переулок, 11 </label>
          <span v-if="errors.addr.length > 0" class="error">{{errors.addr}}</span>
        </div>
      </div>
      <div class="fields__row">
        <yandex-map
          :coords="[55.75096654088406, 37.631893822753904]"
          zoom="11"
          :scroll-zoom="scrollZoom"
          style="width: 100%; height: 550px;"
          :controls="[]">
          <ymap-marker v-for="(mark, index) of marks" :key="index"
          markerId="index"
          :coords="mark"
          circle-radius="700"
          :marker-fill="{color: '#ffffff'}"
          />
        </yandex-map>
      </div>
      <div class="controls">
        <input type="submit" value="Отправить" class="controls__input">
      </div>
    </div>
  </form>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
  name: 'pick_up',
  components: {
    yandexMap,
    ymapMarker,
  },
  props: {
    marks: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    addr() {
      this.errors.addr = '';
    },
  },
  data() {
    return {
      scrollZoom: true,
      addr: '',
      errors: {
        addr: '',
      },
    };
  },
  methods: {
    sendRequest() {
      if (this.addr.length === 0) {
        this.errors.addr = 'Выберите адрес';
        return;
      }

      this.errors.addr = '';
      // eslint-disable-next-line no-alert
      alert('request sended');
    },
  },
  scrollStart() {
    this.scrollZoom = false;
  },
  mounted() {
    document.body.addEventListener('touchstart', this.scrollStart, false);
  },
  beforeDestroy() {
    document.body.removeEventListener('touchstart', this.scrollStart);
  },
};
</script>

<style scoped lang="scss">

</style>
