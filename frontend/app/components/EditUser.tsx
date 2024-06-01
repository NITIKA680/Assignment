import React from 'react';
import Modal from './Modal';

interface Props {
  editModalIsOpen: boolean;
  closeEditModal: () => void;
  handleEditFormSubmit: (e: React.FormEvent) => void;
  currentUser: User | null;
  handleEditFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface User {
  _id: string;
  user: string;
  email: string;
  mobile: number;
  interest: string[];
  age: string;
}

const EditUser: React.FC<Props> = ({ editModalIsOpen, closeEditModal, handleEditFormSubmit, currentUser, handleEditFormChange }) => {
  return (
    <Modal isOpen={editModalIsOpen} onClose={closeEditModal}>
      <h2>Edit User</h2>
      {currentUser && (
        <form onSubmit={handleEditFormSubmit}>
          <label htmlFor="name">
            Name:
            <input
              id="name"
              type="text"
              name="user"
              value={currentUser.user}
              onChange={handleEditFormChange}
              className="block w-full mt-2 border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              value={currentUser.email}
              onChange={handleEditFormChange}
              className="block w-full mt-2 border border-gray-300 rounded p-2"
              required
            />
          </label>
          <label htmlFor="mobile">
            Phone:
            <input
              id="mobile"
              type="tel"
              name="mobile"
              value={currentUser.mobile}
              onChange={handleEditFormChange}
              className="block w-full mt-2 border border-gray-300 rounded p-2"
            />
          </label>
          <label htmlFor="age">
            Age:
            <input
              id="age"
              type="number"
              name="age"
              value={currentUser.age}
              onChange={handleEditFormChange}
              className="block w-full mt-2 border border-gray-300 rounded p-2"
            />
          </label>
          <label htmlFor="interest">
            Interests:
            <select
              id="interest"
              name="interest"
              value={currentUser.interest}
              onChange={handleEditFormChange}
              multiple
              className="block w-full mt-2 border border-gray-300 rounded p-2"
            >
              <option value="Reading">Reading</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Traveling">Traveling</option>
              <option value="Coding">Coding</option>
            </select>
          </label>
          <div className="flex justify-end mt-4">
            <button type="submit" className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
              Update
            </button>
            <button type="button" onClick={closeEditModal} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditUser;
