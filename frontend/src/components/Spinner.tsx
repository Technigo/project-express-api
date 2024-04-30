export const Spinner = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-green-500 animate-spin absolute"></div>
    </div>
  );
};
