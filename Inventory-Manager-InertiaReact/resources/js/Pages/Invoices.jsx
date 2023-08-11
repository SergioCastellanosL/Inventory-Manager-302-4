import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useSearchParams } from 'react';
import { Link } from '@inertiajs/react';

export default function Invoices({ auth, ...props }) {
    const [invoices, setInvoices] = useState([]);    
    // Call this function to get products data 
    let type= props.type ? props.type: "client";
    const deleteEvent = (id) => {
        fetch(`http://127.0.0.1:8000/api/${type}_invoices/${id}`,{
            method: 'DELETE',
        })
        .then(response => {
            return response.json();
        })
        .then(getInvoices()
        );
    } ;
    const editEvent = ()=>{
        route('edit', type="invoice");
    };
    const getInvoices = () => {
        /* fetch API in action */
        let url = `http://127.0.0.1:8000/api/${type}_invoices`;
        if(props.id != -100 && props.id != null){
            url = `http://127.0.0.1:8000/api/${type}s/invoices/${props.id}`;
        }
        fetch(url,{
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(invoices => {
            //Fetched product is stored in the state 
            setInvoices(invoices);
        });
    };
    useEffect(() => {
        getInvoices();
     },[]); 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>
            <Link href={route("add",{type: "invoice"})}>Add</Link></div>
        }
        >
            <Head title="Invoices" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex p-3 text-lg font-bold mb-3">
                        <div className="w-2/12">{type} {props.id!= -100 && props.id!=null?props.id:null} Invoices</div>
                        <div className='w-8/12'></div>
                        <Link href={route("invoices",{type: "client", id: -100})} className="w-1/12 text-center">Clients</Link>
                        <Link href={route("invoices",{type: "provider", id: -100})} className="w-1/12 text-center">Providers</Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex p-3 justify-evenly text-lg font-bold">
                        <div className="w-1/12">Id</div>
                        {type=="client"?<div className="w-2/12">Client Id</div>:null}
                        {type=="provider"?<div className="w-2/12">Provider Id</div>:null}
                        {type=="item"?<div className="w-2/12">Client/Provider Id</div>:null}
                        <div className="w-2/12">User Id</div>
                        <div className="w-2/12">Item Id</div>
                        <div className="w-2/12">Amount</div>
                        <div className="w-2/12">Total price</div>
                        <div className="w-1/12"></div>
                        <div className="w-1/12"></div>
                    </div>
                    {invoices.map(invoice=>{
                        return(<Card data={invoice} type="invoice" type2={type} key={invoice.id} 
                        deleteEvent={deleteEvent}
                        editEvent={editEvent}></Card>)
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
