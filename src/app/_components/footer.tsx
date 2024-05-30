import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center mt-auto bg-base-200 p-4 text-base-content">
      <aside>
        <p>
          Made with love by{" "}
          <Link
            className="link link-primary visited:link-secondary"
            href="https://github.com/qnt/"
          >
            Qnt
          </Link>
        </p>
      </aside>
    </footer>
  );
}
