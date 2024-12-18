import ScrollView from "./components/ScrollView/index.vue";
import TopFilter from "./components/TopFilter/index.vue";
import Card from "./components/Card/index.vue";
import RingChart from "./components/RingChart/index.vue";
import ScrollViewPage from "./components/ScrollViewPage/index.vue";
import StatisticCard from './components/StatisticCard/index.vue'
import Item from './components/Item/index.vue'
import Description from './components/Description/index.vue'
export * from '../packages/utils'

const install = (app) => {
  app.component("ScrollView", ScrollView);
  app.component("TopFilter", TopFilter);
  app.component("Card", Card);
  app.component("RingChart", RingChart);
  app.component("ScrollViewPage", ScrollViewPage);
  app.component("StatisticCard", StatisticCard)
  app.component("Description", Description)
  app.component("Item", Item)
};

export default {
  install,
};


export {
  ScrollView,
  TopFilter,
  Card,
  RingChart,
  ScrollViewPage,
  Description,
  Item,
  StatisticCard,
}
