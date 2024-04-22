import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../../client/pages/Main";
import NotFoundPage from "../../client/pages/NotFoundPage";
import Auth from "../../client/pages/Auth";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/main'); 
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="aton" element={<Auth />} />
          <Route path="main" element={<Main />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
