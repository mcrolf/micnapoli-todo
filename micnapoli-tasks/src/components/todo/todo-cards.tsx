import { useEffect, useState } from "react";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter,
} from "../ui/card";
import { Todo, URL } from "./todo";
import { Button } from "../ui/button";
import "../../index.css";
import TodoCardsSkeleton from "./todo-cards-skeleton";
import { Input } from "../ui/input";
import {v4 as uuidv4} from 'uuid'

export default function TodoCards() {
    
    //useState items for todo cards
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //sleep for demonstration of skeleton
    const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const addTodo = async (title: string, description: string) => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            description: description,
            status: "pending"
        }
        try{
            const response = await fetch(URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newTodo)
            });
            if(!response.ok){
                throw Error('Failed to Add Todo')
            }
            const data = await response.json();
            console.log('added todo: ', data);
            setTitle('');
            setDescription('');
            getTodos
        }catch (err){
            console.log(err)
        }
    }

    const removeTodo = async (id: string) => {
        try{
            const result = await fetch(URL +`/${id}`, {
                method: "DELETE",
            });
            if (!result.ok){
                throw new Error("Cannot Delete Todo")
            }
            console.log("todo deleted")
            getTodos();
        }catch (err){
            console.log(err)
        }
    }

    const getTodos = async () => {
        try {
            await sleep(1000);
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error("Network was not ok");
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.log("Error fetching" + error);
        } finally {
            setLoading(false);
        }
    };

    //useEfect for data fetch
    useEffect(() => {

        getTodos();
    }, []);

    if (loading) {
        return (
            <div className="justify-center">
                <TodoCardsSkeleton />
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 items-center p-4">
                <Input className="p-4" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                <Input className="p-4" value={description} placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                <Button className="w-1/2 p-4"
                    onClick={() => addTodo(title, description)}>Add Todo</Button>
            </div>
            <div className="cards">
                {todos.map((todo) => (
                    <Card key={todo.id} className="flex flex-col justify-between">
                        <CardHeader className="flex-row p-4 items-center">
                            <CardTitle>{todo.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{todo.description}</p>
                        </CardContent>
                        <div className="justify-bottom">
                            <CardFooter className="grid grid-cols-2 items-center">
                                <Button className="p-4">{todo.status}</Button>
                                <Button className="p-4" onClick={() => removeTodo(todo.id)}>Delete</Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
        
    );
}
