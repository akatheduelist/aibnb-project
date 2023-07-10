import React, { useState, useEffect } from "react";
import * as spotActions from '../../store/spot'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteSpotModal({ id }) {
  const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const error = {};

        return dispatch(spotActions.deleteSpot(id))
          .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(error);
                }
            });
    };

    return (
        <div className="modal-container delete-post">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <button className="red-button" onClick={handleSubmit}>Yes (Delete Spot)</button>
        <button className="grey-button-big" onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
}

export default DeleteSpotModal;
