
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Home from "../Home/Home";
import Report from "../Report/Report";
import Setting from "../Setting/Setting";
import {Router} from '../../Shared/Router'

const Dashboard = ({location}) => {
    return (
    <div className="main-page">
        <div><Sidebar {...{location}}/></div>
        <div className="dashboard-page" id="dashboard">
            <Header location={location}/>
            <Router>
                    <Home path="/" />
                    <Report  path="report"/>
                    <Setting  path="setting"/>
            </Router>
        </div>
    </div>)
}

export default Dashboard