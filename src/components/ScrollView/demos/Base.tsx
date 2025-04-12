import React from 'react'
import CodeDisplay from '../../../_components/CodeDisplay'
import basePng from '../vueDemos/Base.png'

const ScrollViewBase = () => {
  return (
    <CodeDisplay
      imgSrcList={[basePng]}
      code={DEMOS['ScrollView/vueDemos/Base.vue']}
    ></CodeDisplay>
  )
}

export default ScrollViewBase
