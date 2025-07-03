import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, Music, Search, Video, UtensilsCrossed, HeartHandshake, Construction, Code } from "lucide-react";

const opportunityIcons = {
    "Hospitality": HandHelping,
    "Worship": Music,
    "Outreach": UtensilsCrossed,
    "Media": Video,
    "Facilities": Construction,
    "Tech": Code,
    "Default": HeartHandshake
}

const opportunities = [
  {
    title: "Sunday Morning Welcome Team",
    ministry: "Hospitality",
    location: "Local Church",
    commitment: "2 hours/week",
    description: "Be the first friendly face visitors see! Help greet, hand out bulletins, and answer questions.",
    skills: ["Friendly", "Welcoming"],
  },
  {
    title: "Youth Worship Guitarist",
    ministry: "Worship",
    location: "Local Church",
    commitment: "3 hours/week (incl. practice)",
    description: "Use your musical gifts to lead our youth in worship on Wednesday nights.",
    skills: ["Guitar", "Worship Leading"],
  },
  {
    title: "Food Pantry Server",
    ministry: "Outreach",
    location: "Regional Event",
    commitment: "4 hours/month",
    description: "Help organize, pack, and distribute food to families in need in our community.",
    skills: ["Organized", "Service-oriented"],
  },
  {
    title: "Online Community Moderator",
    ministry: "Tech",
    location: "Global / Online",
    commitment: "5 hours/week (Flexible)",
    description: "Help keep our online community safe and welcoming by moderating posts and comments.",
    skills: ["Communication", "Discernment"],
  },
  {
    title: "Church Website Videographer",
    ministry: "Media",
    location: "Local Church",
    commitment: "Flexible",
    description: "Help capture testimonies, event recaps, and other video content for our online presence.",
    skills: ["Videography", "Editing"],
  },
   {
    title: "Mission Trip Support (Admin)",
    ministry: "Outreach",
    location: "Global / Online",
    commitment: "Flexible",
    description: "Assist with administrative tasks for our upcoming global mission trips.",
    skills: ["Admin", "Planning"],
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
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search opportunities (e.g., 'kids', 'music')" className="pl-10"/>
            </div>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="local">Local Church</SelectItem>
                    <SelectItem value="regional">Regional Event</SelectItem>
                    <SelectItem value="global">Global / Online</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Filter by Ministry" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="worship">Worship</SelectItem>
                    <SelectItem value="outreach">Outreach</SelectItem>
                    <SelectItem value="media">Media & Tech</SelectItem>
                    <SelectItem value="kids">Kids Ministry</SelectItem>
                </SelectContent>
            </Select>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map(opp => {
            const Icon = opportunityIcons[opp.ministry as keyof typeof opportunityIcons] || opportunityIcons.Default;
            return (
                <Card key={opp.title}>
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-lg">{opp.title}</CardTitle>
                            <CardDescription>{opp.ministry} &bull; {opp.location}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Commitment: {opp.commitment}</p>
                        <div className="flex flex-wrap gap-2">
                            {opp.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                        </div>
                    </CardContent>
                    <CardContent className="p-4 border-t">
                        <Button className="w-full">Express Interest</Button>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
