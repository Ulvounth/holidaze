import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-lg mb-6">
        You need to be a venue manager to access this page.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
}
