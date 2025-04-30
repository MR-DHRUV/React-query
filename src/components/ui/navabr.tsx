import { Menu } from "lucide-react";
import {
    Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
}

interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
}

const Navbar = ({
    logo = {
        url: "/",
        src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "Shadcnblocks.com",
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "Users", url: "/users",
        },
        {
            title: "Posts", url: "/posts"
        },
        {
            title: "Products", url: "/products",
        },
        {
            title: "Quotes", url: "/quotes",
        },
    ],
}: NavbarProps) => {
    return (
        <section className="w-full bg-background flex justify-center sticky top-4 z-50">
            {/* Desktop Menu */}
            <nav className="hidden justify-between lg:flex min-w-[800px] border-b-2 p-4 gap-20 rounded-3xl shadow-md">
                <a href={logo.url} className="flex items-center gap-2">
                    <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    <span className="text-lg font-semibold tracking-tighter">
                        {logo.title}
                    </span>
                </a>
                <div className="flex items-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menu.map((item) => renderMenuItem(item))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <a href={logo.url} className="flex items-center gap-2">
                                        <img src={logo.src} className="max-h-8" alt={logo.alt} />
                                    </a>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 p-4">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="flex w-full flex-col gap-4"
                                >
                                    {menu.map((item) => renderMobileMenuItem(item))}
                                </Accordion>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <Link
                to={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </Link>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

export { Navbar };
