import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import CategoryExplorer from './components/CategoryExplorer/CategoryExplorer'
import ProductList from './components/ProductList/ProductList'
import Cart from './components/Cart/Cart'
import Favorites from './components/Favorites/Favorites'
import Footer from './components/Footer/Footer'
import ProductPage from './components/ProductPage/ProductPage'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryExplorer />
      <ProductList />
    </>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Cart />
      <Favorites />
      <Footer />
    </div>
  )
}
