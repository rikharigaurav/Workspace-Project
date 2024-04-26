"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from '@/components/ui/dialog'
import { userRenameModel } from '@/store/user-rename-model'
import { initHeapProfiler } from 'next/dist/build/swc'
import { FormEventHandler, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

export const RenameModel = () => {
    const { mutate, pending } = useApiMutation(api.board.update)

    const {
        isOpen,
        onClose,
        initialValues
    } = userRenameModel();
    
    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title)
    },  [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (
        e, 
    ) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
            .then(() => {
                toast.success("Board Renamed");
                onClose();
            })
            .catch(() => toast.error("Failed Rename"))
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Board Title'
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant='outline'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}