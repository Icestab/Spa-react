import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/index'
import Index from '../pages/index/index'
import Chart from '../pages/chart/index'
import User from '../pages/user/User'
import Setting from '../pages/setting/Setting'
export default function MyRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Index />}>
          <Route path='chart' element={<Chart />} />
          <Route path='user' element={<User />} />
          <Route path='setting' element={<Setting />} />
          <Route index element={<Chart />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </HashRouter>
  )
}
