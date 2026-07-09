import "./index.css"; // Assure-toi que tailwind est bien importé ici
import AdminDashboard from "./Dashboard/AdminDashboard.jsx";
// Si vous utilisez un système de routes à l'avenir, importez AppRouter ici

function App() {
  return (
    <>
      {/* Vous pouvez basculer entre <AppRouter /> ou <AdminDashboard /> selon vos besoins réels */}
      <AdminDashboard />
    </>
  );
  
}

export default App;