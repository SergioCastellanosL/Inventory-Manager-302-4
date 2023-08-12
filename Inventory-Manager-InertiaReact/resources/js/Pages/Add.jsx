import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect, useSearchParams } from "react";

export default function Add({ auth, ...props }) {
    const [data, setData] = useState([]);
    const [selection, setSelection] = useState("Client");
    const [item, setItem] = useState([]);
    const [errors, setErrors]= useState({});
    const type = props.type;
    const getItem = () => {
        /* fetch API in action */
        fetch(`http://127.0.0.1:8000/api/items/${data.item_id}`, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                //Fetched product is stored in the state
                setItem(items);
                let total = data.amount * items.price;
                setData({ ...data, total_price: total });
            });
    };
    const handleChange = (event) => {
        if (event.target.name == "select") {
            setSelection(event.target.value);
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
            validateData(event.target);
        }
    };
    const validateData = (target)=>{
        console.log(target);
        if(target.value == ""){
            setErrors({...errors,[target.name]:"Field required"});
        }else{
            setErrors({ ...errors, [target.name]: "" })
            if(target.name == "name"||target.name == "first_name"||target.name == "last_name"||target.name == "address"){
                if(target.value.length<5){
                    setErrors({...errors, [target.name]:`${target.name} has to be longer than 5 characters`});
                }
                
            }
            if(target.name == "client_id"||target.name == "provider_id"||target.name == "item_id"||target.name == "amount"){
                if(parseInt(target.value)>0){
                    setErrors({...errors, [target.name]:`${target.name} has to be a valid id`});
                }
            }
            if(target.name == "email"){
                if(!target.value.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )){
                    setErrors({...errors, [target.name]:`${target.name} has to be in a valid format`});
                }
            }
        }
        

    }
    const checkValidation= ()=>{
        console.log("check val");
        console.log(errors)
        for (const [key, value] of Object.entries(data)) {
            console.log(key, value);
            if (value == '' && key != 'id') {
                setErrors({ ...errors, [key]: "Field required" });
                return false;
            }
        }
        
        if(Object.entries(errors)<1){
            return false;
        }
        for (const [key, value] of Object.entries(errors)) {
            if(value != ''){
                return false;
            }
        }
        return true;
    }
    const fetchFunc=()=>{
        let url = `http://127.0.0.1:8000/api/${props.type}s`;
        if (props.type == "invoice") {
            if (selection == "Client") {
                url = `http://127.0.0.1:8000/api/client_${props.type}s`;
            } else if (selection == "Provider") {
                url = `http://127.0.0.1:8000/api/provider_${props.type}s`;
            }
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //Fetched product is stored in the state
                const loc = props.type + "s";
                console.log(selection);
                if (selection == "Client") {
                    window.location.href = route(loc, {
                        type: "client",
                        id: -100,
                    });
                } else if (selection == "Provider") {
                    window.location.href = route(loc) + "?type:provider";
                }
                window.location.href = route(loc);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.length<1){
            console.log("out");
            setErrors({phone: "Fill the information on the inputs"});
            return;
        }else if(checkValidation()){
            fetchFunc();
        }

        
    };
    useEffect(() => {
        console.log("effect");
        if (data.amount && data.item_id && props.type == "invoice") {
            getItem();
        }
    }, [data.amount, data.item_id]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add {props.type}
                </h2>
            }
        >
            <Head title={props.type} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex p-3 justify-evenly text-lg font-bold">
                        <form
                            className="space-y-[8px] w-400"
                            onSubmit={handleSubmit}
                        >
                            {type == "provider" || type == "item" ? (
                                <div>
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
                                    <div className="text-red-700">{errors.name}</div>
                                    </div>

                            ) : null}
                            {type == "provider" ? (
                                <div>
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
                                    <div className="text-red-700">{errors.address}</div>
                                    </div>

                            ) : null}
                            {type == "item" ? (
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
                                    <div className="text-red-700">{errors.price}</div>
                                </div>
                            ) : null}
                            {type == "client" ? (
                                <div>
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
                                    <div className="text-red-700">{errors.first_name}</div>
                                    </div>

                            ) : null}
                            {type == "client" ? (
                                <div>
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
                                    <div className="text-red-700">{errors.last_name}</div>
                                    </div>

                            ) : null}
                            {type == "client" || type == "provider" ? (
                                <div>
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
                                    <div className="text-red-700">{errors.email}</div>
                                    </div>

                            ) : null}
                            {type == "client" || type == "provider" ? (
                                <div>

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
                                <div className="text-red-700">{errors.phone}</div>
                                </div>


                            ) : null}
                            {type == "invoice" ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <fieldset>
                                        <legend className="mb-4 w-200 flex justify-center items-center">
                                            Invoice Type:
                                        </legend>
                                        <div>
                                            {selection == "Client" ? (
                                                <input
                                                    type="radio"
                                                    name="select"
                                                    value="Client"
                                                    onChange={handleChange}
                                                    checked
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="select"
                                                    value="Client"
                                                    onChange={handleChange}
                                                />
                                            )}
                                            <label>Client</label>
                                        </div>
                                        <div>
                                            {selection == "Provider" ? (
                                                <input
                                                    type="radio"
                                                    name="select"
                                                    value="Provider"
                                                    onChange={handleChange}
                                                    checked
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    name="select"
                                                    value="Provider"
                                                    onChange={handleChange}
                                                />
                                            )}
                                            <label>Provider</label>
                                        </div>
                                    </fieldset>
                                </div>
                            ) : null}
                            {type == "invoice" ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        {selection} Id:{" "}
                                    </label>
                                    {selection == "Client" ? (
                                        <input
                                            type="number"
                                            name="client_id"
                                            value={data.client_id}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    ) : null}
                                    {selection == "Provider" ? (
                                        <input
                                            type="number"
                                            name="provider_id"
                                            value={data.provider_id}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    ) : null}
                                </div>
                            ) : null}
                            {type == "invoice" ? (
                                <div>
                                    <div className="mb-4 w-200 flex justify-center items-center">
                                        <input
                                            type="number"
                                            name="user_id"
                                            value={data.user_id}
                                            onChange={handleChange}
                                            hidden
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {type == "invoice" ? (
                                <div>
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Item Id:{" "}
                                    </label>
                                    <input
                                        type="number"
                                        name="item_id"
                                        value={data.item_id}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                    <div className="text-red-700">{errors.item_id}</div>
                                    </div>

                            ) : null}
                            {type == "invoice" ? (
                                <div>
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Amount:{" "}
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={data.amount}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="text-red-700">{errors.amount}</div>
                                </div>
                            ) : null}
                            {type == "invoice" ? (
                                <div className="mb-4 w-200 flex justify-center items-center">
                                    <label className="block text-gray-700 mr-3  w-24 text-right">
                                        Total Price:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="total_price"
                                        value={data.total_price}
                                        onChange={handleChange}
                                        disabled
                                        className="mt-1 p-2 border rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                            ) : null}
                            <div className="mb-4 w-200 flex justify-center items-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                    type="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
