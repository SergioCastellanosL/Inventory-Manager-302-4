import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect, useSearchParams } from "react";

export default function Edit({ auth, ...props }) {
    const [data, setData] = useState([]); 
    const [selection, setSelection] = useState();
    const [item, setItem] = useState([]);
    const type= props.type;
    const id= props.id;
    const getItem = () => {
        /* fetch API in action */
        fetch(`http://127.0.0.1:8000/api/items/${data.item_id}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(items => {
                //Fetched product is stored in the state 
                setItem(items);
                console.log(item.price, data.amount);
                let total= data.amount * items.price;
                setData({ ...data, total_price: total })
            });
    };
    const deleteEvent = (id) => {
        fetch(`http://127.0.0.1:8000/api/clients/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json();
            })
            .then(getClients());
    };
    // Call this function to get products data
    const getData = () => {
        /* fetch API in action */
        console.log(props);
        let url = `http://127.0.0.1:8000/api/${props.type}s/${props.id}`;
        if(props.type == "invoice"){
            console.log(props.typeTwo);
            if(props.typeTwo == "client"){
                setSelection("Client");
                url = `http://127.0.0.1:8000/api/client_${props.type}s/${props.id}`;
            }else if(props.typeTwo == "provider"){
                setSelection("Provider");
                url = `http://127.0.0.1:8000/api/provider_${props.type}s/${props.id}`;
            }
        }
        fetch(url,{
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
            .then((data) => {
                //Fetched product is stored in the state
                setData(data);
            });
    };

    const handleChange = (event)=> {
        if(event.target.name == "select"){
            setSelection(event.target.value);
        }else{
            setData({ ...data, [event.target.name]: event.target.value });
        }
      }
    const handleSubmit = ()=>{
        let url = `http://127.0.0.1:8000/api/${props.type}s/${props.id}`;
        if(props.type == "invoice"){
            if(selection == "Client"){
                url = `http://127.0.0.1:8000/api/client_${props.type}s/${props.id}`;
            }else if(selection == "Provider"){
                url = `http://127.0.0.1:8000/api/provider_${props.type}s/${props.id}`;
            }
        }
        console.log(url);
        console.log(data);
        try {
            fetch(url,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                //Fetched product is stored in the state
                const loc = props.type + "s";
                if(selection == "Client"){
                    window.location.href = route(loc,{type:"client",id: -100});
                }else if(selection == "Provider"){
                    console.log("provider route");
                    window.location.href = route(loc) +"?type=provider";;
                }else{
                    window.location.href = route(loc);
                }
            });
        } catch (error) {
            
        }
        
    }
    useEffect(() => {
        if(data.item_id && data.amount && props.type =="invoice"){
            getItem();
        }else if(!data.id){
            console.log("datas");
            getData();
        }
     },[data.amount, data.item_id]); 

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit {props.type}
                </h2>
            }
        >
            <Head title={props.type} />

            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex p-3 justify-evenly text-lg font-bold">
                        <form
                            className="space-y-[8px] w-400"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4 w-200 flex justify-center  items-center">
                                <h3>ID: {data.id}</h3>
                                <div className="w-1/2"></div>
                            </div>
                            {data.name ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300 "
                                    />
                                </div>
                            ) : null}
                            {data.address ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Adress:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            {data.price ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Price:{" "}
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            {data.first_name ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        First Name:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            {data.last_name ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Last Name:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            {data.email ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block  text-gray-700 mr-3  w-24 text-right">
                                        Email:{" "}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            {data.phone ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Phone:{" "}
                                    </label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            {type == "invoice" ?
                                <div>
                                    <fieldset>
                                        <legend>Invoice Type:</legend>
                                        <div>
                                            {selection=="Client"?<input type="radio" name="select" value="Client" onChange={handleChange} checked />:<input type="radio" name="select" value="Client" onChange={handleChange} />}
                                            <label >Client</label>
                                        </div>
                                        <div>
                                        {selection=="Provider"?<input type="radio" name="select" value="Provider" onChange={handleChange} checked />:<input type="radio" name="select" value="Provider" onChange={handleChange} />}
                                            <label >Provider</label>
                                        </div>
                                    </fieldset>
                                </div>
                                : null}
                            {type == "invoice" ?
                                <div>
                                    <label>{selection} Id: </label>
                                    {selection =="Client" ? <input type="number" name="client_id" value={data.client_id} onChange={handleChange} /> : null}
                                    {selection =="Provider" ? <input type="number" name="provider_id" value={data.provider_id} onChange={handleChange} /> : null}
                                </div>
                                : null}
                            {type == "invoice" ?
                                <div>
                                    <input type="number" name="user_id" value={data.user_id} onChange={handleChange} hidden />
                                </div>
                                : null}
                            {type == "invoice" ?
                                <div>
                                    <label>Item Id: </label>
                                    <input type="number" name="item_id" value={data.item_id} onChange={handleChange} />
                                </div>
                                : null}
                            {type == "invoice" ?
                                <div>
                                    <label>Amount: </label>
                                    <input type="number" name="amount" value={data.amount} onChange={handleChange} />
                                </div>
                                : null}
                            {type == "invoice" ?
                                <div>
                                    <label>Total Price: </label>
                                    <input type="text" name="total_price" value={data.total_price} onChange={handleChange} disabled />
                                </div>
                                : null}
                            <div className="mb-4 w-200 flex justify-center items-center ">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
