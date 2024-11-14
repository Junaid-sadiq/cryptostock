import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Styles/Settings.css'
import axios from 'axios'

const Settings: React.FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPass, setConfirmationPass] = useState('');
  
  const [userData, setUserData] = useState()
  useEffect(() => {
    axios.get('http://localhost:3001/v1/user',{headers: {
      'Authorization': localStorage.getItem('token')
    }})
    .then((res) => setUserData(res.data))
    .catch((err) => console.log(err))
  },[])

  const toggleSettings = () => setSettingsOpen(!settingsOpen);
  let updateUserData = (changingUsername = false) => {
    if(changingUsername == true)
    {
      if(userData != undefined)
      {
        axios.post(
          'http://localhost:3001/v1/user', 
          {
            username: newUsername,
            password: userData['password'],
            email: userData['email']
          },
          {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }
        )
        .then((res) => {
          alert('User data changed successfully');
        })
        .catch((err) => console.log(err));
        
      }
    }
    else
    {
      //TODO: Fix this to compare user passwords as we won't use the user's username as a token in the future
      axios.post('http://localhost:3001/v1/login', {username: localStorage.getItem('token'), password: confirmationPass})
      .then((res:any) => {
        //TODO: Fix this, so that the user can change his data without having to call a single endpoint, i.e.
        // have an endpoint to change password only, email only, etc....
        alert('password changed.')
        
      })
      .catch((err) => alert('this is not your current password'))
    }
    
  }
  let deleteProfile = () => {
    if(userData != undefined)
      {
        axios.post(
          'http://localhost:3001/v1/user', 
          {
            username: null,
            password: null,
            email: null,
          },
          {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }
        )
        .then((res) => {
          alert('User deleted');
          localStorage.clear();
          window.location.href = '/'
        })
        .catch((err) => console.log(err));
        
      }
  }
  return (
    <div className="settings-section">
      <h2 onClick={toggleSettings} className="section-header">
        Settings {settingsOpen ? <FaChevronUp /> : <FaChevronDown />}
      </h2>
      {settingsOpen && (
        <div className="settings">
          <Button className='btn-change' onClick={() => setShowUsernameModal(true)}>
            Change username
          </Button>
          <Button className='btn-change' onClick={() => {setShowPasswordModal(true)}}>
            Change password
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Delete profile
          </Button>
        </div>
      )}

      {/* Username Modal */}
      <Modal show={showUsernameModal} onHide={() => setShowUsernameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder="Enter your new username" onChange={(e) => setNewUsername(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {setShowUsernameModal(false); updateUserData(true)}}>
            Change username
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="password" placeholder="Enter your current password" onChange={(e) => setConfirmationPass(e.target.value)}/>
          <input type="password" placeholder="Enter your new password" onChange={(e) => setNewUsername(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {updateUserData(false); setShowPasswordModal(false)}}>
            Change password
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure about that? This action will irreversibly delete all of your data.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => { deleteProfile(); setShowDeleteModal(false)}}>
            Delete profile
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Settings;
