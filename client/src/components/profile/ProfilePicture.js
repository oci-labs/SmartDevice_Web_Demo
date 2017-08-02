import React from "react";
import "./ProfilePicture.css";
import Icon from "../icons/Icon";

const ProfilePicture = () => {
  return (
    <div className="profilePicture">
      <img src="https://freeiconshop.com/wp-content/uploads/edd/person-flat.png" />
      <div className="editProfilePicture">
        <Icon type="edit" />
      </div>
    </div>
  );
};

export default ProfilePicture;
