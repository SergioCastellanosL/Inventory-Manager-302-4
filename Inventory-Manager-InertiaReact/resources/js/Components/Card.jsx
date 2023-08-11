import { useEffect } from "react";
import { Link } from '@inertiajs/react';

export default function Card({ className = '', ...props }) {
    let typeTwo= props.type2;
    if(props.data.client_id && props.type2 == 'item'){
        typeTwo= "client";
    }else if(!props.data.client_id && props.type2 == 'item'){
        typeTwo= "provider";
    }
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-4">
            <div className="p-3 text-gray-900 flex justify-evenly items-center">
                <div className="w-1/12">{props.data.id}</div>
                {
                    //console.log(props)
                    Object.entries(props.data).map(([key, value])=>{ 
                        let w="2";
                        if(key=="email"){
                            w="3";
                        }
                        return(
                    key!="id" && key!="created_at"&& key!="updated_at"?<div className={`w-${w}/12`} key={key}>{props.type2 != "item"?null:key=="client_id"?"Client-":key=="provider_id"?"Provider-":null}{value}</div>:null)})
                }
                {!props.data.total_price?<Link href={route("invoices",{type: props.type,id: props.data.id})} className="w-1/12 text-blue-600 text-center">invoices</Link>:null}
                <Link href={route("edit",{type: props.type, typeTwo:typeTwo, id: props.data.id})} className="w-1/12 text-yellow-600 text-center">edit</Link>
                <div className="w-1/12 text-red-600"><button onClick={()=>props.deleteEvent(props.data.id)}>delete</button></div>
            </div>
        </div>
    );
}
