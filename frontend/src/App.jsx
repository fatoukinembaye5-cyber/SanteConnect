// App.jsx
import AppRouter from './routes/AppRouter';
import './index.css'; // Assure-toi que Tailwind est bien importé ici

function App() {
  return (
    <>
      {/* Vous pouvez basculer entre <AppRouter /> ou <AdminDashboard /> selon vos besoins réels */}
      <AdminDashboard />
    </>
  );
  
}

export default App;