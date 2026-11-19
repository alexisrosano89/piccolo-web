import { useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css';

const Dependency = () => {

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-back',
      duration: 1000,
      once: true,
      disable: window.innerWidth < 768
    });
  }, [])

  return (
    <>
    </>
  );
};

export default Dependency;