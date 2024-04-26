"use client"

import { Canvas } from "./_components/canvas";
import { Room } from "@/app/(dashboard)/_components/room";


interface BoardIdPageProps {
    params: {
        boardId: string;
    };
};

const BoardIdPage = ({
    params,
}: BoardIdPageProps) => {
    return(
        <div>
            <Room roomId={params.boardId}>
            <Canvas boardId={params.boardId} />
            </Room>
        </div>
    )
}

export default BoardIdPage;