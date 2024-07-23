import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "./_components/footer";

export default function Page() {
  return (
    <>
      <div className="mx-auto flex flex-col items-center p-4">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text py-6 font-logo text-4xl uppercase tracking-tight text-transparent md:text-7xl">
              Alakazam
            </h1>
            <h2 className="max-w-xl text-balance text-center text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Learn anything, anywhere with a power of{" "}
              <mark className="px-1">Leitner System.</mark>
            </h2>
            <div className="py-10">
              <SignedOut>
                <SignInButton>
                  <button className="btn btn-primary text-xl">Sign In</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <button className="btn btn-primary">Open Dashboard</button>
                </Link>
              </SignedIn>
            </div>
          </div>

          <div className="card mx-auto max-w-xl border-2 border-base-content/10 bg-base-200 shadow-md">
            <div className="card-body lg:gap-8">
              <h2 className="card-title md:text-2xl">
                What is the Leitner system?
              </h2>
              <p className="pb-4 leading-normal tracking-normal md:text-xl">
                The Leitner system, introduced by German science journalist
                Sebastian Leitner in 1972, is a popular and effective method for
                utilizing flashcards. This technique is based on the principle
                of spaced repetition, ensuring that cards are reviewed at
                progressively longer intervals, optimizing learning and
                retention.
              </p>
            </div>
          </div>
        </div>
        <h2 className="py-10 text-center text-2xl font-semibold tracking-tight">
          Here&apos;s how <mark className="px-1">Alakazam</mark> works
        </h2>
        <ol className="flex list-inside list-decimal flex-col gap-4 text-pretty text-xl">
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Sign in via Google or Github.
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Add cards to your collection.
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Start a new session.
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Answer the question and click on the card to check your answer.
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Mark the question as answered correctly or incorrectly.
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Repeat the process until you&apos;ve answered all the cards.
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            ????
          </li>
          <li className="rounded-xl border-2 border-base-content/10 bg-base-200 p-4 shadow-md">
            Profit!
          </li>
        </ol>
      </div>
      <Footer />
    </>
  );
}
