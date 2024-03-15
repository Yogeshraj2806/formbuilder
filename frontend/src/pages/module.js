import axios from "axios"
import { useEffect, useState } from "react";

function Module(){
    const [data,setData] = useState();
    const ip = 'http://192.168.0.108:8000/';

    useEffect(()=>{
        try{
            axios.get(ip+"examserv/dynamic_table_master/")
            .then(response => {
                var t_field = JSON.parse(response.data);
                t_field.forEach(element => {
                    setData(element.fields.module_name);
                    console.log(data);
                })
                // setData(response.data.map(item => item.fields.module_name))
            })
            .catch(error => console.log(error))
        }catch(e){
            console.log("Doesn't Hit API")
        }
    },[]);
    return(
        <>
          <div>
            {/* {data.map((modulename,index)=>(
                <div key={index}>{modulename}</div>
            ))} */}
          </div>
        </>
    )
}
export default Module;