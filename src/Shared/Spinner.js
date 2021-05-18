
const Spinner = ({spinner})=>{
    return(  <>{spinner && <div className="bs-spinner">
        <div className="loader-box"> 
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <div>Loading please Wait...</div>
        </div>
   
  </div>}</>)
}
export default Spinner