import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, Search, Settings , Plus } from "lucide-react"
import { Link } from 'react-router';

const items = [
    {
        title: "Dashboard",
        url: "/company/dashboard",
        icon: Home,
    },
    {
        title: "Add Item",
        url: "/company/add-item",
        icon: Plus,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

const CompanySidebar = () => {
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

export default CompanySidebar
