import { NextResponse } from "next/server";
import { connectDB, TeamRegistration, Submission } from "@/lib/database";

interface Participant {
  name: string;
  github_profile?: string;
  linkedin_profile?: string;
  college_or_company_name?: string;
}

export async function GET() {
  try {
    await connectDB();

    // Fetch teams and submissions separately
    const teams = await TeamRegistration.find({}).sort({ createdAt: -1 });
    const submissions = await Submission.find({});

    // Match submissions with teams using team_id and filter out teams without submissions
    const teamsWithSubmissions = teams
      .map(team => {
        const teamSubmission = submissions.find(submission => 
          submission.team_id.toString() === team._id.toString()
        );

        return {
          _id: team._id,
          team_name: team.team_name,
          idea_title: team.idea_title,
          idea_document_url: team.idea_document_url,
          participants: team.participants.map((participant: Participant) => ({
            name: participant.name,
            github_profile: participant.github_profile,
            linkedin_profile: participant.linkedin_profile,
            college_or_company_name: participant.college_or_company_name,
          })),
          submission: teamSubmission ? {
            submission_document_url: teamSubmission.submission_document_url,
            createdAt: teamSubmission.createdAt,
            abstract: teamSubmission.abstract,
            status: teamSubmission.status
          } : null
        };
      })
      .filter(team => team.submission !== null);

    return NextResponse.json({ submissions: teamsWithSubmissions }, { status: 200 });

  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

