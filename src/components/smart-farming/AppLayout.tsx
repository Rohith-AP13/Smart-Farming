'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Leaf, Droplets, LogOut, Loader2, BarChart3, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleLogout } from '@/app/actions';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onLogout = async () => {
    await handleLogout();
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    // This can happen briefly on page load or after logout.
    // The middleware will handle redirecting to login if necessary.
    return (
       <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2">
             <Bot className="h-8 w-8 text-primary" />
             <h1 className="text-xl font-bold text-primary font-headline">
               AgriAssist
             </h1>
           </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                <Link href="/dashboard"><Home />Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/crop-recommendation'}>
                <Link href="/crop-recommendation"><Leaf />Crop Recommendation</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/fertilizer-suggestion'}>
                <Link href="/fertilizer-suggestion"><Droplets />Fertilizer Suggestion</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/nutrient-chart'}>
                <Link href="/nutrient-chart"><BarChart3 />Nutrient Chart</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex flex-col gap-2 p-2">
            <span className="text-sm text-muted-foreground truncate">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={onLogout} className="justify-start gap-2">
              <LogOut />
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="flex-1 p-4 md:p-8 lg:p-12 bg-background">
            <div className="mx-auto grid max-w-7xl gap-8">
             {children}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Re-export SidebarProvider for convenience
import { SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';