import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, Music, Search, Video, UtensilsCrossed } from "lucide-react";

const opportunities = [
  {
    title: "Sunday Morning Welcome Team",
    ministry: "Hospitality",
    commitment: "2 hours/week",
    description: "Be the first friendly face visitors see! Help greet, hand out bulletins, and answer questions.",
    skills: ["Friendly", "Welcoming"],
    icon: HandHelping
  },
  {
    title: "Youth Worship Guitarist",
    ministry: "Youth & Worship",
    commitment: "3 hours/week (incl. practice)",
    description: "Use your musical gifts to lead our youth in worship on Wednesday nights.",
    skills: ["Guitar", "Worship Leading"],
    icon: Music
  },
  {
    title: "Food Pantry Server",
    ministry: "Community Outreach",
    commitment: "4 hours/month",
    description: "Help organize, pack, and distribute food to families in need in our community.",
    skills: ["Organized", "Service-oriented"],
    icon: UtensilsCrossed
  },
  {
    title: "Church Website Videographer",
    ministry: "Media & Tech",
    commitment: "Flexible",
    description: "Help capture testimonies, event recaps, and other video content for our online presence.",
    skills: ["Videography", "Editing"],
    icon: Video
  },
];

export default function VolunteeringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Volunteer Board</h1>
        <p className="text-muted-foreground mt-1">Find a place to serve and use your gifts for the kingdom.</p>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search opportunities (e.g., 'kids', 'music')" className="pl-10"/>
            </div>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by ministry" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="worship">Worship</SelectItem>
                    <SelectItem value="outreach">Outreach</SelectItem>
                    <SelectItem value="media">Media & Tech</SelectItem>
                    <SelectItem value="kids">Kids Ministry</SelectItem>
                </SelectContent>
            </Select>
             <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="teaching">Teaching</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                </SelectContent>
            </Select>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {opportunities.map(opp => (
            <Card key={opp.title}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <opp.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-lg">{opp.title}</CardTitle>
                        <CardDescription>{opp.ministry} &bull; {opp.commitment}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {opp.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                    </div>
                </CardContent>
                 <CardContent className="p-4 border-t">
                    <Button className="w-full">Express Interest</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}