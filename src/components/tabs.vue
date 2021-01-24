<template>
  <div class="tabs">
    <div class="tabs__header">
      <span v-for="(tab, index) of tabs" :key="index" class="label"
      :class="[
        { label_active: activeTab === index },
        { closed: isClosedTabs },
      ]"
      @click="setActiveTab(index)">
        {{tab}}
        <span class="icon-arrow"><arrow/></span>
      </span>
    </div>
    <div v-for="(slot, index) of $slots" :key="index"
        class="tabs__content"
        :class="[
        { tabs__content_active: isActiveTab(index) },
        { closed: isClosedTabs },
        ]">
      <slot :name="index"/>
    </div>

  </div>
</template>

<script>
import arrow from '../static/svg/arrow-down.svg?inline';

export default {
  name: 'Tabs',
  components: {
    arrow,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    slotsKeys() {
      return Object.keys(this.$slots);
    },
  },
  data() {
    return {
      isClosedTabs: false,
    };
  },
  methods: {
    setActiveTab(index) {
      if (!this.isClosedTabs && this.activeTab === index) {
        this.isClosedTabs = true;
        return;
      }
      this.isClosedTabs = false;

      this.$emit('setActiveTab', index);
    },
    isActiveTab(index) {
      return this.slotsKeys.findIndex((element) => element === index) === this.activeTab;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/css/variables.scss';

.tabs {

  &__header {
    display: inline-flex;

    .label {
      position: relative;
      cursor: pointer;
      user-select: none;
      padding: 30px 35px;
      background: #edeeef;
      border-radius: 10px 10px 0 0;

      &:after {
        border-radius: 0 10px;
        border-right: 2px solid #00000024;
        background: #edeeef;
        content: '';
        display: block;
        width: 70px;
        height: 100%;
        position: absolute;
        right: 1px;
        z-index: -1;
        -webkit-backface-visibility: hidden;
      }

      &:hover {
        color: #0096da;
      }

      &:after {
        top: 0;
        transform: skewX(22deg);
        transform-origin: 100% 0;
      }

      &_active {
        color: #0096da;
        background: white;
        pointer-events: none;
        z-index: 2;
        &:after {
          background: white;
        }
      }

      &:not(:first-child) {
        margin-left: 5px;
      }
      .icon-arrow{
        display: none;
        transition: 0.2s;
      }

    }
  }

  &__content {
    padding: 2rem;
    background: white;
    display: none;
    &_active {
      display: block;
    }
  }

}
@media (max-width: $breakpoint-tablet) {
    .tabs {
      &__header {
          display: grid;
          .label {
            display: none;
            border-radius: 0;

            &.closed {
              display: flex;
            }
            &:after {
              display: none;
            }
            .icon-arrow {
              display: block;
              margin: auto;
              margin-right: 0;
            }

            &_active {
              pointer-events: inherit;
              display: flex;
              .icon-arrow {
                transform: rotate(180deg);
                svg path {
                  fill: #0096da;
                }
              }

              &.closed {
                color: inherit;
                background: #edeeef;
                .icon-arrow {
                  transform: inherit;
                  svg path {
                    fill: rgb(130, 136, 162);
                  }
                }
              }
            }

            &:not(:first-child) {
              margin-left: 0;
            }
          }
      }

      &__content {
        &_active {
          &.closed {
            display: none;
          }
        }

      }
    }
}
</style>
