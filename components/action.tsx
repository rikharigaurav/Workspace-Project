"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { ConfirmModel } from "./confirm-model";
import { Button } from "./ui/button";
import { userRenameModel } from "@/store/user-rename-model";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {
    const { onOpen } = userRenameModel();

    const { mutate, pending } = useApiMutation(api.board.remove)

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(() => toast.success("Link copied"))
        .catch(() => toast.error("Failed to Copy Link"))
    }

    const onDelete = () => {
        mutate({ id }) 
            .then(() => toast.success("Board Deleted"))
            .catch(() => toast.error("Failed to delete board"))
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className='w-60'
        >
          <DropdownMenuItem onClick={onCopyLink} className='p-3 cursor-pointer'>
            <Link2 className='h-4 w-4 mr-2' />
            Copy Board Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOpen(id, title)} 
             className='p-3 cursor-pointer'>
            <Pencil  className='h-4 w-4 mr-2' />
            Rename
          </DropdownMenuItem>
          <ConfirmModel
            header='Delete board?'
            description='This will delete the board'
            disable={pending}
            onConfirm={onDelete}
          >
            <Button
              variant='ghost'
              className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
            >
              <Trash2 className='h-4 w-4 mr-2' />
              Delete
            </Button>
          </ConfirmModel>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}