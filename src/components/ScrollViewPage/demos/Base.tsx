import React from 'react'
import BasePng from '../vueDemos/Base.png'
import CodeDisplay from '../../../_components/CodeDisplay'

const ScrollViewPageBase = () => {
  return (
    <CodeDisplay
      imgSrcList={[BasePng]}
      code={DEMOS['ScrollViewPage\\vueDemos\\Base.vue']}
    ></CodeDisplay>
  )
}

export default ScrollViewPageBase
