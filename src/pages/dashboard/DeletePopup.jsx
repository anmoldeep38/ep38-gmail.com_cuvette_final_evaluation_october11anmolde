import "../../styles/DeletePopup.css";

// import React from "react";

const DeletePopup = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup">
        <h2 style={{
          fontFamily: "Poppins",
          fontSize: "39px",
          fontWeight: 600,
          lineHeight: "58.5px",
          textAlign: "center",
          color: "#474444",
        }}>
          Are you confirm you 
        </h2>
        <h2 style={{
          fontFamily: "Poppins",
          fontSize: "39px",
          fontWeight: 600,
          lineHeight: "58.5px",
          textAlign: "center",
          color: "#474444",
        }} >want to delete ?</h2>
        <div className="delete-popup-buttons">
          <button onClick={onDelete} className="delete-popup-delete-button">
            Confirm Delete
          </button>
          <button onClick={onClose} className="delete-popup-cancel-button">
          <h2 style={{
          fontFamily: "Poppins",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "27px",
          textAlign: "center",
          color: "#474444",
        }}>Cancel</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
