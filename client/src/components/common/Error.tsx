interface ErrorProps {
  message?: string;
}

const Error = ({ message = 'An error occurred' }: ErrorProps) => {
  return (
    <div className="p-4 text-center text-red-500">
      <p>{message}</p>
    </div>
  );
};

export default Error;
