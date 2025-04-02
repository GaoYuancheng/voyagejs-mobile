import React from 'react'
import BasePng from '../vueDemos/Base.png'
import Base1Png from '../vueDemos/Base1.png'
import CodeDisplay from '../../../_components/CodeDisplay'

const ScrollViewPageBase = () => {
  return (
    <CodeDisplay
      imgSrcList={[BasePng, Base1Png]}
      code={DEMOS['TopFilter\\vueDemos\\Base.vue']}
    ></CodeDisplay>
  )
}

export default ScrollViewPageBase
