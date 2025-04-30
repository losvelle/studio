
/**
 * Represents a user account.
 */
export interface User {
  /**
   * Unique identifier for the user.
   */
  id: string;
  /**
   * User's full name.
   */
  name: string;
  /**
   * User's email address.
   */
  email: string;
  /**
   * Current status of the user's subscription.
   */
  subscriptionStatus: 'Active' | 'Inactive' | 'Trial' | 'Expired';
  /**
   * The date the user registered.
   */
  joinedDate: string; // ISO date string
  /**
   * Optional: Indicates if the user has admin privileges.
   */
  isAdmin?: boolean;
   /**
    * Optional: URL to the user's profile picture.
    */
   avatarUrl?: string;
   /**
    * Optional: The current subscription plan name.
    */
   planName?: string;
}


/**
 * Asynchronously retrieves a list of users.
 * In a real application, this would fetch data from a database or API.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export async function getUsers(): Promise<User[]> {
  // Mock data for demonstration
   const mockUsers: User[] = [
    {
      id: 'usr_1a2b3c',
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      subscriptionStatus: 'Active',
      joinedDate: '2023-05-15T10:30:00Z',
      isAdmin: false,
      avatarUrl: 'https://picsum.photos/id/1011/100/100',
      planName: 'Premium',
    },
    {
      id: 'usr_4d5e6f',
      name: 'Bob Smith',
      email: 'bob.smith@sample.net',
      subscriptionStatus: 'Trial',
      joinedDate: '2024-01-20T14:00:00Z',
      isAdmin: false,
      avatarUrl: 'https://picsum.photos/id/1005/100/100',
      planName: 'Trial',
    },
    {
       id: 'usr_7g8h9i',
       name: 'Charlie Brown',
       email: 'charlie.b@mail.org',
       subscriptionStatus: 'Inactive',
       joinedDate: '2022-11-01T08:00:00Z',
       isAdmin: false,
       planName: 'Basic (Inactive)',
     },
     {
       id: 'usr_admin01',
       name: 'Admin User',
       email: 'admin@signalstream.app',
       subscriptionStatus: 'Active', // Admins might have a special status or always active
       joinedDate: '2022-01-01T00:00:00Z',
       isAdmin: true,
       avatarUrl: 'https://picsum.photos/id/1025/100/100',
       planName: 'Admin',
     },
     {
       id: 'usr_jklmno',
       name: 'Diana Prince',
       email: 'diana.p@example.com',
       subscriptionStatus: 'Expired',
       joinedDate: '2023-02-10T11:45:00Z',
       isAdmin: false,
       avatarUrl: 'https://picsum.photos/id/1027/100/100',
       planName: 'Premium (Expired)',
     },
      {
        id: 'usr_pqrstuv',
        name: 'Ethan Hunt',
        email: 'ethan.h@sample.org',
        subscriptionStatus: 'Active',
        joinedDate: '2024-03-01T16:20:00Z',
        isAdmin: false,
        avatarUrl: 'https://picsum.photos/id/10/100/100',
        planName: 'Standard',
      },
   ];

   // Simulate potential API delay
   // await new Promise(resolve => setTimeout(resolve, 80));

  return mockUsers;
}
