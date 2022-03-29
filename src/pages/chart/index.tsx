import React from 'react'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { Calendar } from 'antd'
export default function App() {
  return <Calendar locale={locale} />
}
