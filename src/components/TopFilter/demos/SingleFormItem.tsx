import React from 'react'
import SingleFormItemPng from '../vueDemos/SingleFormItem.png'
import CodeDisplay from '../../../_components/CodeDisplay'

const SingleFormItem = () => {
  return (
    <CodeDisplay
      imgSrcList={[SingleFormItemPng]}
      code={DEMOS['TopFilter/vueDemos/SingleFormItem.vue']}
    ></CodeDisplay>
  )
}

export default SingleFormItem
