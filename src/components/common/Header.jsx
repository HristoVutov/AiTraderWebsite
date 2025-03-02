import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import LogoImg from "../../assets/img/logo.jpg";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
  const [active, setActive] = useState(false);
  const pathname = window.location.pathname;

  

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };


 
  
  useEffect(() => {
    if (pathname.includes("/whitepaper")) {
      setActive("/whitepaper");
    }
  }, []);
  

  return (
    <>
       <section
      >
            

   

<nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/accounts">Accounts</a>
        </li>   
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/strategies">Strategies</a>
        </li>       
      </ul>
    </div>
  </div>
</nav>
       
      </section>
    </>
  );
};

export default withRouter(Header);
