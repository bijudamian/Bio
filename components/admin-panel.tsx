"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, Eye, Settings } from "lucide-react"

export function AdminPanel() {
  const { user, isSignedIn } = useUser()

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-quantum-card/95 backdrop-blur-md border-quantum-border shadow-2xl w-80">
        <CardHeader className="pb-3">
          <CardTitle className="text-quantum-light flex items-center justify-between">
            <span>Admin Panel</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              Online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-quantum-darker rounded-lg">
              <Eye className="w-5 h-5 mx-auto mb-1 text-quantum-primary" />
              <div className="text-lg font-semibold text-quantum-light">247</div>
              <div className="text-xs text-quantum-muted">Visitors</div>
            </div>
            <div className="text-center p-3 bg-quantum-darker rounded-lg">
              <MessageCircle className="w-5 h-5 mx-auto mb-1 text-quantum-secondary" />
              <div className="text-lg font-semibold text-quantum-light">12</div>
              <div className="text-xs text-quantum-muted">Messages</div>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
              <MessageCircle className="w-4 h-4 mr-2" />
              View Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
              <Users className="w-4 h-4 mr-2" />
              Visitor Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start text-quantum-light hover:bg-quantum-darker">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
