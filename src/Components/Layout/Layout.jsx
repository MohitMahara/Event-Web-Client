import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({children}) =>{
   return(
    <>
      <Header/>
      <main className="h-dvh md:h-screen">
        {children}
      </main>
      <Footer/>
    </>
   )
}