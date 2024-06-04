import React from 'react';
import './Modal.css'; 

function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <div className="modal-footer">
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
