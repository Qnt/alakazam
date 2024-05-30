import { SignInButton, SignedOut } from "@clerk/nextjs";

export default function Hero() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-logo text-5xl uppercase text-transparent sm:text-7xl">
            Alakazam
          </h1>
          <p className="py-6 ">
            Flash card based application for effective memorization and
            repetition
          </p>
          <SignedOut>
            <SignInButton>
              <button className="btn btn-primary text-xl">Sign In</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
