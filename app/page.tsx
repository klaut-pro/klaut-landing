import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { PromiseBand } from "@/components/PromiseBand";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Tools } from "@/components/Tools";
import { Billing } from "@/components/Billing";
import { WishTool } from "@/components/WishTool";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { BlogTeasers } from "@/components/BlogTeasers";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PromiseBand />
        <Problem />
        <HowItWorks />
        <Tools />
        <Billing />
        <WishTool />
        <Faq />
        <BlogTeasers />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
