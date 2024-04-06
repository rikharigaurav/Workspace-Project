"use client"

import Image from "next/image";
import Link from "next/link";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,  
}: BoardCardProps) => {
    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative  flex-2 bg-amber-200">
                    <Image 
                        src={imageUrl}
                        alt="Doodle"
                        fill
                        className="object-fit"
                    />
                
                </div>
            </div>
        </Link>
    )
}