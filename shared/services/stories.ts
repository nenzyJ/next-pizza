
import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./axios";

export type CartStory = Story & {
    items: StoryItem[];
}

export const getAll = async () => {
    const { data } = await axiosInstance.get<CartStory[]>("/stories");
    return data;
}