<template>
  <form class="form" @submit.prevent="sendRequest">
    <div class="fields">
      <div class="fields__row">
        <div class="input-elem" :class="{'input-elem_error': errors.fio}">
          <span class="input-elem__label">ФИО</span>
          <input v-model="fio"
            type="text"
            placeholder="Только кириллица"
            class="input-elem__input">
          <span class="error">{{errors.fio}}</span>
        </div>
        <div class="input-elem" :class="{'input-elem_error': errors.phone}">
          <span class="input-elem__label">Телефон</span>
          <input-mask v-model="phone"
            mask="+7 (999) 999-99-99"
            placeholder="+7 (___) ___-__-__"
            maskChar=" "
            class="input-elem__input"
            :class="{'input-elem_error': errors.phone}"/>
          <span class="error">{{errors.phone}}</span>
        </div>
      </div>
      <div class="fields__row">
        <div class="input-elem" :class="{'input-elem_error': errors.addr}">
          <span class="input-elem__label">Адрес доставки</span>
          <input v-model="addr"
            type="text"
            placeholder="Город, улица, дом"
            class="input-elem__input">
          <span class="error">{{errors.addr}}</span>
        </div>
      </div>
      <div class="fields__row">
        <div class="input-elem" :class="{'input-elem_error': errors.comment}">
          <span class="input-elem__label">Комментарий</span>
          <textarea v-model="comment"
            rows="6" class="input-elem__input"></textarea>
          <span class="error">{{errors.comment}}</span>
        </div>
      </div>
    </div>
    <div class="controls">
      <input type="submit" value="Отправить" class="controls__input">
    </div>
  </form>
</template>

<script>
export default {
  name: 'delivery',
  watch: {
    fio(value) {
      if (!value) {
        this.errors.fio = 'Это обязательное поле';
        return;
      }
      if (!/^[а-яА-ЯёЁ-\s]+$/.test(value)) {
        this.errors.fio = 'Только кириллица';
        return;
      }
      this.errors.fio = '';
    },
    phone(value) {
      if (!this.phone || this.phone.replace(/\s/g, '').length < 16) {
        this.errors.phone = 'Это обязательное поле';
        return;
      }

      if (/^\+?[7][(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(value)) {
        this.errors.phone = 'Только цифры';
        return;
      }

      this.errors.phone = '';
    },
    comment(value) {
      if (!value) {
        this.errors.comment = 'Это обязательное поле';
        return;
      }
      this.errors.comment = '';
    },
    addr(value) {
      if (!value) {
        this.errors.addr = 'Это обязательное поле';
        return;
      }
      this.errors.addr = '';
    },
  },
  data() {
    return {
      fio: '',
      phone: '',
      comment: '',
      addr: '',
      errors: {
        fio: '',
        phone: '',
        comment: '',
        addr: '',
      },
      isFormDataFilled: true,
    };
  },
  methods: {
    sendRequest() {
      const { isFormDataFilled, errors, ...data } = this.$data;
      let curDataFiiled = true;

      Object.keys(data).forEach((key) => {
        if (!data[key]) {
          this.errors[key] = 'Это обязательное поле';
          curDataFiiled = false;
        }
      });

      this.isFormDataFilled = curDataFiiled;

      if (!curDataFiiled) return;

      Object.values(this.errors).forEach((element) => {
        if (element.trim().length > 0) curDataFiiled = false;
      });

      if (!curDataFiiled) return;

      // eslint-disable-next-line no-alert
      alert('request sended');
    },
  },
};
</script>

<style scoped lang="scss">

</style>
