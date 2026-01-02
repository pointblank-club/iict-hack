"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Calendar, 
  FileText, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Globe,
  Loader2,
  AlertCircle,
  Mail,
  Building,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface Participant {
  name: string;
  email: string;
  age: number;
  phone: string;
  student_or_professional: string;
  college_or_company_name: string;
  linkedin_profile: string;
  github_profile: string;
  devfolio_profile: string;
  _id: string;
}

interface Team {
  _id: string;
  team_name: string;
  team_size: number;
  idea_title: string;
  participants: Participant[];
  status: 'registered' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Submission {
  _id: string;
  team_id: string;
  submission_document_url: Array<{[key: string]: string}>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DashboardData {
  status: boolean;
  message: string;
  team: Team;
  submission?: Submission;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditingSubmission, setIsEditingSubmission] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');
  const [submissionUrls, setSubmissionUrls] = useState({
    ppt: '',
    repo: '',
    video: ''
  });
  // Toggle this single variable to open/close submission manually
  const SUBMISSION_WINDOW_OPEN = false;
  const isSubmissionOpen = SUBMISSION_WINDOW_OPEN;
  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/teamDetails', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.status) {
        setDashboardData(data);
      } else {
        setError(data.message);
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // No auto-close; manual toggle via SUBMISSION_WINDOW_OPEN

  // Extract submission URLs from the submission object
  useEffect(() => {
    if (dashboardData?.submission?.submission_document_url) {
      const urls = { ppt: '', repo: '', video: '' };
      dashboardData.submission.submission_document_url.forEach((item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];
        if (key.toLowerCase().includes('ppt') || key.toLowerCase().includes('presentation')) {
          urls.ppt = value;
        } else if (key.toLowerCase().includes('repo')) {
          urls.repo = value;
        } else if (key.toLowerCase().includes('video')) {
          urls.video = value;
        }
      });
      setSubmissionUrls(urls);
    }
  }, [dashboardData]);

