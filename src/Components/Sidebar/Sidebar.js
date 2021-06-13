
import { Link } from "@reach/router";
import "./sideBar.css";

const Sidebar = ({ location }) => {
    return (<div className="sideBarNav">
        <div className={`navMenu ${location.state.title === "HOME" ? 'active' : ''}`}>
            <Link to="/dashboard" state={{ title: "HOME" }}>
                <div><i className="fas fa-home"></i></div>
                <div className="side-bar-sty">Home</div>
            </Link>
        </div>
        <div className={`navMenu ${location.state.title === "REPORTS" ? 'active' : ''}`}>
            <Link to="report" state={{ title: "REPORTS" }}>
                <div><i className="fas fa-chart-line"></i></div>
                <div className="side-bar-sty">Reports</div>
            </Link>
        </div>
        <div className={`navMenu ${location.state.title === "SETTINGS" ? 'active' : ''}`}>
            <Link to="setting" state={{ title: "SETTINGS" }}>
                <div><i className="fas fa-cog"></i></div>
                <div className="side-bar-sty">Settings</div>
            </Link>
        </div>
    </div>)
}

export default Sidebar
