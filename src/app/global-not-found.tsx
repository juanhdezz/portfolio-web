import type { Metadata } from "next";
import Link from "next/link";
import { bricolage, instrument } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Juan Hernández Sánchez-Agesta",
  description: "Esta página no existe. This page does not exist.",
  robots: { index: false },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${bricolage.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <main className="container-x flex min-h-svh flex-col justify-center py-20">
          <p className="display-name text-signal">404</p>
          <h1 className="section-title mt-6">Aquí no hay datos que observar.</h1>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            La página que buscas no existe o ha cambiado de dirección. <span lang="en">This page does not exist.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Volver al inicio
            </Link>
            <Link href="/en" className="btn btn-ghost" lang="en">
              Go to the English site
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
