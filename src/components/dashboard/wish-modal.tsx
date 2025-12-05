// import React, { useEffect, useState } from "react";
// import type { Wish } from "@/services/wishesApi.ts";
//
// const WishModal: React.FC<{
//   initial?: Wish | null;
//   onClose: () => void;
//   onSubmit: (data: Wish) => Promise<void> | void;
// }> = ({ initial, onClose, onSubmit }) => {
//   const [title, setTitle] = useState(initial?.title || "");
//   const [description, setDescription] = useState(initial?.description || "");
//   const [image, setImage] = useState(initial?.image || "");
//   const [price, setPrice] = useState(initial?.price ?? 0);
//   const [submitting, setSubmitting] = useState(false);
//
//   useEffect(() => {
//     setTitle(initial?.title || "");
//     setDescription(initial?.description || "");
//     setImage(initial?.image || "");
//     setPrice(initial?.price ?? 0);
//   }, [initial]);
//
//   const submit = async () => {
//     setSubmitting(true);
//     try {
//       const payload: Wish = {
//         title,
//         description,
//         image,
//         price,
//         createdAt: initial?.createdAt || new Date().toISOString(),
//       };
//       await onSubmit(payload);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setSubmitting(false);
//     }
//   };
//
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/30">
//       <div className="bg-white p-4 rounded w-full max-w-lg">
//         <h3 className="text-lg font-semibold mb-2">{initial ? "Update Wish" : "Add New Wish"}</h3>
//         <div className="space-y-2">
//           <input className="w-full border p-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
//           <textarea className="w-full border p-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
//           <input className="w-full border p-2" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
//           <input type="number" className="w-full border p-2" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
//         </div>
//
//         <div className="mt-4 flex justify-end gap-2">
//           <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
//           <button onClick={submit} disabled={submitting} className="px-3 py-1 bg-blue-600 text-white rounded">{submitting ? 'Saving...' : 'Save'}</button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default WishModal;
