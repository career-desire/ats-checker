import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Loader({ loading }) {
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
          src="https://lottie.host/0428a5c7-2be3-46e1-959e-a0884884de57/gO0pYmiiaf.lottie"
          loop
          autoplay
        />
        <h3>Analysing...</h3>
      </div>
    );
  }

  return null;
}

export default Loader;
