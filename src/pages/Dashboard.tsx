import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baby, Droplets, ThermometerSun, Battery, Wifi, RefreshCw, Bell, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DiaperStatus = "dry" | "wet" | "soiled" | "both";

interface DeviceData {
  diaper_status: DiaperStatus;
  moisture: number;
  gas_level: number;
  temperature: number;
  battery: number;
  position: "back" | "stomach" | "left_side" | "right_side";
  lastUpdated: Date;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceData>({
    diaper_status: "dry",
    moisture: 0,
    gas_level: 0,
    temperature: 36.5,
    battery: 100,
    position: "back",
    lastUpdated: new Date(),
  });

  const getStatusColor = (status: DiaperStatus): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case "dry": return "default";
      case "wet": return "default";
      case "soiled": return "secondary";
      case "both": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: DiaperStatus) => {
    switch (status) {
      case "dry": return "✓";
      case "wet": return "💧";
      case "soiled": return "⚠️";
      case "both": return "❗";
      default: return "?";
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing...",
      description: "Fetching latest data from device",
    });
    // Simulate data refresh
    setDeviceData({
      ...deviceData,
      lastUpdated: new Date(),
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Baby Monitor</h1>
            <p className="text-sm text-muted-foreground">Smart Diaper Pod</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="w-5 h-5" />
        </Button>
      </div>

      {/* Connection Status */}
      <Card className="p-4 mb-6 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi className={`w-5 h-5 ${isConnected ? 'text-success' : 'text-muted-foreground'}`} />
            <div>
              <p className="font-medium text-foreground">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
              <p className="text-xs text-muted-foreground">
                ESP32 Smart Pod
              </p>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className="rounded-full">
            {isConnected ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </Card>

      {/* Main Status Card */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-soft)] border-border/50">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
            <span className="text-5xl">{getStatusIcon(deviceData.diaper_status)}</span>
          </div>
          <h2 className="text-3xl font-bold capitalize mb-2 text-foreground">
            {deviceData.diaper_status}
          </h2>
          <Badge 
            variant={getStatusColor(deviceData.diaper_status)} 
            className="text-sm px-4 py-1 rounded-full"
          >
            Diaper Status
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Moisture</p>
            <p className="text-2xl font-bold text-foreground">{deviceData.moisture}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Gas Level</p>
            <p className="text-2xl font-bold text-foreground">{deviceData.gas_level}%</p>
          </div>
        </div>
      </Card>

      {/* Position Card */}
      <Card className="p-4 mb-6 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-2.5 rounded-xl">
              <RotateCcw className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Baby Position</p>
              <p className="text-xl font-bold text-foreground capitalize">
                {deviceData.position.replace("_", " ")}
              </p>
            </div>
          </div>
          <Badge variant={deviceData.position === "stomach" ? "destructive" : "default"} className="rounded-full">
            {deviceData.position === "stomach" ? "⚠️ Alert" : "✓ Safe"}
          </Badge>
        </div>
      </Card>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Temperature Card */}
        <Card className="p-4 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <ThermometerSun className="w-5 h-5 text-accent" />
            <p className="text-sm font-medium text-muted-foreground">Temperature</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{deviceData.temperature}°C</p>
          <p className="text-xs text-muted-foreground mt-1">Normal range</p>
        </Card>

        {/* Battery Card */}
        <Card className="p-4 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="w-5 h-5 text-success" />
            <p className="text-sm font-medium text-muted-foreground">Battery</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{deviceData.battery}%</p>
          <p className="text-xs text-muted-foreground mt-1">Fully charged</p>
        </Card>
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-between px-2 mb-4">
        <p className="text-sm text-muted-foreground">
          Last updated: {formatTime(deviceData.lastUpdated)}
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          className="rounded-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
