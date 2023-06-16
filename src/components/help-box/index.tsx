import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Car Renter', 'Business Owner'];
  const applicationName = `My car rental app`;
  const tenantName = `Rental Agency`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Business Owner adds a Rental Agency
As a Business Owner,
I want to add a Rental Agency to the application,
So that I can manage my car rental business.

Title: Business Owner adds cars to Rental Agency
As a Business Owner,
I want to add cars to my Rental Agency,
So that Car Renters can search and rent them.

Title: Business Owner updates car availability
As a Business Owner,
I want to update the availability of cars in my Rental Agency,
So that Car Renters can see the current availability.

Title: Car Renter searches for available cars in Warsaw
As a Car Renter,
I want to search for available cars in Warsaw,
So that I can find a suitable car to rent.

Title: Car Renter views car details
As a Car Renter,
I want to view the details of a specific car,
So that I can decide if it meets my requirements.

Title: Car Renter rents a car
As a Car Renter,
I want to rent a car from a Rental Agency,
So that I can use it for my needs.

Title: Business Owner confirms car rental
As a Business Owner,
I want to confirm a car rental request,
So that the Car Renter can proceed with the rental.

Title: Car Renter returns a rented car
As a Car Renter,
I want to return a rented car to the Rental Agency,
So that the rental process is completed.

Title: Business Owner updates car availability after return
As a Business Owner,
I want to update the availability of a returned car,
So that it can be rented by other Car Renters.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
