import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, Search, Settings , Plus } from "lucide-react"
import { Link } from 'react-router';

const items = [
    {
        title: "Dashboard",
        url: "/user/dashboard",
        icon: Home,
    },
    {
        title: "View Packages",
        url: "/user/packages",
        icon: Plus,
    },
    {
        title: "View Completed Packages",
        url: "/user/completed/packages",
        icon: Plus,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

const UserSidebar = () => {
    return (
        <div>
                <Sidebar className='py-16' >
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link to={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

        </div>
    )
}

export default UserSidebar
