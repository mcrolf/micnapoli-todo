import { Skeleton } from "../ui/skeleton";
import { Card, CardHeader, CardContent } from "../ui/card";
import '../../index.css'

export default function TodoCardsSkeleton(){
    return(
        <div className="cards">
            <Card>
                <CardHeader>
                    <Skeleton className="h-4 w-10"/>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-10"/>
                </CardContent>
            </Card>

        </div>
    )
}