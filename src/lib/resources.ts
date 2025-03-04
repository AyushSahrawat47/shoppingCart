// src/lib/resources.ts
export const isDomainAvailable = async (_domain: string): Promise<boolean> => {
    // Mock API call: Randomly return true or false
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.5); // Randomly return true or false
      }, 500);
    });
  };