import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "@/types/Quote"

export default function QuoteCard({ quote, author }: Quote) {
    return (
        <Card className="w-full max-w-xl mx-auto p-6 rounded-2xl shadow-md">
            <CardContent className="space-y-4">
                <blockquote className="text-xl italic text-muted-foreground">
                    “{quote}”
                </blockquote>
                <p className="text-right text-sm font-medium text-muted-foreground">
                    — {author}
                </p>
            </CardContent>
        </Card>
    )
}