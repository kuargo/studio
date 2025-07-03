import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, PlusCircle } from "lucide-react";

const events = [
  {
    title: "Young Adults Worship Night",
    date: "Friday, August 16th",
    time: "7:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    description: "Join us for a powerful night of worship, prayer, and community.",
    type: "Worship"
  },
  {
    title: "Community Food Drive",
    date: "Saturday, August 17th",
    time: "9:00 AM - 12:00 PM",
    location: "Church Parking Lot",
    description: "Help us serve our city by donating non-perishable food items.",
    type: "Outreach"
  },
  {
    title: "Sunday Morning Service",
    date: "Sunday, August 18th",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description: "Our weekly gathering. All are welcome!",
    type: "Service"
  },
  {
    title: "Theology on Tap (Online)",
    date: "Tuesday, August 20th",
    time: "8:00 PM",
    location: "Zoom",
    description: "A casual online discussion about faith and life.",
    type: "Online"
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold">Events Hub</h1>
          <p className="text-muted-foreground">Discover what's happening and get involved.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Create Event
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="worship">Worship</TabsTrigger>
          <TabsTrigger value="outreach">Outreach</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event, i) => <EventCard key={i} {...event} />)}
          </div>
        </TabsContent>
        <TabsContent value="worship">
          <div className="grid gap-4 md:grid-cols-2">
            {events.filter(e => e.type === 'Worship').map((event, i) => <EventCard key={i} {...event} />)}
          </div>
        </TabsContent>
        <TabsContent value="outreach">
          <div className="grid gap-4 md:grid-cols-2">
            {events.filter(e => e.type === 'Outreach').map((event, i) => <EventCard key={i} {...event} />)}
          </div>
        </TabsContent>
        <TabsContent value="online">
          <div className="grid gap-4 md:grid-cols-2">
            {events.filter(e => e.type === 'Online').map((event, i) => <EventCard key={i} {...event} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EventCard({ title, date, time, location, description }: typeof events[0]) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
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
            <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://placehold.co/40x40/f9a8d4/4c1d95.png" alt="User 1" data-ai-hint="woman portrait" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://placehold.co/40x40/a5b4fc/1e3a8a.png" alt="User 2" data-ai-hint="man portrait" />
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-background bg-muted text-muted-foreground text-xs font-semibold">+12</div>
            </div>
            <Button>RSVP</Button>
        </div>
      </CardContent>
    </Card>
  )
}