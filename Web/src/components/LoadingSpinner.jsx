const LoadingSpinner = () => (
    <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: '#8e8e8e',
        }}>
            Cargando...
        </span>
    </div>
);

export default LoadingSpinner;
