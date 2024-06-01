import React from "react";
import Modal from "./Modal";

interface User {
  user: string;
  email: string;
  mobile: number;
  age: string;
  interest: string[];
}

interface Props {
  addModalIsOpen: boolean;
  closeAddModal: () => void;
  handleAddFormSubmit: (e: React.FormEvent) => void;
  newUser: User;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddUser: React.FC<Props> = ({ addModalIsOpen, closeAddModal, handleAddFormSubmit, newUser, handleInputChange }) => {
  return (
    <Modal isOpen={addModalIsOpen} onClose={closeAddModal}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-4xl w-full p-2">
      <h2>Add User</h2>
      <form onSubmit={handleAddFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="user"
            value={newUser.user}
            onChange={handleInputChange}
            className="block w-full mt-2 border border-gray-300 rounded p-2 pr-48"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="block w-full mt-2 border border-gray-300 rounded p-2 pr-48"
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="mobile"
            value={newUser.mobile}
            onChange={handleInputChange}
            className="block w-full mt-2 border border-gray-300 rounded p-2 pr-48"
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={newUser.age}
            onChange={handleInputChange}
            className="block w-full mt-2 border border-gray-300 rounded p-2 pr-48"
          />
        </label>
        <label>
          Interests:
          <select
            name="interest"
            value={newUser.interest}
            onChange={handleInputChange}
            multiple
            className="block w-full mt-2 border border-gray-300 rounded p-2 pr-48"
          >
            <option value="Reading">Reading</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Traveling">Traveling</option>
            <option value="Coding">Coding</option>
          </select>
        </label>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="mr-2 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add
          </button>
          <button
            type="button"
            onClick={closeAddModal}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default AddUser;
