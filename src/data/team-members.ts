import type { TeamMember } from './team-types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    certificates: [],
    companyUrl: 'https://www.veeva.com/',
    degrees: [
      'BSc in Software Engineering - ФИНКИ',
      'MSc in IT Management - ФИНКИ',
    ],
    image: '/zlatko.png',
    jobPosition: 'Senior Data Curator @ Veeva Systems',
    linkedin: 'https://www.linkedin.com/in/zlatko-stojanovski-2942a01bb/',
    name: 'Златко Стојановски',
    workingSince: new Date(2_023, 6),
  },
  {
    certificates: ['Spring Certified Professional'],
    companyUrl: 'https://www.netcetera.com/',
    degrees: [
      'BSc in Software Engineering - ФИНКИ',
      'MSc in Software Engineering - ФИНКИ',
    ],
    image: '/mladen.png',
    jobPosition: 'Software Engineer @ G+D Netcetera',
    linkedin: 'https://www.linkedin.com/in/mladen-jovanovski-006389224/',
    name: 'Младен Јовановски',
    workingSince: new Date(2_024, 3),
  },
  {
    certificates: [],
    companyUrl: 'https://codechem.com/',
    degrees: ['BSc in Computer Science - ФИНКИ', 'MSc in Data Science - ФИНКИ'],
    image: '/stefan.png',
    jobPosition: 'Software Engineer @ CodeChem',
    linkedin: 'https://www.linkedin.com/in/stefan-milev/',
    name: 'Стефан Милев',
    workingSince: new Date(2_022, 6),
  },
];
