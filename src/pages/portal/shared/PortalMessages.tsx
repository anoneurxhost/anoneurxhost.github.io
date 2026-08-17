import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCheck, Paperclip, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePortal } from "../PortalContext";
import { PageHeader, PortalPage, PortalSection } from "../components/ui";

const conversations = [
  { id: "conv1", name: "Ahmed Raza", role: "Internship Mentor", initials: "AR", gradient: "from-emerald-500 to-teal-500", unread: 0 },
  { id: "conv2", name: "Ayesha Khan", role: "Hackathon Teammate", initials: "AK", gradient: "from-purple-500 to-fuchsia-500", unread: 0 },
  { id: "conv3", name: "Prof. Sarah Smith", role: "Web Engineering", initials: "SS", gradient: "from-blue-500 to-cyan-500", unread: 1 },
];

export const PortalMessages = () => {
  const { messages, unreadMessages, markMessageRead } = usePortal();
  const [activeConversation, setActiveConversation] = useState("conv1");
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);

  const active = conversations.find((c) => c.id === activeConversation) ?? conversations[0];

  const handleSend = () => {
    if (!draft.trim()) return;
    setLocalMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: "Muhammad Qasim",
        senderInitials: "MQ",
        text: draft.trim(),
        time: "Now",
        read: true,
        mine: true,
      },
    ]);
    setDraft("");
  };

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Direct conversations with mentors, teammates and faculty — across every program."
        icon={MessageSquare}
        gradient="from-emerald-500 to-teal-500"
        actions={
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            {unreadMessages} unread
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation list */}
        <PortalSection className="lg:col-span-1">
          <Card className="glass-dark border-white/10 h-full">
            <CardContent className="p-4 space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setActiveConversation(conversation.id);
                    localMessages.forEach((m) => !m.mine && markMessageRead(m.id));
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all",
                    activeConversation === conversation.id
                      ? "bg-gradient-to-r from-emerald-600/30 to-teal-600/20 border border-emerald-500/20"
                      : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  <div className={cn("h-10 w-10 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0", conversation.gradient)}>
                    {conversation.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{conversation.name}</p>
                    <p className="text-xs text-slate-500 truncate">{conversation.role}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="h-5 w-5 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </PortalSection>

        {/* Thread */}
        <PortalSection className="lg:col-span-2">
          <Card className="glass-dark border-white/10 h-full flex flex-col">
            <CardContent className="p-4 border-b border-white/5 flex items-center gap-3">
              <div className={cn("h-9 w-9 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white", active.gradient)}>
                {active.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{active.name}</p>
                <p className="text-[11px] text-slate-500">{active.role}</p>
              </div>
              <div className="ml-auto">
                <Badge variant="outline" className="border-white/15 text-slate-300">
                  <UserRound className="h-3 w-3 mr-1" /> Online
                </Badge>
              </div>
            </CardContent>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[420px]">
              {localMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", message.mine ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                      message.mine
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-sm"
                        : "bg-white/[0.06] text-slate-200 border border-white/5 rounded-bl-sm"
                    )}
                  >
                    <p>{message.text}</p>
                    <p className={cn("mt-1 text-[10px] flex items-center gap-1", message.mine ? "text-white/70" : "text-slate-500")}>
                      {message.time}
                      {message.mine && <CheckCheck className="h-3 w-3" />}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Message ${active.name.split(" ")[0]}…`}
                className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shrink-0"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </PortalSection>
      </div>
    </PortalPage>
  );
};

export default PortalMessages;
