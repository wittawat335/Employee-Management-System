import RedirectToLogin from "@/components/RedirectToLogin";

export default function Error404() {
  return (
    <div className="mx-auto flex h-full min-h-screen w-full flex-col">
      <header className="mb-auto w-full" aria-hidden></header>
      <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
        <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-8xl">
          404
        </h1>
        <div className="mt-6 text-lg text-gray-600 dark:text-gray-400 sm:mt-8">
          <p className="leading-8">Oops, something went wrong.</p>
          <p className="leading-8">Sorry, we couldn&rsquo;t find your page.</p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center">
          <RedirectToLogin />
        </div>
      </div>
      <footer className="mt-auto py-5 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © All Rights Reserved. {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
