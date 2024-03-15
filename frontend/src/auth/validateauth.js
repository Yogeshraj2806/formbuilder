import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "../App";
import Logout from "../pages/logout";

export function Validate() {

    const [table, getTable] = useState('');
    const [module, getModule] = useState('');

    const navigate = useNavigate();

    const handleTable = (e) => {
        getTable(e.target.value);
    }

    const handleModule = (e) => {
        getModule(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('table', table);
        localStorage.setItem('module', module)
        // onSubmit(userData);
        navigate('/formbuilder');

    }

    return (
        <div class="flex items-center justify-center h-screen">
            <div class="rounded-md appearance-none relative block w-full max-w-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
                <div>
                <Logout />
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                    <label for="table_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Table name</label>
                    <input onChange={handleTable} value={table} type="text" id="first_name" class="bg-white-50 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                    <label for="module_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Module name</label>
                    <input onChange={handleModule} value={module} type="text" id="module_name" class="bg-white-50 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}