import Nav from '@components/Nav';
import '@styles/global.css'
import Provider from '@components/Provider';
// Metadata
export const metadata = {
    title : 'promptatia',
    description : 'Discover and Share AI Prompts'
}
const RootLayout = ({children}) => {
  return (
    <html lang = 'en'>
         <body>
            <Provider>
            <div className  = 'main'>
                <div className="gradient">

                </div>
            </div>
            <main className="app">
                <Nav/>
                {children}
            </main>
            </Provider>
         </body>
     </html>
  )
}

export default RootLayout;
