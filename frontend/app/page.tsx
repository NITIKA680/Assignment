  "use client";
  import React, { useEffect, useState } from 'react';
  import AddUser from './components/AddUser';
  import EditUser from './components/EditUser';
  import UserList from './components/UserList';

  interface User {
    _id: string;
    user: string;
    email: string;
    mobile: number;
    interest: string[];
    age: string;
  }

  const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
    const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>({ _id: '', user: '', email: '', mobile: +'', interest: [], age: '' });
    const [update, setUpdate] = useState(false)

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch('http://localhost:8000/api/user');
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          const data = await res.json();
          setUsers(data?.result);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchUsers();
    }, [update]);

    const openEditModal = (user: User) => {
      setCurrentUser(user);
      setEditModalIsOpen(true);
    };

    const openAddModal = () => {
      setAddModalIsOpen(true);
    };

    const closeEditModal = () => {
      setCurrentUser(null);
      setEditModalIsOpen(false);
    };

    const closeAddModal = () => {
      setAddModalIsOpen(false);
    };

    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      if (name === "interest") {
        const selectedOptions = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
        setNewUser(prevState => ({
          ...prevState,
          [name]: selectedOptions
        }));
      } else {
        setNewUser(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (currentUser) {
        const { name, value } = e.target;
        if (name === "interest") {
          const selectedOptions = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
          setCurrentUser({
            ...currentUser,
            [name]: selectedOptions
          });
        } else {
          setCurrentUser({
            ...currentUser,
            [name]: value
          });
        }
      }
    };

    

    const handleEditFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (currentUser) {
        try {
          const res = await fetch(`http://localhost:8000/api/updateUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: currentUser.user,
              email: currentUser.email,
              interest: currentUser.interest,
              age: +(currentUser.age), 
              mobile: +(currentUser.mobile) || null, 
            }),
          });
          if (!res.ok) {
            throw new Error('Failed to update user');
          }
          await res.json();
          setUpdate(!update)
          closeEditModal();
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
    };

    const handleAddFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:8000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: newUser.user,
            email: newUser.email,
            interest: newUser.interest,
            age: +(newUser.age), 
            mobile: +(newUser.mobile),
          }),
        });
        if (!res.ok) {
          throw new Error('Failed to add user');
        }
        const addedUser = await res.json();
        setUsers([...users, addedUser]);
        closeAddModal();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };   

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-44">
        <UserList users={users} openEditModal={openEditModal} openAddModal={openAddModal} setUpdate={setUpdate} update={update} />
        <EditUser currentUser={currentUser} closeEditModal={closeEditModal} editModalIsOpen={editModalIsOpen} handleEditFormSubmit={handleEditFormSubmit} handleEditFormChange={handleEditFormChange} />
        <AddUser addModalIsOpen={addModalIsOpen} closeAddModal={closeAddModal} handleAddFormSubmit={handleAddFormSubmit} newUser={newUser} handleInputChange={handleInputChange} />
      </main>
    );
  };

  export default UsersPage;
