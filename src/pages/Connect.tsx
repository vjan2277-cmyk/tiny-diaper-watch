import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bluetooth, Wifi, Search, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Device {
  id: string;
  name: string;
  rssi: number;
  type: "bluetooth" | "wifi";
}

const Connect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [connectionType, setConnectionType] = useState<"bluetooth" | "wifi">("bluetooth");

  const mockDevices: Device[] = [
    { id: "1", name: "Smart Pod #1", rssi: -45, type: "bluetooth" },
    { id: "2", name: "Smart Pod #2", rssi: -62, type: "bluetooth" },
    { id: "3", name: "Smart Pod WiFi", rssi: -55, type: "wifi" },
  ];

  const handleScan = () => {
    setScanning(true);
    setDevices([]);
    
    toast({
      title: "Scanning...",
      description: `Looking for ${connectionType === "bluetooth" ? "Bluetooth" : "Wi-Fi"} devices`,
    });

    // Simulate device discovery
    setTimeout(() => {
      const filteredDevices = mockDevices.filter(d => d.type === connectionType);
      setDevices(filteredDevices);
      setScanning(false);
      
      toast({
        title: "Scan Complete",
        description: `Found ${filteredDevices.length} device${filteredDevices.length !== 1 ? 's' : ''}`,
      });
    }, 2000);
  };

  const handleConnect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    
    toast({
      title: "Connecting...",
      description: "Establishing connection to Smart Pod",
    });

    setTimeout(() => {
      toast({
        title: "Connected!",
        description: "Successfully connected to Smart Pod",
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1500);
  };

  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return "Excellent";
    if (rssi > -60) return "Good";
    if (rssi > -70) return "Fair";
    return "Weak";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-6">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
            <span className="text-5xl">🍼</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Connect Device</h1>
          <p className="text-muted-foreground">
            Pair your Smart Diaper Pod to start monitoring
          </p>
        </div>

        {/* Connection Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant={connectionType === "bluetooth" ? "default" : "outline"}
            className="h-20 rounded-2xl"
            onClick={() => setConnectionType("bluetooth")}
          >
            <div className="flex flex-col items-center gap-2">
              <Bluetooth className="w-6 h-6" />
              <span className="text-sm font-medium">Bluetooth</span>
            </div>
          </Button>
          <Button
            variant={connectionType === "wifi" ? "default" : "outline"}
            className="h-20 rounded-2xl"
            onClick={() => setConnectionType("wifi")}
          >
            <div className="flex flex-col items-center gap-2">
              <Wifi className="w-6 h-6" />
              <span className="text-sm font-medium">Wi-Fi</span>
            </div>
          </Button>
        </div>

        {/* Scan Button */}
        <Button
          className="w-full h-14 rounded-2xl mb-6 text-base font-semibold"
          onClick={handleScan}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <Search className="w-5 h-5 mr-2 animate-pulse" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Scan for Devices
            </>
          )}
        </Button>

        {/* Devices List */}
        <div className="space-y-3">
          {devices.length === 0 && !scanning && (
            <Card className="p-8 text-center bg-card/50 backdrop-blur border-border/50">
              <p className="text-muted-foreground">
                No devices found. Tap scan to search.
              </p>
            </Card>
          )}

          {devices.map((device) => (
            <Card
              key={device.id}
              className="p-4 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50 hover:shadow-[var(--shadow-soft)] transition-all cursor-pointer"
              onClick={() => handleConnect(device.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    {device.type === "bluetooth" ? (
                      <Bluetooth className="w-5 h-5 text-primary" />
                    ) : (
                      <Wifi className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{device.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Signal: {getSignalStrength(device.rssi)}
                    </p>
                  </div>
                </div>
                {selectedDevice === device.id ? (
                  <div className="bg-success/10 p-2 rounded-full">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Connect
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6 p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground/80">
            <span className="font-semibold">Tip:</span> Make sure your Smart Diaper Pod is 
            powered on and within range.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Connect;
