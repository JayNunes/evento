type ChildrenProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col max-w-7xl justify-s min-h-screen mx-auto bg-white/[2%]">
      {children}
    </div>
  );
}
