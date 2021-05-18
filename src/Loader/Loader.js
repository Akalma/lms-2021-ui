import { useReducer } from "react";

const ACTIONS={
    MAKE_REQUEST:'make_request',
    GET_DATA:'getdata',
    ERROR:'error'
}

const reducerName = (state , action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading:true,data:{}}
            case ACTIONS.GET_DATA:
            return {...state,loading:false,data:action.payload.data} 
            case ACTIONS.ERROR:
                return {...state,loading:false,error:action.payload.error,data:{}}
        default:
            return state
    }
}




export default function Loader() {
    const [state, dispatch] = useReducer(reducer, {data:{}, loading:true})
  
    return (
        <div>
            
        </div>
    )
}
