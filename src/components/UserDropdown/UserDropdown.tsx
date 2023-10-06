"use client"
import { useSession } from "next-auth/react";
import { User } from "react-feather";
import { Avatar } from "../ui/Avatar/Avatar";
import { DropdownMenu } from "../ui/DropdownMenu/DropdownMenu";
import { IconButton } from "../ui/IconButton/IconButton";
import { Link } from "../ui/Link/Link";
import styles from './UserDropdown.module.css';
interface Props {

}

export const UserDropdown = ({ }: Props): JSX.Element => {

  const { data: session } = useSession()

  const loggedIn = session?.user ? true : false

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            variant="solid">
            {
              loggedIn &&
              <Avatar
                variant="solid"
                className={styles['trigger-icon']}
                src={session?.user?.image!!}
                fallback={session?.user?.email?.substring(0,2)!!}
              />
            }
            {
              !loggedIn &&
              <User className={styles['trigger-icon']} />
            }
          </IconButton>

        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          {
            loggedIn &&
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
          }
          {
            loggedIn &&
            <DropdownMenu.Item color="red">
              <Link href={'/api/auth/signout'}>Sign Out</Link>
            </DropdownMenu.Item>
          }
          {
            !loggedIn &&
            <DropdownMenu.Item>
              <Link href={'/api/auth/signin'}>Sign in</Link>
            </DropdownMenu.Item>
          }
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}