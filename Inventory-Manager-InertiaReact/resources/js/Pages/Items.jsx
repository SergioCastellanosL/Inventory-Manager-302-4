import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Items({ auth }) {
    const [items, setItems] = useState([]);    
    const deleteEvent = (id) => {
        fetch(`http://127.0.0.1:8000/api/items/${id}`,{
            method: 'DELETE',
        })
        .then(response => {
            return response.json();
        })
        .then(getItems()
        );
    } ;
    const editEvent = ()=>{
        route('edit', type="client");
    };
    // Call this function to get products data 
    const getItems = () => {
        /* fetch API in action */
        fetch('http://127.0.0.1:8000/api/items',{
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${auth.}`,
            // }
        })
        .then(response => {
            return response.json();
        })
        .then(items => {
            //Fetched product is stored in the state 
            setItems(items);
        });
    };
    useEffect(() => {
        getItems();
     },[]); 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Items</h2>
            <Link href={route("add",{type: "item"})}>Add</Link></div>
        }
        >
            <Head title="Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex p-3 justify-evenly text-lg font-bold">
                        <div className="w-1/12">Id</div>
                        <div className="w-2/12">Name</div>
                        <div className="w-2/12">Price</div>
                        <div className="w-2/12">Total Amount</div>
                        <div className="w-1/12"></div>
                        <div className="w-1/12"></div>
                        <div className="w-1/12"></div>
                    </div>
                    {items.map(item=>{
                        return(<Card data={item} type="item" key={item.id} 
                        deleteEvent={deleteEvent}
                        editEvent={editEvent}></Card>)
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
