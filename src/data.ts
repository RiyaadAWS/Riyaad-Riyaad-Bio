/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContactInfo, TechStack, Education, WorkExperience, Project, Reference } from './types';

export const contactInfo: ContactInfo = {
  email: 'riyaadryklief92@gmail.com',
  linkedin: 'https://www.linkedin.com/in/riyaadryklief/',
  github: 'https://github.com/RiyaadAWS/',
  phones: ['+27 76 644 1575', '+27 84 504 4065'],
};

export const techStack: TechStack = {
  frontend: [
    { name: 'React' },
    { name: 'JavaScript' },
    { name: 'HTML5' },
    { name: 'CSS3' },
  ],
  backend: [
    { name: 'Node.js' },
    { name: 'Java' },
  ],
  toolsCloud: [
    { name: 'AWS' },
    { name: 'Git' },
    { name: 'AI Studio' },
    { name: 'v0' },
  ],
};

export const educationList: Education[] = [
  {
    degree: 'AI Website Development',
    institution: 'Completed',
    year: '2026',
  },
  {
    degree: 'Diploma - Information Technology in Applications Development',
    institution: 'Cape Peninsula University (CPUT)',
    year: '2021',
  },
  {
    degree: 'Computer Science Higher Certificate (NQF5)',
    institution: 'Cape Peninsula University (CPUT)',
    year: '2016',
  },
  {
    degree: 'Web Development Fundamentals',
    institution: 'College of Cape Town',
    year: '2016',
  },
  {
    degree: 'Secondary Education Matriculation',
    institution: 'College of Cape Town',
    year: '2012',
  },
];

export const workExperience: WorkExperience[] = [
  {
    company: 'AMAZON WEB SERVICES',
    role: 'Technical Support Specialist',
    period: 'Feb 2017 - July 2025',
    description: "Built extensive expertise over 8 years at AWS in enterprise collaboration, business intelligence platforms, and telecom contact centers. Delivered high-level technical resolution across all tiers, coordinating with engineering and carriers.",
    subRoles: [
      {
        title: 'Amazon Chime',
        bullets: [
          "Resolve complex issues related to Chime's voice, video, and messaging capabilities",
          "Troubleshoot network connectivity and integration challenges",
          "Support enterprise-scale deployments and configurations",
          "Collaborate with engineering teams on platform improvements"
        ]
      },
      {
        title: 'QuickSight',
        bullets: [
          "Resolve complex issues related to data visualization, dashboard performance, and enterprise BI implementations",
          "Troubleshoot data connectivity and SPICE ingestion challenges",
          "Guide customers through advanced feature implementations"
        ]
      },
      {
        title: 'Connect (Telecom)',
        bullets: [
          "Resolve complex telecommunications issues across global contact center implementations",
          "Support phone number provisioning, porting, and management",
          "Interface with telecommunications carriers for issue resolution",
          "Monitor and maintain service level agreements (SLAs)"
        ]
      }
    ]
  }
];

export const keyProjects: Project[] = [
  {
    title: 'iDETAIL',
    description: 'A 3-tier Web Application that delivers streamlined details and records. Integrated with interactive user screens and cloud database synchronizations.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Firebase'],
    link: 'https://github.com/RiyaadAWS/iDETAIL',
  }
];

export const referencesList: Reference[] = [
  {
    name: 'Naeela Samaai',
    role: 'Amazon Web Services',
    phone: '081 564 3953'
  },
  {
    name: 'Tashreeq Jattiem',
    role: 'Amazon Web Services',
    phone: '073 044 9885'
  },
  {
    name: 'Jess Kleyn',
    role: 'Amazon Web Services',
    phone: '079 703 4157'
  },
  {
    name: 'Rayaan Allie',
    role: 'Amazon Web Services',
    phone: '079 632 6000'
  },
  {
    name: 'Toufeeq Ajouhaar',
    role: 'Amazon Web Services',
    phone: '064 084 9356'
  },
  {
    name: 'Zubair Van Oudtshoorn',
    role: 'Additional Reference',
    phone: '067 781 3455'
  }
];
