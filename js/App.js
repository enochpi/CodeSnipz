function App() {
    const [currentPage, setCurrentPage] = useState("home");

    const handleNavigate = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPage = () => {
        if (currentPage === "projects") {
            return <ProjectsPage />;
        } else if (currentPage === "about") {
            return <AboutPage onNavigate={handleNavigate} />;
        } else {
            return <HomePage onNavigate={handleNavigate} />;
        }
    };

    return (
        <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            {renderPage()}
        </Layout>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)