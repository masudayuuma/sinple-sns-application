import React, { useRef, useState } from "react";

interface EditProfileProps {
  isEditing: boolean;
  changeIcon: (file: File) => Promise<void>;
  toggleEditing: (isEditing: boolean) => void;
}

const EditIcon: React.FC<EditProfileProps> = ({
  isEditing,
  changeIcon,
  toggleEditing,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsModalOpen(true);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    toggleEditing;
    await changeIcon(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setIsModalOpen(false);
    toggleEditing;
  };

  const handleCancel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-2 flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full text-center w-full cursor-pointer hover:bg-blue-700"
      >
        画像を変更
      </label>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              新しい画像をアップロード
            </h3>

            <div className="flex justify-center mb-4">
              <img
                src={URL.createObjectURL(file!)}
                alt="Preview"
                className="w-24 h-24 rounded-full border-2 border-black"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={isEditing}
              className={`w-full py-2 px-4 text-white rounded-md ${
                isEditing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isEditing ? "アップロード中..." : "アップロード"}
            </button>

            <button
              onClick={handleCancel}
              className="w-full py-2 px-4 mt-2 text-gray-700 border rounded-md hover:bg-gray-200"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditIcon;
