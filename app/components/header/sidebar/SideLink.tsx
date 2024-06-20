"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import { IconType } from "react-icons";


interface ISideLinkProps {
    iconColor: string;
    iconSize: number;
    icon: IconType;
    linkName: string;
    linkUrl: string;
    onClick?: () => void
}

const SideLink: React.FC<ISideLinkProps> = ({
    iconColor,
    iconSize,
    icon: Icon,
    linkName,
    linkUrl,
}) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`${linkUrl}`)} className="px-6 py-3 flex gap-8 mt-2 items-center hover:bg-[rgba(255,255,255,0.2)] hover:border-l-4 transition-[0.2s]">
            <Icon color={iconColor} size={iconSize} />
            <Link className="text-[14px]" href={linkUrl}>
                {linkName}
            </Link>
        </div>
    );
};

export default SideLink;
