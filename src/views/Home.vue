<script>
import ScrollWrap from '@/components/common/ScrollWrap';
import HomeHeader from '@/components/home/HomeHeader';
import DemoList from '@/components/home/DemoList';

export default {
  name: 'Home',
  components: {
    ScrollWrap,
    HomeHeader,
    DemoList
  },
  computed: {
    demos() {
      return this.$router.options.routes[1].children
        .filter(demo => {
          return demo.path !== '';
        })
        .map(demo => {
          return {
            key: `demo-${demo.name}`,
            name: demo.name,
            path: `/demo/${demo.path}`
          };
        });
    }
  }
};
</script>

<template lang="pug">
transition(
  name = 'page'
  appear
  )
  .page
    HomeHeader(
      v-if = '!$store.state.isMobile'
      )  
    ScrollWrap.home-demolist
      HomeHeader(
        v-if = '$store.state.isMobile'
        )
      DemoList(
        :demos = 'demos'
        )
</template>

<style lang="scss" scoped>
.home-demolist {
  @include l-more-than-mobile {
    width: 50%;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
