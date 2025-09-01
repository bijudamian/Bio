"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  MessageCircle,
  Users,
  Eye,
  Settings,
  Activity,
  Globe,
  Zap,
  Shield,
  Database,
  BarChart3,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export function AdminPanel() {
  const { user, isSignedIn } = useUser()
  const [isExpanded, setIsExpanded] = useState(false)
  const [stats, setStats] = useState({
    visitors: 247,
    messages: 12,
    activeUsers: 3,
    uptime: "99.9%",
    responseTime: "120ms",
    githubSync: "2 min ago",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        messages: prev.messages + (Math.random() > 0.8 ? 1 : 0),
        activeUsers: Math.max(1, prev.activeUsers + (Math.random() > 0.5 ? 1 : -1)),
        responseTime: `${Math.floor(Math.random() * 50 + 100)}ms`,
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (!isSignedIn) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <Card
          className="bg-quantum-card/95 backdrop-blur-md border-quantum-border shadow-2xl transition-all duration-300 ease-in-out"
          style={{ width: isExpanded ? "400px" : "320px" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-quantum-light flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-quantum-primary" />
                <span>Admin Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-6 w-6 p-0 text-quantum-muted hover:text-quantum-light"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`grid gap-3 ${isExpanded ? "grid-cols-3" : "grid-cols-2"}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-quantum-darker rounded-lg cursor-help">
                    <Eye className="w-5 h-5 mx-auto mb-1 text-quantum-primary" />
                    <div className="text-lg font-semibold text-quantum-light">{stats.visitors}</div>
                    <div className="text-xs text-quantum-muted">Visitors</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total unique visitors today</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-quantum-darker rounded-lg cursor-help">
                    <MessageCircle className="w-5 h-5 mx-auto mb-1 text-quantum-secondary" />
                    <div className="text-lg font-semibold text-quantum-light">{stats.messages}</div>
                    <div className="text-xs text-quantum-muted">Messages</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Unread chat messages</p>
                </TooltipContent>
              </Tooltip>

              {isExpanded && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-center p-3 bg-quantum-darker rounded-lg cursor-help">
                      <Users className="w-5 h-5 mx-auto mb-1 text-quantum-accent" />
                      <div className="text-lg font-semibold text-quantum-light">{stats.activeUsers}</div>
                      <div className="text-xs text-quantum-muted">Active</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Currently active users</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {isExpanded && (
              <div className="space-y-2 p-3 bg-quantum-surface rounded-lg">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-quantum-muted flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Response Time
                  </span>
                  <span className="text-quantum-light font-mono">{stats.responseTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-quantum-muted flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Uptime
                  </span>
                  <span className="text-green-400 font-mono">{stats.uptime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-quantum-muted flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    GitHub Sync
                  </span>
                  <span className="text-quantum-light font-mono">{stats.githubSync}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat Management
                {stats.messages > 0 && (
                  <Badge className="ml-auto bg-quantum-secondary/20 text-quantum-secondary">{stats.messages}</Badge>
                )}
              </Button>

              <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics Dashboard
              </Button>

              {isExpanded && (
                <>
                  <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
                    <Database className="w-4 h-4 mr-2" />
                    GitHub Projects
                    <RefreshCw className="w-3 h-3 ml-auto" />
                  </Button>

                  <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-quantum-border">
              <p className="text-xs text-quantum-muted text-center">
                Welcome back, <span className="text-quantum-primary font-medium">{user?.firstName || "Admin"}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
