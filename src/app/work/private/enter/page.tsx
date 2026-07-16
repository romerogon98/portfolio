import { unlockPrivateWork } from "./actions";
import { OriginButton } from "@/components/ui/OriginButton";

export const metadata = {
  title: "Private work | Gonzalo Romero",
  robots: { index: false, follow: false },
};

export default async function EnterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <span className="text-sm uppercase tracking-widest text-white/40">
        (Private work)
      </span>
      <h1 className="mt-4 max-w-md text-[clamp(1.75rem,4vw,2.5rem)] font-normal tracking-[-0.03em]">
        This work is under{" "}
        <em className="font-serif italic text-accent-500">NDA</em>.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-white/50">
        Enter the password to view these confidential case studies.
      </p>

      <form
        action={unlockPrivateWork}
        className="mt-10 flex w-full max-w-xs flex-col gap-4"
      >
        <input type="hidden" name="from" value={from ?? "/work/private"} />
        <input
          type="password"
          name="password"
          autoFocus
          required
          placeholder="Password"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-base text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
        />
        {error && (
          <p className="text-sm text-accent-500">Wrong password — try again.</p>
        )}
        <OriginButton type="submit" className="w-full">
          Unlock
        </OriginButton>
      </form>
    </div>
  );
}
