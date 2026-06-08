/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  phones: string[];
}

export interface TechItem {
  name: string;
  icon?: string;
  level?: string;
}

export interface TechStack {
  frontend: TechItem[];
  backend: TechItem[];
  toolsCloud: TechItem[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface ExperienceSubRole {
  title: string;
  bullets: string[];
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  subRoles: ExperienceSubRole[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  liveLink?: string;
}

export interface Reference {
  name: string;
  role: string;
  phone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
