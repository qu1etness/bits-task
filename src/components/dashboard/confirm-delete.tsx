import React from "react";
import type { Wish } from "../../services/wishesApi.ts";

const ConfirmDelete: React.FC<{ item: Wish; onCancel: () => void; onConfirm: () => void }> = ({ item, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-4 rounded w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-2">Confirm delete</h3>
        <p>Are you sure you want to delete "{item.title}"?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 border rounded">No</button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">Yes, delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
