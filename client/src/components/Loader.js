import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Loader({ loading, LoaderReport }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      navigate("/");
    }
  }, [loading, navigate]);

  if (loading) {
    return (
      <div className='loader-page'>
        <DotLottieReact
          src="https://lottie.host/be03d629-8e46-4af8-92df-b9368d0fdb74/YJfi4e7aWn.json"
          loop
          autoplay
        />
        <div className='loader-report'>
          {LoaderReport && <h3>{`${LoaderReport} . . .`}</h3>}
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return null;
}

export default Loader;
