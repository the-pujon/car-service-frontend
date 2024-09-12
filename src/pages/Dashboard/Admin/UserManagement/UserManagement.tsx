import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import React,{ useState } from 'react'

const UserManagement = () => {
    const [users,setUsers] = useState([
        { id: 1,name: "John Doe",email: "john@example.com",role: "USER" },
        { id: 2,name: "Jane Smith",email: "jane@example.com",role: "ADMIN" },
    ])

    const handleUpdateUserRole = (id,newRole) => {
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user,role: newRole } : user
        )
        setUsers(updatedUsers)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage your users</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Select
                                        onValueChange={(value) => handleUpdateUserRole(user.id,value)}
                                        defaultValue={user.role}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Update role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USER">User</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default UserManagement