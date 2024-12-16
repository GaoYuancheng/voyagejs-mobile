import InfoLine from "./components/InfoLine/index.vue";
import ScrollView from "./components/ScrollView/index.vue";
import TopFilter from "./components/TopFilter/index.vue";
import Card from "./components/Card/index.vue";
import RingChart from "./components/RingChart/index.vue";
import ScrollViewPage from "./components/ScrollViewPage/index.vue";
import StatisticCard from './components/StatisticCard/index.vue'
import Item from './components/Item'
import Description from './components/Item'

const install = (app) => {
  app.component("InfoLine", InfoLine);
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
  InfoLine,
  ScrollView,
  TopFilter,
  Card,
  RingChart,
  ScrollViewPage,
  Description,
  Item,
  StatisticCard
}
