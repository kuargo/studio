
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, Music, Search, Video, UtensilsCrossed, HeartHandshake, Construction, Code, Church, Building, User, PlusCircle, Heart, PenSquare, Info, MapPin, Map } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { CreateOpportunityForm } from "@/components/app/create-opportunity-form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { VolunteerApplicationForm } from "@/components/app/volunteer-application-form";
import { SuggestOpportunityForm } from "@/components/app/suggest-opportunity-form";
import Image from "next/image";

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
    <div className="space-y-6">
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

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-4 lg:sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Map className="text-primary"/> Map View</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/600x600.png" width={600} height={600} alt="Map of opportunities" className="object-cover" data-ai-hint="world map pins"/>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search opportunities..." className="pl-10"/>
                    </div>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="worship">Worship</SelectItem>
                            <SelectItem value="outreach">Outreach</SelectItem>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="tech">Tech</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger><SelectValue placeholder="Distance" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">Within 5 miles</SelectItem>
                            <SelectItem value="10">Within 10 miles</SelectItem>
                            <SelectItem value="25">Within 25 miles</SelectItem>
                            <SelectItem value="any">Any distance</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
             </Card>
        </div>
        <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {opportunities.map(opp => <OpportunityCard key={opp.title} opportunity={opp} />)}
                
                <Card className="border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
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
      </div>
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: typeof opportunities[0] }) {
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
        else if (key === 'stipend' && value !== "None") text = `Stipend: ${value}`;
        else if (key === 'fareRefund') text = `Fare Refund: ${value}`;
        else if (key === 'equipmentNeeded') text = `Requires: ${value}`;
        return text ? <Badge key={key} variant="secondary">{text}</Badge> : null;
    })
    .filter(Boolean);

  return (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.ministry}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <p className="text-sm text-muted-foreground">{opportunity.description}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{opportunity.location}</span>
                </div>
                <p><span className="font-semibold text-foreground">Commitment:</span> {opportunity.commitment}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {opportunity.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
            </div>
             {detailBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t mt-4">
                    {detailBadges}
                </div>
            )}
        </CardContent>
        <CardFooter className="border-t pt-4">
            <div className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground overflow-hidden">
                    <PostedByIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{opportunity.postedBy.name}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsLiked(p => !p)}>
                        <Heart className={cn("w-4 h-4 text-muted-foreground", isLiked && "fill-destructive text-destructive")} />
                    </Button>
                    <span className="text-sm text-muted-foreground w-6 text-center">{opportunity.likes + (isLiked ? 1 : 0)}</span>
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
