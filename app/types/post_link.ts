export type Category = {
    name: string;
    value: string;
}

export type PostLink = {
    id?: string;
    title: string;
    description: string;
    link: string;
    categories: Category[];
}
