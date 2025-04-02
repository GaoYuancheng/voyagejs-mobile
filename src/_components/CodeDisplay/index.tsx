import { Col, Image, message, Row } from 'antd'
import React from 'react'
import { CopyOutlined } from '@ant-design/icons'
interface Props {
  code: string
  imgSrcList: string[]
}

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text).catch(err => {
    console.error('Failed to copy text: ', err)
  })
  message.success('复制成功')
}

const CodeDisplay: React.FC<Props> = ({ code, imgSrcList = [] }) => {
  return (
    <Row gutter={16} justify="space-between">
      <Col
        style={{
          width: 500,
          overflowX: 'auto',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          marginRight: 16,
          height: 450
        }}
      >
        {imgSrcList.map(item => (
          <Image
            style={{ width: 200, height: '100%' }}
            key={item}
            src={item}
          ></Image>
        ))}
      </Col>
      <Col style={{ width: 400 }}>
        <div style={{ textAlign: 'right' }}>
          <a onClick={() => copyToClipboard(code)}>
            <span style={{ marginRight: 4 }}>复制全部</span>
            <CopyOutlined />
          </a>
        </div>
        <pre
          style={{
            height: '400px',
            overflow: 'auto'
          }}
        >
          {code}
        </pre>
      </Col>
    </Row>
  )
}

export default CodeDisplay
