import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  Home,
  RootDash,
  DisciplineShow,
  DisciplineNew,
  Annotations,
  AnnotationEdit,
  AnnotationNew,
  AnnotationShow
} from './pages';

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
            <Route path='annotations'>
              <Route path='' element={<Annotations/>}/>
              <Route path=':id' element={<AnnotationShow/>} />
              <Route path='new' element={<AnnotationNew/>} />
              <Route path=':id/edit' element={<AnnotationEdit/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}