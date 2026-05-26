import { createContext, useContext, useState, useCallback } from 'react'
import '../styles/components/Toast.css'

const ToastContext = createContext(null)

export const useToast = () => useContext(ToastContext)

let nextId = 0

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback((message, type = 'error') => {
        const id = ++nextId
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
    }, [])

    const dismiss = (id) => setToasts(prev => prev.filter(t => t.id !== id))

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast-item toast-${toast.type}`}>
                        <span>{toast.message}</span>
                        <button className="toast-close" onClick={() => dismiss(toast.id)}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
