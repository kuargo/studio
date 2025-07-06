import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, PlusCircle, Heart, Users, Search, Map } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const events = [
  {
    title: "Young Adults Worship Night",
    date: "Friday, August 16th",
    time: "7:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    description: "Join us for a powerful night of worship, prayer, and community.",
    type: "Worship",
    rsvps: 128,
    likes: 45
  },
  {
    title: "Community Food Drive",
    date: "Saturday, August 17th",
    time: "9:00 AM - 12:00 PM",
    location: "Church Parking Lot",
    description: "Help us serve our city by donating non-perishable food items.",
    type: "Outreach",
    rsvps: 72,
    likes: 30
  },
  {
    title: "Sunday Morning Service",
    date: "Sunday, August 18th",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description: "Our weekly gathering. All are welcome!",
    type: "Service",
    rsvps: 250,
    likes: 110
  },
  {
    title: "Theology on Tap (Online)",
    date: "Tuesday, August 20th",
    time: "8:00 PM",
    location: "Zoom",
    description: "A casual online discussion about faith and life.",
    type: "Online",
    rsvps: 45,
    likes: 15
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events Hub</h1>
          <p className="text-muted-foreground">Discover what's happening and get involved.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-4 lg:sticky top-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Map className="text-primary"/> Map View</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/600x600.png" width={600} height={600} alt="Map of events" className="object-cover" data-ai-hint="world map pins"/>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search events..." className="pl-10"/>
                    </div>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="worship">Worship</SelectItem>
                            <SelectItem value="outreach">Outreach</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
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
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="worship">Worship</TabsTrigger>
                <TabsTrigger value="outreach">Outreach</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                <div className="grid gap-4">
                    {events.map((event, i) => <EventCard key={i} {...event} />)}
                </div>
                </TabsContent>
                <TabsContent value="worship" className="mt-6">
                <div className="grid gap-4">
                    {events.filter(e => e.type === 'Worship').map((event, i) => <EventCard key={i} {...event} />)}
                </div>
                </TabsContent>
                <TabsContent value="outreach" className="mt-6">
                <div className="grid gap-4">
                    {events.filter(e => e.type === 'Outreach').map((event, i) => <EventCard key={i} {...event} />)}
                </div>
                </TabsContent>
                <TabsContent value="online" className="mt-6">
                <div className="grid gap-4">
                    {events.filter(e => e.type === 'Online').map((event, i) => <EventCard key={i} {...event} />)}
                </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}

function EventCard({ title, date, time, location, description, rsvps, likes }: typeof events[0]) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{date} at {time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                 <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{rsvps}</span> Going
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    <span className="font-semibold">{likes}</span> Likes
                 </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost">
                    <Heart className="w-4 h-4" />
                </Button>
                <Button>RSVP</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
