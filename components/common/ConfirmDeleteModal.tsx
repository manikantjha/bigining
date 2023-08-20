import CommonButton from "../admin/common/CommonButton";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white rounded-lg shadow-lg w-min-lg overflow-hidden relative">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Confirmation!</h2>
        </div>
        <div className="p-4">
          <p className="text-base mb-4">
            Are you sure you want to delete this item?
          </p>
        </div>
        <div className="flex justify-end gap-2 bg-gray-100 p-4">
          <CommonButton onClick={onClose} color="primary">
            Cancel
          </CommonButton>
          <CommonButton
            onClick={onConfirm}
            color="red"
            loading={isLoading}
            loadingText="Deleting..."
          >
            Confirm Delete
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
