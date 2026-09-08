import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { InkUnderline } from "../ui/InkUnderline";
import { Magnetic } from "../ui/Magnetic";
import { TextLink } from "../ui/Button";
import { SITE } from "../../data/site";

const COPY_FEEDBACK_DURATION_MS = 2200;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myeydode";

type CopyState = "idle" | "copied";
type SubmitState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const resetTimeoutRef = useRef<number | undefined>(undefined);

  // Guards against setting state after unmount if someone navigates
  // away in the ~2s window before the "copied" toast would reset.
  useEffect(() => () => window.clearTimeout(resetTimeoutRef.current), []);

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(SITE.email);
      setCopyState("copied");
      resetTimeoutRef.current = window.setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_DURATION_MS);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section id="contact" className="border-t border-[#121826]/10 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-1 text-sm text-[#FF8A5B]">Contact</p>
          <InkUnderline />
          <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] text-[#121826]">
            Have a product, website or interface worth building?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-[#2A2F45]">Let&apos;s create something useful.</p>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic strength={10}>
            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor="hover"
              className="group inline-flex min-h-[44px] max-w-full items-center gap-2.5 rounded-full bg-[#121826] px-5 py-3.5 text-[15px] font-medium text-[#FFF3E9] transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B] sm:px-6"
            >
              <Mail size={16} />
              {SITE.email}
            </button>
          </Magnetic>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-[#2A2F45] underline decoration-[#121826]/20 underline-offset-4 hover:text-[#121826]"
          >
            or open in mail app
          </a>
        </Reveal>

        <AnimatePresence>
          {copyState === "copied" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              role="status"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#121826]/5 px-4 py-2 text-sm text-[#121826]"
            >
              <Check size={14} /> Email copied
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal className="mt-12 max-w-2xl">
          <form onSubmit={handleSubmit} className="grid gap-5" aria-describedby="contact-status">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#121826]">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="min-h-12 rounded-2xl border border-[#121826]/15 bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-[#2A2F45]/50 focus:border-[#FF8A5B]"
                  placeholder="Your name"
                />
              </label>

              <label className="grid gap-2 text-sm text-[#121826]">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="min-h-12 rounded-2xl border border-[#121826]/15 bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-[#2A2F45]/50 focus:border-[#FF8A5B]"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-[#121826]">
              Message
              <textarea
                required
                name="message"
                rows={5}
                className="resize-y rounded-2xl border border-[#121826]/15 bg-transparent px-4 py-3 outline-none transition-colors placeholder:text-[#2A2F45]/50 focus:border-[#FF8A5B]"
                placeholder="Tell me a little about your project..."
              />
            </label>

            <input type="hidden" name="_subject" value="New portfolio enquiry" />
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>Leave this field empty<input tabIndex={-1} autoComplete="off" name="_gotcha" /></label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={8}>
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  data-cursor="hover"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#121826] px-6 py-3.5 text-[15px] font-medium text-[#FFF3E9] transition-transform duration-300 ease-out hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A5B]"
                >
                  {submitState === "submitting" && <Loader2 size={16} className="animate-spin" />}
                  {submitState === "submitting" ? "Sending…" : "Send message"}
                </button>
              </Magnetic>

              <p
                id="contact-status"
                role="status"
                aria-live="polite"
                className={submitState === "error" ? "text-sm text-[#A43D2A]" : "text-sm text-[#2A2F45]"}
              >
                {submitState === "success" && "Thanks — your message has been sent."}
                {submitState === "error" && "Something went wrong. Please try again or email me directly."}
              </p>
            </div>
          </form>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#121826]/10 pt-10 sm:grid-cols-3">
          <div>
            <p className="text-sm text-[#FF8A5B]">LinkedIn</p>
            <p className="mt-2">
              <TextLink href={SITE.linkedinUrl}>{SITE.linkedinLabel}</TextLink>
            </p>
          </div>
          <div>
            <p className="text-sm text-[#FF8A5B]">GitHub</p>
            <p className="mt-2">
              <TextLink href={SITE.githubUrl}>{SITE.githubLabel}</TextLink>
            </p>
          </div>
          <div>
            <p className="text-sm text-[#FF8A5B]">Location</p>
            <p className="mt-2 text-[#121826]">{SITE.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
