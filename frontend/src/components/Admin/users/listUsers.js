import React, { useEffect, useState } from 'react'
import EditUserModal from './EditUserModal';
import { deleteUser, getUsers, updateUser } from '../../../services/users/users';

export default function ListUsers() {
    const [users, setUsers] = useState([0]);
    const [reload, setReload] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    // Fetch danh sách users từ API và cập nhật state


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        };

        fetchUsers();
    }, [reload]);

    const handleEdit = (user) => {

        setEditingUser(user);
    };

    const handleSave = async (editedUser) => {
        try {
            // Gọi API để cập nhật thông tin người dùng
            const updatedUser = await updateUser(editingUser.id, editedUser);

            // Cập nhật danh sách người dùng
            const updatedUsers = users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            );
            setReload(!reload);
            setUsers(updatedUsers);
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const handleCancelEdit = () => {
        setEditingUser(null);
    };


    const handleDelete = async (userId) => {
        await deleteUser(userId)
        setReload(!reload);
        // Xử lý sự kiện xóa
        console.log('Delete user with ID:', userId);
    };


    return (

        <div className="container mx-auto mt-8">


            <h1 className="text-2xl font-bold mb-4 caption-top">Admin</h1>
            <table className="min-w-full bg-white border-collapse border border-slate-400 ">

                <thead>
                    <tr className=" text-orange-600">
                        <th className="py-2 px-6 border-b border border-slate-300">ID</th>
                        <th className="py-2 px-4 border-b border border-slate-300">Tên</th>
                        <th className="py-2 px-4 border-b border border-slate-300">Email</th>
                        <th className="py-2 px-4 border-b border border-slate-300">SĐT</th>
                        <th className="py-2 px-4 border-b border border-slate-300">Trạng thái</th>
                        <th className="py-2 px-4 border-b border border-slate-300">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-300 text-center text-lg text-blue-600" >
                            <td className="py-3 px-4 border-b ">{user.id}</td>
                            <td className="py-3 px-4 border-b ">{user.username}</td>
                            <td className="py-2 px-4 border-b ">{user.email}</td>
                            <td className="py-2 px-4 border-b ">{user.phone}</td>
                            <td className="py-2 px-4 border-b ">{user.status}</td>
                            <td className="py-2 px-4 border-b ">
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 mr-2 rounded"
                                    onClick={() => handleEdit(user)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}

                    {editingUser && (
                        <EditUserModal user={editingUser} onSave={handleSave} onCancel={handleCancelEdit} />
                    )}
                </tbody>
            </table>
        </div>
    )
}
