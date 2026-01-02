"use client";

import { Hero } from "@/components/landing/Hero";
import { Timeline } from "@/components/landing/Timeline";
import Themes from "@/components/landing/Themes";
import Brief from "@/components/landing/FAQ";
import SponsorsSection from "@/components/landing/Sponsors";
import PrizePool from "@/components/landing/PrizePool";
import Submissions from "@/components/landing/Submissions";
import { SectionDecorations } from "@/components/ui/section-decorations";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";

interface TeamSubmission {
  _id: string;
  team_name: string;
  idea_title: string;
  idea_document_url: string;
  submission_document_url: Array<Record<string, string>>;
  participants: Array<{
    name: string;
    github_profile?: string;
    linkedin_profile?: string;
    college_or_company_name?: string;
  }>;
  submission?: {
    submission_document_url: Array<Record<string, string>>;
    createdAt: string;
    abstract?: string;
    status?: string;
  };
}

export default function Home() {
  const [submissions, setSubmissions] = useState<TeamSubmission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/finalists/finalists.json');
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data.submissions || []);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="font-inter pt-20 relative z-10">
      <section id="home" className="min-h-screen relative">
        <SectionDecorations variant="hero" />
        <Hero />
      </section>
      <section id="submissions" className="min-h-screen relative">
        <SectionDecorations variant="submissions" />
        <Submissions submissions={submissions} />
      </section>
      <section id="themes" className="min-h-screen relative">
        <SectionDecorations variant="themes" />
        <Themes/>
      </section>
      <section id="timeline" className="min-h-screen relative">
        <SectionDecorations variant="timeline" />
        <Timeline/>
      </section>
      <section id="prizes" className="min-h-screen relative">
        <SectionDecorations variant="prizes" />
        <PrizePool />
      </section>
      <section id="sponsors" className="relative">
        <SectionDecorations variant="faq" />
        <SponsorsSection />
      </section>
      <section id="faq" className="min-h-screen relative">
        <SectionDecorations variant="faq" />
        <Brief/>
      </section>
      <Footer />
    </div>
  );
}
