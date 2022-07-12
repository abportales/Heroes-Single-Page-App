import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui'
import { DcPage, MarvelPage, HeroPage, SearchPage } from '../pages'

export const HeroesRoutes = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
                <Routes>
                    <Route path="marvel" element={<MarvelPage />} />
                    <Route path="dc" element={<DcPage />} />
                    <Route path="search" element={<SearchPage />} />
                    {/* esto se usa para redireccionar a una pagina cambiate
                    que va a tener la misma estructura pero diferente contenido
                    y evita, crear docenas de links */}
                    <Route path="hero/:id" element={<HeroPage />} />

                    <Route path="/" element={<Navigate to={"/marvel"} />} />
                </Routes>
            </div>
        </>
    )
}