  const handleSubmissionSave = async () => {
    setSubmissionLoading(true);
    setSubmissionError('');
    setSubmissionSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Create the submission array in the required format
      const submissionArray = [];
      if (submissionUrls.ppt.trim()) {
        submissionArray.push({ "ppt": submissionUrls.ppt.trim() });
      }
      if (submissionUrls.repo.trim()) {
        submissionArray.push({ "repo": submissionUrls.repo.trim() });
      }
      if (submissionUrls.video.trim()) {
        submissionArray.push({ "video": submissionUrls.video.trim() });
      }

      if (submissionArray.length === 0) {
        setSubmissionError('Please provide at least one submission link');
        setSubmissionLoading(false);
        return;
      }

      const response = await fetch('/api/submission', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submission: submissionArray
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionSuccess('Submission saved successfully!');
        setIsEditingSubmission(false);
        // Refresh dashboard data to get updated submission
        await fetchDashboardData();
      } else {
        setSubmissionError(data.error || 'Failed to save submission');
      }
    } catch (err) {
      setSubmissionError('Failed to save submission');
      console.error('Submission save error:', err);
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleStartEditing = () => {
    setIsEditingSubmission(true);
    setSubmissionError('');
    setSubmissionSuccess('');
  };

  const handleCancelEditing = () => {
    setIsEditingSubmission(false);
    setSubmissionError('');
    setSubmissionSuccess('');
    // Reset URLs to original values
    if (dashboardData?.submission?.submission_document_url) {
      const urls = { ppt: '', repo: '', video: '' };
      dashboardData.submission.submission_document_url.forEach((item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];
        if (key.toLowerCase().includes('ppt') || key.toLowerCase().includes('presentation')) {
          urls.ppt = value;
        } else if (key.toLowerCase().includes('repo')) {
          urls.repo = value;
        } else if (key.toLowerCase().includes('video')) {
          urls.video = value;
        }
      });
      setSubmissionUrls(urls);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
      case 'registered':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    const iconSize = 18;
    switch (status) {
      case 'approved':
        return <CheckCircle size={iconSize} className="text-green-400" />;
      case 'rejected':
        return <XCircle size={iconSize} className="text-red-400" />;
      case 'registered':
        return <Clock size={iconSize} className="text-yellow-400" />;
      default:
        return <FileText size={iconSize} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 size={48} className="text-[#C540AB] animate-spin" />
          <p className="text-white">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">No data available</p>
      </div>
    );
  }

  const { team, submission } = dashboardData;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="bg-gray-900/50 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gradient-magenta">Team Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {team.team_name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Team Overview */}
          <motion.div
            className="lg:col-span-2 h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users size={24} className="text-[#C540AB]" />
                  <h2 className="text-xl font-semibold text-white">Team Information</h2>
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(team.status)}`}>
                  {getStatusIcon(team.status)}
                  <span className="font-medium capitalize">{team.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Team Name</Label>
                  <p className="text-white font-medium mt-1">{team.team_name}</p>
                </div>
                <div>
                  <Label className="text-gray-300">Team Size</Label>
                  <p className="text-white font-medium mt-1">{team.team_size} members</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-300">Idea Title</Label>
                  <p className="text-white font-medium mt-1">{team.idea_title}</p>
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Calendar size={14} />
                    Registration Date
                  </Label>
                  <p className="text-white font-medium mt-1">{formatDate(team.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Clock size={14} />
                    Last Updated
                  </Label>
                  <p className="text-white font-medium mt-1">{formatDate(team.updatedAt)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            className="lg:col-span-1 h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={20} className="text-[#C540AB]" />
                <h3 className="text-lg font-semibold text-white">Status Overview</h3>
              </div>
              <div className="space-y-4 h-full justify-between flex flex-col py-8 pb-12">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Registration
                  </span>
                  <span className="text-green-400 font-medium">Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center gap-2">
                    {getStatusIcon(team.status)}
                    Team Review
                  </span>
                  <span className={`${getStatusColor(team.status)} font-medium capitalize`}>
                    {team.status === 'registered' ? 'Pending' : team.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center gap-2">
                    {submission && submission.submission_document_url && submission.submission_document_url.length > 0 ? 
                      <CheckCircle size={16} className="text-green-400" /> : 
                      <Clock size={16} className="text-gray-400" />
                    }
                    Submission
                  </span>
                  <span className={`${submission && submission.submission_document_url && submission.submission_document_url.length > 0 ? 'text-green-400' : 'text-gray-400'} font-medium`}>
                    {submission && submission.submission_document_url && submission.submission_document_url.length > 0 ? 'Submitted' : 'Not Submitted'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Members */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-[#C540AB]" />
              <h3 className="text-xl font-semibold text-white">Team Members</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.participants.map((participant, index) => (
                <motion.div
                  key={participant._id}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-300 text-xs">Name</Label>
                      <p className="text-white font-medium">{participant.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs flex items-center gap-1">
                        <Mail size={12} />
                        Email
                      </Label>
                      <p className="text-white text-sm">{participant.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-300 text-xs">Age</Label>
                        <p className="text-white text-sm">{participant.age}</p>
                      </div>
                      <div>
                        <Label className="text-gray-300 text-xs">Type</Label>
                        <p className="text-white text-sm capitalize">{participant.student_or_professional}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs flex items-center gap-1">
                        <Building size={12} />
                        {participant.student_or_professional === 'student' ? 'College' : 'Company'}
                      </Label>
                      <p className="text-white text-sm">{participant.college_or_company_name}</p>
                    </div>
                    <div className="flex gap-3 pt-3">
                      {participant.linkedin_profile && (
                        <a
                          href={participant.linkedin_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#C540AB] hover:text-[#E055C3] text-sm transition-colors"
                        >
                          <Linkedin size={16} />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {participant.github_profile && (
                        <a
                          href={participant.github_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#C540AB] hover:text-[#E055C3] text-sm transition-colors"
                        >
                          <Github size={16} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {participant.devfolio_profile && (
                        <a
                          href={participant.devfolio_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#C540AB] hover:text-[#E055C3] text-sm transition-colors"
                        >
                          <Globe size={16} />
                          <span>Devfolio</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Submission Section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#C540AB]" />
                <h3 className="text-xl font-semibold text-white">Project Submission</h3>
              </div>
              {submission && !isEditingSubmission && isSubmissionOpen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStartEditing}
                  className="flex items-center gap-2"
                >
                  <Edit3 size={16} />
                  Edit
                </Button>
              )}
            </div>

            {/* Deadline Notice (shows only when open) */}
            {isSubmissionOpen && (
              <div className="mb-5 rounded-lg border px-4 py-3 bg-yellow-900/20 border-yellow-700/50">
                <p className="text-sm text-yellow-300">
                  Entries and edits close on <span className="font-semibold">13 September, 11:59 PM</span>.
                </p>
              </div>
            )}

            {/* Error and Success Messages */}
            {submissionError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
                <p className="text-red-400 text-sm">{submissionError}</p>
              </div>
            )}
            {submissionSuccess && (
              <div className="mb-4 p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
                <p className="text-green-400 text-sm">{submissionSuccess}</p>
              </div>
            )}

            {((!submission) && isSubmissionOpen) || (isEditingSubmission && isSubmissionOpen) ? (
              /* Submission Form */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label className="text-gray-300 flex items-center gap-2 mb-2">
                      <FileText size={14} />
                      PPT/Presentation Link
                    </Label>
                    <Input
                      type="url"
                      placeholder="Drive Link"
                      value={submissionUrls.ppt}
                      onChange={(e) => setSubmissionUrls(prev => ({ ...prev, ppt: e.target.value }))}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 flex items-center gap-2 mb-2">
                      <Github size={14} />
                      Repository Link
                    </Label>
                    <Input
                      type="url"
                      placeholder="Github Link"
                      value={submissionUrls.repo}
                      onChange={(e) => setSubmissionUrls(prev => ({ ...prev, repo: e.target.value }))}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 flex items-center gap-2 mb-2">
                      <Globe size={14} />
                      Video Link
                    </Label>
                    <Input
                      type="url"
                      placeholder="Youtube Unlisted video link"
                      value={submissionUrls.video}
                      onChange={(e) => setSubmissionUrls(prev => ({ ...prev, video: e.target.value }))}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSubmissionSave}
                    disabled={submissionLoading || !isSubmissionOpen}
                    className="flex items-center gap-2"
                  >
                    {submissionLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {submissionLoading ? 'Saving...' : 'Save Submission'}
                  </Button>
                  {isEditingSubmission && (
                    <Button
                      variant="outline"
                      onClick={handleCancelEditing}
                      disabled={submissionLoading}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Submission Display */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Calendar size={14} />
                    Submission Date
                  </Label>
                  <p className="text-white font-medium mt-1">{submission?.updatedAt ? formatDate(submission.updatedAt) : '-'}</p>
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <FileText size={14} />
                    PPT/Presentation
                  </Label>
                  {submissionUrls.ppt ? (
                    <a
                      href={submissionUrls.ppt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C540AB] hover:text-[#E055C3] font-medium mt-1 flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Presentation
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1">Not provided</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Github size={14} />
                    Repository Link
                  </Label>
                  {submissionUrls.repo ? (
                    <a
                      href={submissionUrls.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C540AB] hover:text-[#E055C3] font-medium mt-1 flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Repository
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1">Not provided</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Globe size={14} />
                    Video Link
                  </Label>
                  {submissionUrls.video ? (
                    <a
                      href={submissionUrls.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C540AB] hover:text-[#E055C3] font-medium mt-1 flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Watch Video
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1">Not provided</p>
                  )}
                </div>
                {!submission && !isSubmissionOpen && (
                  <div className="md:col-span-2">
                    <p className="text-red-300 text-sm">No submission was made before the deadline.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>  
      </div>
    </div>
  );
};

export default Dashboard;
