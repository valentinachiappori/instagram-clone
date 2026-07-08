import "../styles/components/LoadingSpinner.css";

const LoadingSpinner = () => (
    <div className="loading-screen">
        <div className="loading-spinner" />
        <span className="loading-text">Cargando...</span>
    </div>
);

export default LoadingSpinner;
