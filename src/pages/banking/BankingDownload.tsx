import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Apple, Smartphone, Globe, Star } from "lucide-react";

const platforms = [
  { name: "iOS", icon: Apple, version: "v3.2.1", size: "48 MB", store: "App Store" },
  { name: "Android", icon: Smartphone, version: "v3.2.1", size: "52 MB", store: "Play Store" },
  { name: "Web", icon: Globe, version: "Live", size: "—", store: "Browser" },
];

const BankingDownload = () => (
  <section className="px-4 py-16">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-10">
        <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/30 text-[10px] mb-3">Download</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Open your account in 2 minutes</h1>
        <p className="text-sm text-gray-400">Available on every device you own.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map(p => (
          <Card key={p.name} className="bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl text-center">
            <CardContent className="p-6">
              <p.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">{p.name}</h3>
              <p className="text-[11px] text-gray-500 mb-4">{p.version} · {p.size}</p>
              <div className="flex items-center justify-center gap-1 mb-4 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                <span className="text-[10px] text-gray-400 ml-1">4.9</span>
              </div>
              <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs h-9">
                Get on {p.store}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default BankingDownload;
