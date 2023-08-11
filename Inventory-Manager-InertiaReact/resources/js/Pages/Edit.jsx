import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect, useSearchParams } from "react";

export default function Edit({ auth, ...props }) {
    const [data, setData] = useState([]);
    const type = props.type;
    const id = props.id;
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
        fetch(`http://127.0.0.1:8000/api/${props.type}s/${props.id}`, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //Fetched product is stored in the state
                setData(data);
            });
    };
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const handleSubmit = () => {
        console.log(data);
        fetch(`http://127.0.0.1:8000/api/${props.type}s/${props.id}`, {
            method: "PUT",
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
                window.location.href = route(loc);
            });
    };
    useEffect(() => {
        getData();
    }, []);
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
