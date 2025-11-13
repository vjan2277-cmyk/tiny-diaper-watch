import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Baby, Bell, Bluetooth, User, Shield, Info } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [babyName, setBabyName] = useState("Baby");
  const [babyAge, setBabyAge] = useState("3 months");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 pb-20">
      <div className="max-w-2xl mx-auto pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your app preferences
          </p>
        </div>

        {/* Baby Profile */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Baby className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Baby Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="babyName" className="text-foreground">Name</Label>
              <Input
                id="babyName"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                className="mt-2"
                placeholder="Enter baby's name"
              />
            </div>
            
            <div>
              <Label htmlFor="babyAge" className="text-foreground">Age</Label>
              <Input
                id="babyAge"
                value={babyAge}
                onChange={(e) => setBabyAge(e.target.value)}
                className="mt-2"
                placeholder="e.g., 3 months"
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for diaper changes
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sound</p>
                <p className="text-sm text-muted-foreground">
                  Play sound with notifications
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                disabled={!notificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Vibration</p>
                <p className="text-sm text-muted-foreground">
                  Vibrate on alerts
                </p>
              </div>
              <Switch
                checked={vibrationEnabled}
                onCheckedChange={setVibrationEnabled}
                disabled={!notificationsEnabled}
              />
            </div>
          </div>
        </Card>

        {/* Device Settings */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Bluetooth className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Device</h2>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Reconnect to Device
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Forget Device
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Device Calibration
            </Button>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur shadow-[var(--shadow-card)] border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">About</h2>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="text-foreground font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Device Model</span>
              <span className="text-foreground font-medium">ESP32-S3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Firmware</span>
              <span className="text-foreground font-medium">v2.1.0</span>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button
          className="w-full h-12 rounded-2xl text-base font-semibold"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
