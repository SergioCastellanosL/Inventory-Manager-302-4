import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            


                            <h1 className="text-4xl font-bold mb-4">
                                The modern CMMS your team will actually use.
                            </h1>
                            <p className="text-lg mb-6">
                                Simplify maintenance, safety and operations for your frontline teams.
                                Increase equipment uptime by connecting your people and data.
                            </p>
                            
                        </div>
                    
                        <div className="grid grid-cols-3 gap-4 p-6">
                        <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                
                                <h3 className="text-lg font-semibold">Reduce safety incidents and regulatory interruptions.</h3>
                                <p>Get the visibility and control you need to impose standards, minimise accidents, and provide your consumers with better products. By making it simpler than ever for frontline staff to understand and follow the proper procedures, you can increase consistency across sites.</p>
                                <img src="/images/66.png" alt="Advertisement 3" className="mb-4 w-90 h-30" />
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                               
                                <h3 className="text-lg font-semibold">Add production capacity by preventing breakdowns at scale.</h3>
                                <p>Utilise predictive and preventive maintenance to increase output. By increasing the life of your equipment and removing waste from your production process, you may lower maintenance expenses. Multi-site reporting dashboards can help you promote ongoing improvement.</p>
                                <img src="/images/11.png" alt="Advertisement 4" className="mb-4 w-90 h-30" />
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/22.png" alt="Advertisement 4" className="mb-4 w-99 h-30" /> 
                                <h3 className="text-lg font-semibold">Deliver results in weeks, not years.</h3>
                                <p>Regardless of how big or complicated your demands are, we can have your sites working with MaintainX in just three weeks. Then we keep assisting you in driving adoption, streamlining your business processes, and creating a centre of excellence.</p>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/1.jpeg" alt="Advertisement 1" className="mb-4 w-90 h-30"/>
                                <h3 className="text-lg font-semibold">SOC 2, ISO 127001 & GDPR Compliant</h3>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/2.jpeg" alt="Advertisement 2" className="mb-4 w-90 h-30" />
                                <h3 className="text-lg font-semibold">Secure Backups & Encryption</h3>
                                
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/00.jpeg" alt="Advertisement 2" className="mb-4 w-90 h-30" /> 
                                <h3 className="text-lg font-semibold">SSO, Custom Permissions & Roles</h3>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
