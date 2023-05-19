import React, { useEffect, useState } from "react";
import Users from "./Users";
import { getAllUsers } from "../../api/UserAPI";

const ModeratorDashboard = ({ isLoggedIn }) => {
    const [users, setUsers] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);

    useEffect(() => {
        getAllUsers(setUsers);
    }, [updateUI]);

    return (
        isLoggedIn &&
        <React.Fragment>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <h2 className="text-gray-800 font-semibold text-center text-3xl py-2">Users</h2>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Username</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <Users users={users} setUpdateUI={setUpdateUI} />
                </table>
            </div>
        </React.Fragment>
    );
}

export default ModeratorDashboard;