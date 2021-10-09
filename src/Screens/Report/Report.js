import React, { useState, useContext } from "react";
import APPCONSTANTS from '../../Constant/AppConstants';
import axios from 'axios';
import Pagination from "react-bootstrap/Pagination";
import useToast from "../../Hooks/Toast";
import "../../Assets/css/main_app.css";
import AppContext from "../../Store/AppContext";
import moment from "moment";

const Report = () => {
  const { spinner } = useContext(AppContext);
  const [toDate, setToDate] = useState(null);
  const cities = [
    {
      name: "Bengaluru",
      code: "BLR"
    },
    {
      name: "Chennai",
      code: "CHN"
    },
    {
      name: "Hyderabad",
      code: "HYD"
    }
  ]
  const [fromDate, setFromDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState({ name: "Hyderabad", code: "HYD" });
  const [list, setList] = useState([]);
  const [spin, setSpin] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const Toast = useToast();
  const pageLimit = 100;
  const preventMax = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]

  // ---session storage data-----////
  const userDetails = JSON.parse(sessionStorage["userDetails"]);
  const startPages = userDetails.startPage;

  // ----for Time and Date---//
  let tempFromDate = new Date(fromDate);
  tempFromDate.setHours(0, 0, 0);

  let tempToDate = new Date(toDate);
  tempToDate.setHours(23, 59, 59);

  const payload = {
    "fromDate": tempFromDate.getTime(),
    "toDate": tempToDate.getTime(),
    "noOfData": pageLimit,
    "startPage": 1,
    "id": (userDetails && userDetails.type !== 1 && userDetails.id) || null,
    "city": (userDetails && userDetails.type !== 1 && userDetails.city) || selectedCity?.code
  }
  // ----For fetchdata------//
  const fetchReports = async (isDownload = false, pageNo = 1) => {
    try {
      setSpin(isDownload);
      spinner.show()
      payload.startPage = pageNo;
      let API = (isDownload && APPCONSTANTS.APIS.DOWNLOAD_DATA) || APPCONSTANTS.APIS.VIEW_DATA;
      const { data } = await axios.post(API, payload);
      setLoading(false);
      spinner.hide()
      if (isDownload) {
        setSpin(false);
        download_csv(data);
      }
      else {
        setList(data);
      }
      if (data.length === 0) {
        Toast.error({ message: APPCONSTANTS.MESSAGES.ERROR.ERROR })
      }
    } catch (err) {
      spinner.hide()
      if (isDownload)
        spinner.hide()
      setSpin(false);
      Toast.error({ message: APPCONSTANTS.MESSAGES.ERROR.ERRORS, err });
    }
  }
  // pagination function------//
  const pagesData = async () => {
    try {
      const { data } = await axios.post(APPCONSTANTS.APIS.PAGINATION_COUNT, payload);
      let totalCount = data.count;
      let totalPage = Math.ceil(totalCount / pageLimit);
      setTotalPages(totalPage);
    } catch (err) {
      console.error("Exception occurred in pagination-- ", err)
    }
  }
  // -----pagination looping function-----//
  const paginations = (count) => {
    let val = []
    for (let i = 1; i <= count; i++) {
      val.push(<Pagination.Item className={`controls ${currentPage === i ? 'active' : ''}`}
        onClick={() => { fetchReports(false, i,); setCurrentPage(i) }}>{i}</Pagination.Item>)
    }
    return val;
  }
  // ----nextpage------//
  const nextPageUpdate = () => {
    let next = currentPage + 1;
    setCurrentPage(next);
    fetchReports(false, next);
  }
  //  -----lastpage-----//
  const lastpage = () => {
    let last = totalPages;
    setCurrentPage(last);
    fetchReports(false, last);
  }
  // -------previos page------///

  const previouspage = () => {
    let pre = currentPage - 1;
    setCurrentPage(pre);
    fetchReports(false, pre);
  }
  // -----first page----//
  const firstPage = () => {
    let first = startPages;
    setCurrentPage(1);
    fetchReports(false, 1)
  }

  // ---for arranging download csv file formate correctly-----//

  const download_csv = (data) => {
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
  }
  return (<><div className="page_container ">
    <div className="row  ">
      <div className="col-md-8 mt-1">
        <div className="report-header">
          <div className="flx ">
            <div className="form-group aic">
              <label htmlFor="fromDate" className="ml-2 from_date">From</label>
              <input type="date" onChange={(e) => setFromDate(e.target.value)} max={preventMax} name="fromDate" className="form-control form-control-sm ml-2 " />
            </div>
            <div className="form-group aic">
              <label htmlFor="toDate" className="from_date ml-2">To</label>
              <input type="date" max={new Date()} onChange={(e) => { setToDate(e.target.value); }} max={preventMax} name="toDate" className="form-control form-control-sm ml-2" />
            </div>
            {
              userDetails
              && userDetails.type === 1
              && <div className="form-group aic">
                <label htmlFor="city" className="from_date ml-2">City</label>
                <select className="form-control-sm ml-2" onChange={e => setSelectedCity(cities.find(c => c.code === e.target.value))}>
                  {
                    cities.map((city, idx) => <option key={idx} value={city.code} selected={city.code === selectedCity.code}>
                      {city.name}
                    </option>)
                  }
                </select>
              </div>
            }
          </div>
          <div className="">
            <div className=" form-group buttons text-right d-flex">
              <button type="submit" className={`reset_button ${(fromDate === null || toDate === null) ? 'disabled' : ''}`} onClick={() => {
                fetchReports();
                pagesData();
                setLoading(true);
              }} >
                VIEW
              </button>
              <button type="Download" className={`ml-2 reset_button ${(fromDate === null || toDate === null) ? 'disabled' : ''}`} onClick={() => { fetchReports(true); }}><span>DOWNLOAD</span></button>
            </div>
          </div>
        </div>
        <div class="table-responsive-md table_border">
          <table className="table ">
            <thead className="table_style">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Area</th>
                <th scope="col">Existing Broadband</th>
                <th scope="col">LeadType</th>
                <th scope="col">Created By</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody className="table-text table-Data ">
              {list.map((data, idx) => <tr key={idx}>
                <td >{`${data.firstName} ${data.lastName}`}</td>
                <td>{data.mobile}</td>
                <td>{data.area}</td>
                <td>{data.existingBroadband}</td>
                <td>{data.leadType}</td>
                <td>{data?.appUsersTo?.name || "NA"}</td>
                <td>{moment(data.date).format('MMMM Do, YYYY H:mma')}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        {list.length !== 0 && <div className="d-flex justify-content-sm-center  pagination">
          <Pagination>
            <Pagination.First className={`controls ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => firstPage()} />
            <Pagination.Prev className={`controls ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => previouspage()} />
            {paginations(totalPages)}
            <Pagination.Ellipsis />
            <Pagination.Next className={`controls ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => nextPageUpdate()} />
            <Pagination.Last className={`controls ${currentPage === totalPages ? ' disabled' : ''}`} onClick={() => lastpage()} />
          </Pagination>
        </div>}
      </div>
    </div>
  </div>
  </>)
}

export default Report;