import React from 'react';
import './ProfilePicture.css';
import {IconEdit} from '../icons/NexmatixIcons';

const ProfilePicture = () => (
  <div className="profilePicture">
    <img
      src="https://freeiconshop.com/wp-content/uploads/edd/person-flat.png"
      alt="profile"
    />
    <div className="editProfilePicture">
      <IconEdit width="15" height="15" color="#777" />
    </div>
  </div>
);

export default ProfilePicture;
