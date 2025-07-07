
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, Music, Search, Video, UtensilsCrossed, HeartHandshake, Construction, Code, Church, Building, User, PlusCircle, Heart, PenSquare, Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { CreateOpportunityForm } from "@/components/app/create-opportunity-form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { VolunteerApplicationForm } from "@/components/app/volunteer-application-form";
import { SuggestOpportunityForm } from "@/components/app/suggest-opportunity-form";

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
    postedBy: { type: 'Church', name: 'Connect Hub Church' },
    likes: 18,
    details: { ageRestriction: "18+", foodProvided: "Coffee & Donuts", stipend: "None" }
  },
  {
    title: "Youth Worship Guitarist",
    ministry: "Worship",
    location: "Local Church",
    commitment: "3 hours/week (incl. practice)",
    description: "Use your musical gifts to lead our youth in worship on Wednesday nights.",
    skills: ["Guitar", "Worship Leading"],
    postedBy: { type: 'Church', name: 'Connect Hub Church' },
    likes: 32,
    details: { equipmentNeeded: "Your own guitar" }
  },
  {
    title: "Food Pantry Server",
    ministry: "Outreach",
    location: "Regional Event",
    commitment: "4 hours/month",
    description: "Help organize, pack, and distribute food to families in need in our community.",
    skills: ["Organized", "Service-oriented"],
    postedBy: { type: 'NGO', name: 'City Serve Foundation' },
    likes: 74,
    details: { certificateProvided: true, fareRefund: "Up to $10" }
  },
  {
    title: "Online Community Moderator",
    ministry: "Tech",
    location: "Global / Online",
    commitment: "5 hours/week (Flexible)",
    description: "Help keep our online community safe and welcoming by moderating posts and comments.",
    skills: ["Communication", "Discernment"],
    postedBy: { type: 'User', name: 'Admin Team' },
    likes: 45,
    details: {}
  },
  {
    title: "Church Website Videographer",
    ministry: "Media",
    location: "Local Church",
    commitment: "Flexible",
    description: "Help capture testimonies, event recaps, and other video content for our online presence.",
    skills: ["Videography", "Editing"],
    postedBy: { type: 'Church', name: 'Grace Fellowship' },
    likes: 21,
    details: { stipend: "$50 per project" }
  },
   {
    title: "Mission Trip Support (Admin)",
    ministry: "Outreach",
    location: "Global / Online",
    commitment: "Flexible",
    description: "Assist with administrative tasks for our upcoming global mission trips.",
    skills: ["Admin", "Planning"],
     postedBy: { type: 'NGO', name: 'Hope International' },
     likes: 15,
     details: {}
  },
];

export default function VolunteeringPage() {
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
        {opportunities.map(opp => <OpportunityCard key={opp.title} opportunity={opp} />)}
        
        <Card className="border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center p-6">
            <div className="p-3 bg-muted rounded-full mb-3">
                <PenSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Have an Idea?</h3>
            <p className="text-muted-foreground text-sm mb-4">Suggest a new volunteer opportunity for our community.</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Make a Suggestion</Button>
                </DialogTrigger>
                <DialogContent>
                    <SuggestOpportunityForm />
                </DialogContent>
            </Dialog>
        </Card>
      </div>
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: typeof opportunities[0] }) {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const Icon = opportunityIcons[opportunity.ministry as keyof typeof opportunityIcons] || opportunityIcons.Default;
  const PostedByIcon = {
      'Church': Church,
      'NGO': Building,
      'User': User
  }[opportunity.postedBy.type] || Building;

  const detailBadges = Object.entries(opportunity.details)
    .map(([key, value]) => {
        if (!value) return null;
        let text = "";
        if (key === 'ageRestriction') text = `Age: ${value}`;
        else if (key === 'foodProvided') text = "Food Provided";
        else if (key === 'certificateProvided') text = "Certificate Provided";
        else if (key === 'stipend') text = `Stipend: ${value}`;
        else if (key === 'fareRefund') text = `Fare Refund: ${value}`;
        else if (key === 'equipmentNeeded') text = `Requires: ${value}`;
        return text ? <Badge key={key} variant="secondary">{text}</Badge> : null;
    })
    .filter(Boolean);

  return (
    <Card className="flex flex-col">
        <CardHeader className="flex-grow">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.ministry} &bull; {opportunity.location}</CardDescription>
                </div>
            </div>
            <div className="pt-4 space-y-3">
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                <p className="text-sm font-semibold text-muted-foreground">Commitment: {opportunity.commitment}</p>
                <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                </div>
                 {detailBadges.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {detailBadges}
                    </div>
                )}
            </div>
        </CardHeader>
        <CardFooter className="border-t pt-4">
            <div className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PostedByIcon className="h-4 w-4" />
                    <span className="truncate">{opportunity.postedBy.name}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsLiked(p => !p)}>
                        <Heart className={cn("w-4 h-4 text-muted-foreground", isLiked && "fill-destructive text-destructive")} />
                    </Button>
                    <span className="text-sm text-muted-foreground w-6">{opportunity.likes + (isLiked ? 1 : 0)}</span>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm">Apply Now</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                           <VolunteerApplicationForm opportunityTitle={opportunity.title} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </CardFooter>
    </Card>
  );
}
