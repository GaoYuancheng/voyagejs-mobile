import React from 'react'
import CodeDisplay from '../../../_components/CodeDisplay'
import SelectedMode from '../vueDemos/SelectedMode.png'

const ScrollViewBase = () => {
  console.log(DEMOS)
  return (
    <CodeDisplay
      imgSrcList={[SelectedMode]}
      code={DEMOS['ScrollView/vueDemos/SelectedMode.vue']}
    ></CodeDisplay>
  )
}

export default ScrollViewBase
