export interface Todo {
    id: string,
    title: string,
    description: string,
    status: "pending" | "complete",
}

export const URL = "http://localhost:4000/todos"