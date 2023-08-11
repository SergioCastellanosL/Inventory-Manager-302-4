import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            {/* <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link> */}
                        </>
                    )}
                </div>
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
                            <div className="flex space-x-4">
                                <Link
                                    href={route('register')}
                                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    <button className="bg-black hover:bg-gray-500 text-white px-4 py-2 rounded">
                                        Get Started
                                    </button>
                                </Link>
                                {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                    Get Started
                                </button> */}

                                {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded">
                                    Book a Tour
                                </button> */}

                                
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-6">
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/7.jpeg" alt="Advertisement 1" className="mb-4 w-90 h-30"/>
                                <h3 className="text-lg font-semibold">SOC 2, ISO 127001 & GDPR Compliant</h3>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/9.png" alt="Advertisement 2" className="mb-4 w-90 h-30" />
                                <h3 className="text-lg font-semibold">Secure Backups & Encryption</h3>
                                
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/5.png" alt="Advertisement 2" className="mb-4 w-90 h-30" /> 
                                <h3 className="text-lg font-semibold">SSO, Custom Permissions & Roles</h3>
                                
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/4.jpeg" alt="Advertisement 3" className="mb-4 w-90 h-30" />
                                <h3 className="text-lg font-semibold">Reduce safety incidents and regulatory interruptions.</h3>
                                <p>Get the visibility and control you need to impose standards, minimise accidents, and provide your consumers with better products. By making it simpler than ever for frontline staff to understand and follow the proper procedures, you can increase consistency across sites.</p>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/6.png" alt="Advertisement 4" className="mb-4 w-90 h-30" />
                                <h3 className="text-lg font-semibold">Add production capacity by preventing breakdowns at scale.</h3>
                                <p>Utilise predictive and preventive maintenance to increase output. By increasing the life of your equipment and removing waste from your production process, you may lower maintenance expenses. Multi-site reporting dashboards can help you promote ongoing improvement.</p>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-blue-300 transition flex flex-col items-center">
                                <img src="/images/8.jpeg" alt="Advertisement 4" className="mb-4 w-99 h-30" /> 
                                <h3 className="text-lg font-semibold">Deliver results in weeks, not years.</h3>
                                <p>Regardless of how big or complicated your demands are, we can have your sites working with MaintainX in just three weeks. Then we keep assisting you in driving adoption, streamlining your business processes, and creating a centre of excellence.</p>
                            </div>
                        </div>
                    
                        <div className="bg-gray-200 py-12">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold mb-4">
                                        Manufacturers using MaintainX report, on average:
                                    </h1>
                                    <p className="text-lg">
                                        Simplify maintenance, safety and operations for your frontline teams.
                                        Increase equipment uptime by connecting your people and data.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-6">
                        <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-gray-300 transition">
                                <div className="flex flex-col items-center">
                                    <p className="text-5xl text-blue-500 font-bold">40%</p>
                                    <p className="text-sm">increase in asset availability</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-gray-300 transition">
                                <div className="flex flex-col items-center">
                                    <p className="text-5xl text-blue-500 font-bold">32%</p>
                                    <p className="text-sm">reduction in parts inventory costs</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-4 rounded shadow-md hover:bg-gray-300 transition">
                                <div className="flex flex-col items-center">
                                    <p className="text-5xl text-blue-500 font-bold">44%</p>
                                    <p className="text-sm">increase in on-time delivery</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 text-black py-12">
                            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between">
                                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                    <h2 className="text-2xl font-semibold mb-4">Company</h2>
                                    <ul>
                                        <li>About</li>
                                        <li>Careers</li>
                                        <li>Partnerships</li>
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                    <h2 className="text-2xl font-semibold mb-4">Product</h2>
                                    <ul>
                                        <li>Pricing</li>
                                        <li>Reviews</li>
                                        <li>Integrations</li>
                                        <li>Security</li>
                                        <li>Blog</li>
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                    <h2 className="text-2xl font-semibold mb-4">Support</h2>
                                    <ul>
                                        <li>Live Chat</li>
                                        <li>Support Center</li>
                                        <li>FAQs</li>
                                        <li>Support Policy</li>
                                    </ul>
                                </div>
                            </div>
                            <div className=" mt-6 pt-6 max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center">
                                <div className="flex items-center">
                                    {/* Add social media icons here */}
                                </div>
                                <div className="text-sm">
                                    <p>Terms of Service</p>
                                    <p>Privacy Policy</p>
                                    <p>Password Policy</p>
                                    <p>Cookie Policy</p>
                                    <p>GDPR</p>
                                    <p>Acceptable Use Policy</p>
                                    <p>Website Terms & Conditions</p>
                                    <p>Contact Us</p>
                                    <p>&copy; 2023 MISURGA. All rights reserved.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>                               
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
