import React from 'react'
import BasePng from '../vueDemos/Base.png'
import CodeDisplay from '../../../_components/CodeDisplay'

const DescriptionBase = () => {
  return (
    <CodeDisplay
      imgSrcList={[BasePng]}
      code={DEMOS['Description/vueDemos/Base.vue']}
    ></CodeDisplay>
  )
}

export default DescriptionBase
