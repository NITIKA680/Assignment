import React from "react";


interface User {
  _id: string;
  user: string;
  email: string;
  mobile: number;
  interest: string[];
  age: string;
}

interface Props {
  users: User[];
  openEditModal: (user: User) => void;
  openAddModal: () => void;
}

function UserList({ users, openEditModal, openAddModal,setUpdate, update }: Props) {

  const handleDelete = async (_id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/deleteUser`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to add user');
      }
      setUpdate(!update)
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                Interest
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >
                <td className="px-6 py-4">{user.user}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.age}</td>
                <td className="px-6 py-4">{user.interest}</td>
                <td className="px-6 py-4">{user.mobile}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openEditModal(user)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="font-medium dark:text-red-500 hover:underline text-red ml-5"
                  >
                    
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={openAddModal}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Add User
      </button>
    </>
  );
}

export default UserList;
