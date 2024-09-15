import React from 'react'
import { DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const AddService = () => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Enter the details for the new service.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                        Price
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button >Add Service</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default AddService