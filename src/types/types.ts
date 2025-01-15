
export interface Note {
    id: number;
    title: string;
    body: string;
    createdAt: number;
    updatedAt: number;
}

export interface Folder {
    id: number;
    title: string;
    createdAt: number;
    updatedAt: number;
    bgColor?: string;
    iconColor?: string;
}

