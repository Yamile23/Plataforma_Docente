
import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
const Inicio = () => {
    const history = useHistory();
    
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        //console.log("valor permios: " + JSON.parse(permisos));
        if (token === null) {
          history.push('/login');
        }
    }, [token]);



    return ( 
      
        <div>
            <div>
            <Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../carusel/imagen1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../carusel/imagen2.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="../carusel/imagen3.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
        
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>
        </div>
     );
}
 
export default Inicio;