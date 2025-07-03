import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gift, Landmark, Globe } from "lucide-react";


const givingHistory = [
    { date: "2024-08-01", amount: "$100.00", fund: "Tithe", method: "Credit Card" },
    { date: "2024-07-15", amount: "$50.00", fund: "Building Fund", method: "Credit Card" },
    { date: "2024-07-01", amount: "$100.00", fund: "Tithe", method: "Credit Card" },
]

export default function GivingPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Secure Online Giving</CardTitle>
            <CardDescription>Your generosity fuels our mission. Thank you for your faithful giving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="amount" placeholder="0.00" className="pl-6 font-semibold text-lg" />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Fund</Label>
                <Select defaultValue="tithe">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a fund" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tithe">Tithe & Offerings</SelectItem>
                        <SelectItem value="building">Building Fund</SelectItem>
                        <SelectItem value="missions">Missions</SelectItem>
                        <SelectItem value="outreach">Community Outreach</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Frequency</Label>
                 <RadioGroup defaultValue="one-time" className="flex gap-4">
                    <Label htmlFor="r1" className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                        <RadioGroupItem value="one-time" id="r1" />
                        <span>One Time</span>
                    </Label>
                    <Label htmlFor="r2" className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                        <RadioGroupItem value="weekly" id="r2" />
                        <span>Weekly</span>
                    </Label>
                    <Label htmlFor="r3" className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                        <RadioGroupItem value="monthly" id="r3" />
                        <span>Monthly</span>
                    </Label>
                </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">Give Now</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Ways to Give</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                        <Gift className="w-5 h-5 text-primary"/>
                    </div>
                    <span>Online / App</span>
                </div>
                <div className="flex items-center gap-3">
                     <div className="p-2 bg-primary/10 rounded-md">
                        <Landmark className="w-5 h-5 text-primary"/>
                    </div>
                    <span>In Person</span>
                </div>
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-primary/10 rounded-md">
                        <Globe className="w-5 h-5 text-primary"/>
                    </div>
                    <span>Other (Stocks, etc.)</span>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Giving History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Fund</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {givingHistory.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{item.date}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.fund}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}