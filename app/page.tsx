export default function Home() {
  return (
    <div>
      <h1 className="text-5xl text-center mt-5">
        Welcome to {process.env.NEXT_PUBLIC_COMPANY_NAME_INTRANET}
      </h1>
    </div>
  );
}
