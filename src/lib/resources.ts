// Export a function named 'isDomainAvailable' that takes a domain string as input and returns a Promise of a boolean value.
export const isDomainAvailable = async (_domain: string): Promise<boolean> => {
    // Return a new Promise that resolves after a delay.
    return new Promise((resolve) => {
        // Set a timeout to simulate an API call delay of 500 milliseconds (0.5 seconds).
        setTimeout(() => {
            // Resolve the Promise with a random boolean value (true or false).
            resolve(Math.random() > 0.5); // Randomly return true or false
        }, 500);
    });
};