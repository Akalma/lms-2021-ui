import { forwardRef, useEffect, useState } from 'react';
import { Dropdown} from "react-bootstrap";
import { navigate,Link} from "@reach/router";
import './header.css'

  const Header = ({ location }) => {
  const [userDetails, setUserDetails] = useState({});
  const [open,setopen] = useState(false);
  const ICON_LOGOUT = <svg xmlns="http://www.w3.org/2000/svg" width="18.286" height="16" viewBox="0 0 18.286 16"><path fill="#111" className="a" d="M6.857,0V2.286H16V13.714H6.857V16H18.286V0ZM4.571,4.571,0,8l4.571,3.429V9.143h9.143V6.857H4.571Z" transform="translate(18.286 16) rotate(180)" /></svg>
  const userDetailsAvatar = JSON.parse(sessionStorage["userDetails"]);
  const userName = userDetailsAvatar.name
  const tempName=userName.slice(0,2);

  // This method user to clear sessionStorage and route to login page
  const logout = () => {
    try {
      sessionStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Exception occurred in logout -- ", err);
    }
  }

  // This works as initilizer - It'll be excuted once after initial rendering
  useEffect(() => {
    try {
      if (sessionStorage["userDetails"])
        setUserDetails(JSON.parse(sessionStorage["userDetails"]));
    } catch (err) {
      console.error("Exception occurred in initializer -- ", err);
    }
  }, []);

// -----For sidebar Roll back ---------//
  useEffect(() => {
    document.addEventListener('click', function (e) {
      if (e.target.id === "humber" || e.target.id === "header") {
        setopen(false);
      }
    });
  }, []);
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <div
      className="d-flex"
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>
      {children}
      &#x25bc;
    </div>
  ));
  return (<div className="header" id="header">
    <div>
      <div className="title">
        {location.state.title}
      </div>
      <div className="toogle-btn" onClick={() => { setopen(!open) }}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="d-flex">
        <div className={`bg-blue ${open ? 'humber-bg' : ''}`} id=""> </div>
        <div id="humber" className={`humber ${open ? 'humber-bg' : ''}`} >
          <div className="humber-body" id="humber-body" className={`humber-body ${open ? 'mx-0' : ''}`} >
            <ul className="side_bar">
            <div>
              <Link to="/dashboard" className="d-flex pb-3" onClick={() => { setopen(!open) }}state={{ title: "HOME" }}>
                <div className="side_bar_list "><i className="fas fa-home pr-3 "></i></div>
                <div className="side_bar_list" onClick={() => { setopen(!open) }}>Home</div>
              </Link>
              </div>
              <div>
              <Link to="report" className="d-flex pb-3" onClick={() => { setopen(!open) }}state={{ title: "REPORTS" }}>
                <div className="side_bar_list"><i className="fas fa-chart-line pr-3"></i></div>
                <div className="side_bar_list" onClick={() => { setopen(!open) }}>Reports</div>
              </Link>
              </div>
              <Link to="setting" className="d-flex pb-3"onClick={() => { setopen(!open) }} state={{ title: "SETTINGS" }}>
                <div className="side_bar_list"><i className="fas fa-cog pr-3"></i></div>
                <div className="side_bar_list" onClick={() => { setopen(!open) }}>Settings</div>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="d-flex admin_name ">
      <div className ="text-center">
        <div className="rounded mr-3">{tempName}</div>
      </div>
      <div className="droup">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <div>
              <div className="logo">
              </div>
              <div className="UserName">{`Hi, ${userDetails.name}`}</div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu as="div">
            <Dropdown.Item eventKey="1" className="logout" onClick={logout}>{ICON_LOGOUT} &nbsp;Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  </div>)
}

export default Header