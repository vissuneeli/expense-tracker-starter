import PropTypes from 'prop-types'

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <div className="confirm-dialog-content">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
        <div className="confirm-dialog-actions">
          <button onClick={onCancel} className="confirm-dialog-button cancel">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="confirm-dialog-button confirm">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmDialog
