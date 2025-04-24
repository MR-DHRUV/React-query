import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Eye, User } from "lucide-react"
import { Post } from "../types/Post"

export default function PostCard({
    id,
    title,
    body,
    tags,
    reactions,
    views,
    userId
}: Post) {
    return (
        <Card className="w-full max-w-2xl mx-auto rounded-2xl shadow-md" key={id}>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <div className="flex gap-2 mt-2 flex-wrap">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            #{tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{body}</p>
                <div className="flex justify-between text-sm text-muted-foreground mt-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{reactions.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4" />
                            <span>{reactions.dislikes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{views}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>User {userId}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
