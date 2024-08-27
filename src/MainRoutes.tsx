import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Login, Home, RootDash, DisciplineShow, DisciplineNew } from './pages';

function ProtectedRoute({ children }:any) {
  const logged = true;

  if (!logged) {
    return <Navigate to={'/'} replace/>;
  }


  return children ? children : <Outlet/>;
}

export default function MainRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} index/>
        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<RootDash/>} >
            <Route path='' element={<Home/>}/>
            <Route path='disciplines'>
              <Route path=':id' element={<DisciplineShow/>}/>
              <Route path='new' element={<DisciplineNew/>}/>
              <Route path=':id/edit' element={<>Editar metéria</>}/>
            </Route>

            <Route path='themes/:id/edit' element={<>Editar tema</>} />
            <Route path='annotations' element={<>Minhas anotações</>}>
              <Route path='new' element={<>Nova anotação</>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}