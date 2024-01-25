import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function Profile() {
  const { currentUser, updateUser, delete_your_account, logout } = useContext(UserContext);

  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  // const [phone, setPhone] = useState(currentUser?.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(username, email);
  };



  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {/* Profile Details Card */}
          {currentUser && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Profile Details</h2>
                <p>
                  <strong>Username:</strong> {currentUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {currentUser.phone}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6">
          {/* Update Details Card */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Update Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary me-2">
                  Update Details
                </button>
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={()=>delete_your_account()}
                >
                  Delete Account
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
