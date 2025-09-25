'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  PlusCircle, 
  Edit3, 
  Share2, 
  Settings, 
  BarChart3,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: TrendingUp,
    href: '/',
    active: true
  },
  {
    title: 'Create Content',
    icon: PlusCircle,
    href: '/create',
    active: false
  },
  {
    title: 'Content Editor',
    icon: Edit3,
    href: '/editor',
    active: false
  },
  {
    title: 'Export & Publish',
    icon: Share2,
    href: '/publish',
    active: false
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
    active: false
  },
  {
    title: 'AI Studio',
    icon: Zap,
    href: '/ai-studio',
    active: false
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
    active: false
  }
];

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      'flex flex-col bg-card border-r border-border transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">TrendCraft</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              variant={item.active ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start transition-all',
                isCollapsed ? 'px-2' : 'px-3',
                item.active && 'bg-primary text-primary-foreground'
              )}
              asChild
            >
              <a href={item.href}>
                <Icon className={cn('w-5 h-5', !isCollapsed && 'mr-3')} />
                {!isCollapsed && <span>{item.title}</span>}
              </a>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2024 TrendCraft Studio</p>
          </div>
        </div>
      )}
    </div>
  );
}