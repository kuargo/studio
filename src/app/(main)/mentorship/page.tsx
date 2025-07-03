import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserCheck } from "lucide-react";

const mentors = [
  { name: "Pastor John", avatar: "https://placehold.co/100x100/a5b4fc/1e3a8a.png", aiHint: "man smiling", role: "Senior Pastor", specialties: ["Theology", "Leadership", "Marriage"] },
  { name: "Maria Garcia", avatar: "https://placehold.co/100x100/f9a8d4/4c1d95.png", aiHint: "woman portrait", role: "Worship Leader", specialties: ["Worship", "Songwriting", "Prayer"] },
  { name: "David Chen", avatar: "https://placehold.co/100x100/a7f3d0/065f46.png", aiHint: "man outdoors", role: "Youth Leader", specialties: ["Youth Ministry", "Discipleship", "Evangelism"] },
  { name: "Sarah Kim", avatar: "https://placehold.co/100x100/fed7aa/9a3412.png", aiHint: "woman professional", role: "Small Group Leader", specialties: ["Community", "Biblical Studies", "Pastoral Care"] },
]

export default function MentorshipPage() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-headline font-bold">Spiritual Mentorship</h1>
        <p className="text-muted-foreground mt-2 text-lg">Connect with experienced leaders who can guide you on your faith journey. Whether you're seeking wisdom or want to offer it, this is the place.</p>
      </div>

      <Card className="bg-primary/5">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
                <h3 className="font-headline text-xl font-semibold">Want to guide others?</h3>
                <p className="text-muted-foreground">Become a mentor and invest in the next generation of believers. Your experience is valuable.</p>
            </div>
            <Button size="lg">
                <UserCheck className="mr-2"/>
                Apply to be a Mentor
            </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Find a Mentor</h2>
        <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by name, specialty (e.g., 'Prayer')" className="pl-10 h-12" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mentors.map(mentor => (
                <Card key={mentor.name}>
                    <CardContent className="p-6 text-center flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={mentor.avatar} data-ai-hint={mentor.aiHint} />
                            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-headline font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-muted-foreground text-sm">{mentor.role}</p>
                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                            {mentor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                        </div>
                    </CardContent>
                    <CardContent className="p-4 border-t">
                        <Button className="w-full">Request Mentorship</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}