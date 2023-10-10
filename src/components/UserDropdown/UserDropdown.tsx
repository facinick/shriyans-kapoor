"use client";
import { LogIn, LogOut, LucideIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu/DropdownMenu";
import { Flex } from "../ui/Flex/Flex";
import styles from "./UserDropdown.module.css";

interface Props {}

interface Item {
  id: number;
  label: string;
  href: string;
  Icon: LucideIcon;
  color?: ComponentProps<typeof DropdownMenuItem>["color"];
}

const UNAUTHENTICATED_MENU_ITEMS: Item[] = [
  {
    id: 0,
    label: "Sign In",
    href: "/api/auth/signin",
    Icon: LogIn,
  },
];

const AUTHENTICATED_MENU_ITEMS: Item[] = [
  {
    id: 0,
    label: "Profile",
    href: "#",
    Icon: User,
  },
  {
    id: 1,
    label: "Sign Out",
    href: "/api/auth/signout",
    Icon: LogOut,
    color: "red",
  },
];

const UserDropdown = ({}: Props): JSX.Element => {
  const { data: session } = useSession();

  const router = useRouter();

  const loggedIn = session?.user ? true : false;

  const handleClick = (item: Item) => {
    router.push(item.href);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"}>
            {loggedIn && (
              <Avatar className={styles["trigger-icon"]}>
                <AvatarImage src={session?.user?.image!!} />
                <AvatarFallback>
                  {session?.user?.email?.substring(0, 2)!!}
                </AvatarFallback>
              </Avatar>
            )}
            {!loggedIn && <User className={styles["trigger-icon"]} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent loop className={styles.content}>
          {loggedIn &&
            AUTHENTICATED_MENU_ITEMS.map((item) => {
              const { Icon, label, id, color } = item;

              return (
                <DropdownMenuItem
                  onClick={() => handleClick(item)}
                  key={id}
                  {...(color && { color })}
                  className={styles.item}
                >
                  <Flex align={"center"} justify={"between"}>
                    <Icon />
                    {label}
                  </Flex>
                </DropdownMenuItem>
              );
            })}
          {!loggedIn &&
            UNAUTHENTICATED_MENU_ITEMS.map((item) => {
              const { Icon, label, id } = item;

              return (
                <DropdownMenuItem
                  onClick={() => handleClick(item)}
                  key={id}
                  className={styles.item}
                >
                  <Flex align={"center"} justify={"between"}>
                    <Icon />
                    {label}
                  </Flex>
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdown;
