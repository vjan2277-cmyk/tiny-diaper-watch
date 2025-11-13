import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, ThermometerSun, AlertCircle, Clock } from "lucide-react";

interface HistoryEvent {
  id: string;
  type: "wet" | "soiled" | "both" | "temperature";
  timestamp: Date;
  details: string;
}

const History = () => {
  const mockHistory: HistoryEvent[] = [
    {
      id: "1",
      type: "wet",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: "Moisture level: 78%",
    },
    {
      id: "2",
      type: "soiled",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      details: "Gas level: 63%",
    },
    {
      id: "3",
      type: "both",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      details: "Moisture: 85%, Gas: 71%",
    },
    {
      id: "4",
      type: "temperature",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      details: "Temperature spike: 38.2°C",
    },
    {
      id: "5",
      type: "wet",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      details: "Moisture level: 72%",
    },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "wet":
        return <Droplets className="w-5 h-5 text-primary" />;
      case "soiled":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "both":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "temperature":
        return <ThermometerSun className="w-5 h-5 text-accent" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case "wet": return "default";
      case "soiled": return "secondary";
      case "both": return "destructive";
      case "temperature": return "outline";
      default: return "secondary";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  };

  const filterByPeriod = (period: string) => {
    const now = new Date();
    return mockHistory.filter(event => {
      const diffHours = (now.getTime() - event.timestamp.getTime()) / (1000 * 60 * 60);
      
      switch (period) {
        case "today":
          return diffHours < 24;
        case "week":
          return diffHours < 168; // 7 days
        case "month":
          return diffHours < 720; // 30 days
        default:
          return true;
      }
    });
  };

  const EventList = ({ events }: { events: HistoryEvent[] }) => (
    <ScrollArea className="h-[calc(100vh-250px)]">
      <div className="space-y-3 pr-4">
        {events.length === 0 ? (
          <Card className="p-8 text-center bg-card/50 backdrop-blur border-border/50">
            <p className="text-muted-foreground">No events in this period</p>
          </Card>
        ) : (
          events.map((event) => (
            <Card
              key={event.id}
              className="p-4 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50"
            >
              <div className="flex items-start gap-3">
                <div className="bg-muted/50 p-3 rounded-xl mt-1">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Badge
                      variant={getEventBadgeVariant(event.type)}
                      className="capitalize rounded-full"
                    >
                      {event.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium mt-2">
                    Diaper change needed
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.details}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 pb-20">
      <div className="max-w-2xl mx-auto pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">History</h1>
          <p className="text-muted-foreground">
            Track all diaper events and alerts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
            <p className="text-2xl font-bold text-foreground mb-1">12</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </Card>
          <Card className="p-4 text-center bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
            <p className="text-2xl font-bold text-foreground mb-1">84</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </Card>
          <Card className="p-4 text-center bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
            <p className="text-2xl font-bold text-foreground mb-1">2.5h</p>
            <p className="text-xs text-muted-foreground">Avg Time</p>
          </Card>
        </div>

        {/* Timeline Tabs */}
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today">
            <EventList events={filterByPeriod("today")} />
          </TabsContent>
          
          <TabsContent value="week">
            <EventList events={filterByPeriod("week")} />
          </TabsContent>
          
          <TabsContent value="month">
            <EventList events={filterByPeriod("month")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
