"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, Music, Search, Video, UtensilsCrossed, HeartHandshake, Construction, Code, Church, Building, User, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { CreateOpportunityForm } from "@/components/app/create-opportunity-form";
import { useToast } from "@/hooks/use-toast";

const opportunityIcons: { [key: string]: React.ElementType } = {
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
    postedBy: { type: 'Church', name: 'Connect Hub Church' }
  },
  {
    title: "Youth Worship Guitarist",
    ministry: "Worship",
    location: "Local Church",
    commitment: "3 hours/week (incl. practice)",
    description: "Use your musical gifts to lead our youth in worship on Wednesday nights.",
    skills: ["Guitar", "Worship Leading"],
    postedBy: { type: 'Church', name: 'Connect Hub Church' }
  },
  {
    title: "Food Pantry Server",
    ministry: "Outreach",
    location: "Regional Event",
    commitment: "4 hours/month",
    description: "Help organize, pack, and distribute food to families in need in our community.",
    skills: ["Organized", "Service-oriented"],
    postedBy: { type: 'NGO', name: 'City Serve Foundation' }
  },
  {
    title: "Online Community Moderator",
    ministry: "Tech",
    location: "Global / Online",
    commitment: "5 hours/week (Flexible)",
    description: "Help keep our online community safe and welcoming by moderating posts and comments.",
    skills: ["Communication", "Discernment"],
    postedBy: { type: 'User', name: 'Admin Team' }
  },
  {
    title: "Church Website Videographer",
    ministry: "Media",
    location: "Local Church",
    commitment: "Flexible",
    description: "Help capture testimonies, event recaps, and other video content for our online presence.",
    skills: ["Videography", "Editing"],
    postedBy: { type: 'Church', name: 'Grace Fellowship' }
  },
   {
    title: "Mission Trip Support (Admin)",
    ministry: "Outreach",
    location: "Global / Online",
    commitment: "Flexible",
    description: "Assist with administrative tasks for our upcoming global mission trips.",
    skills: ["Admin", "Planning"],
     postedBy: { type: 'NGO', name: 'Hope International' }
  },
];

export default function VolunteeringPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Volunteer Board</h1>
          <p className="text-muted-foreground mt-1">Find or post opportunities to serve and use your gifts for the kingdom.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Post an Opportunity
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <CreateOpportunityForm />
            </DialogContent>
        </Dialog>
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
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="kids">Kids Ministry</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                </SelectContent>
            </Select>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map(opp => {
            const Icon = opportunityIcons[opp.ministry as keyof typeof opportunityIcons] || opportunityIcons.Default;
            const PostedByIcon = {
                'Church': Church,
                'NGO': Building,
                'User': User
            }[opp.postedBy.type] || Building;

            return (
                <Card key={opp.title} className="flex flex-col">
                    <CardHeader className="flex-grow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>{opp.title}</CardTitle>
                                <CardDescription>{opp.ministry} &bull; {opp.location}</CardDescription>
                            </div>
                        </div>
                        <div className="pt-4">
                            <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                            <p className="text-sm font-semibold text-muted-foreground mb-2">Commitment: {opp.commitment}</p>
                            <div className="flex flex-wrap gap-2">
                                {opp.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter className="border-t pt-4">
                         <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <PostedByIcon className="h-4 w-4" />
                                <span>{opp.postedBy.name}</span>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm">Express Interest</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Express Interest in "{opp.title}"</DialogTitle>
                                        <DialogDescription>
                                            The opportunity organizer will be notified of your interest. They will receive your profile information and will be able to contact you.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                        <DialogClose asChild><Button onClick={() => toast({ title: "Interest Expressed!", description: "The organizer has been notified." })}>Confirm</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                         </div>
                    </CardFooter>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
