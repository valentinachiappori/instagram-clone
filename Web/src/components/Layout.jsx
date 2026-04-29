import Navbar from './navBar'
import '../styles/Layout.css'

const Layout = ({ user, onLogout, children }) => {
    return (
        <div className="layout">
            <Navbar user={user} onLogout={onLogout} />
            <main className="layout-content">
                {children}
            </main>
        </div>
    )
}

export default Layout
