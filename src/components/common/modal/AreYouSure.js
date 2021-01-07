import React from "react";
import Modal from "react-modal";

const AreYouSure = ({ onYes, onNo, open }) => {
  const confirmModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal isOpen={open} style={confirmModalStyle}>
      <h4 className="m-3">Are you sure?</h4>
      <div className="mt-5 mb-3">
        <button className="btn btn-dark ml-4" onClick={onYes}>
          Yes
        </button>
        <button className="btn btn-dark ml-4" onClick={onNo}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default AreYouSure;
