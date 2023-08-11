import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Providers({ auth }) {
    const [providers, setProviders] = useState([]);
    // Call this function to get products data
    const deleteEvent = (id) => {
        fetch(`http://127.0.0.1:8000/api/providers/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json();
            })
            .then(getProviders());
    };
    const editEvent = () => {
        route("edit", (type = "client"));
    };
    const getProviders = () => {
        /* fetch API in action */
        fetch("http://127.0.0.1:8000/api/providers", {
            method: "GET",
            // headers: {
            //     'Authorization': `Bearer ${auth.}`,
            // }
        })
            .then((response) => {
                return response.json();
            })
            .then((providers) => {
                //Fetched product is stored in the state
                setProviders(providers);
            });
    };
    useEffect(() => {
        getProviders();
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Providers
                    </h2>
                    <Link href={route("add", { type: "provider" })}>Add</Link>
                </div>
            }
        >
            <Head title="Providers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex p-3 justify-evenly text-lg font-bold">
                        <div className="w-1/12">Id</div>
                        <div className="w-2/12">Name</div>
                        <div className="w-3/12">Email</div>
                        <div className="w-2/12">Address</div>
                        <div className="w-2/12">Phone</div>
                        <div className="w-1/12"></div>
                        <div className="w-1/12"></div>
                        <div className="w-1/12"></div>
                    </div>
                    {providers.map((provider) => {
                        return (
                            <Card
                                data={provider}
                                type="provider"
                                key={provider.id}
                                deleteEvent={deleteEvent}
                                editEvent={editEvent}
                            ></Card>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
