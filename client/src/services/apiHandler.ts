// Helper function to handle API calls with error handling
export const apiHandler = async <T>(
  operation: () => Promise<T>
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
