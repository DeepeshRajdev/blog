// import './App.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth from './appwrite/authentication';
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import './loader.css'

function App() {
  let [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.getAccount()
      .then(
        (userData) => {
          if (userData) {
            dispatch(login({ userData }))
          } else {
            dispatch(logout());
          }
        }
      )
      .catch(
        (err) => {
          console.log(`ERROR : ${err}`)
        }
      )
      .finally(() => setLoading(false));
  }, [])

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Header />
      <Outlet/>
      {/* <Footer /> */}

    </>
  );
}

export default App
