export interface Resume {
  basics: {
    name: string;
    title: string;
    experience: string;
    summary: string;
  };
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }[];
}

export interface Message {
  type: "user" | "assistant" | "resume-card";
  content: string;
  resumeData?: Resume;
  timestamp: string;
}

export interface AppProps {
  saveData: (data: { messages: Message[] }) => Promise<void>;
  loadData: () => Promise<{ messages: Message[] } | null>;
}
