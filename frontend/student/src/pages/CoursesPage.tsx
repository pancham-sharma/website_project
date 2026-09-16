import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, GraduationCap, Monitor, Database, Microscope, FlaskConical, Briefcase, TrendingUp, Cpu, HelpCircle } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Degrees');

  const tabs = ['All Degrees', 'B.Tech', 'BCA', 'MCA', 'B.Sc', 'M.Sc', 'BBA', 'MBA', 'M.Tech'];

  const degrees = [
    {
      id: 'btech',
      abbr: 'B.Tech',
      title: 'Bachelor of Technology',
      desc: 'Comprehensive engineering degree encompassing computer science, mechanical, civil, electronics and electrical branches.',
      icon: GraduationCap,
      stats: { branches: 12, subjects: 450, students: '45K+' }
    },
    {
      id: 'bca',
      abbr: 'BCA',
      title: 'Bachelor of Computer Applications',
      desc: 'Undergraduate course in software development, web technologies, database management, and computer programming.',
      icon: Monitor,
      stats: { branches: 3, subjects: 120, students: '18K+' }
    },
    {
      id: 'mca',
      abbr: 'MCA',
      title: 'Master of Computer Applications',
      desc: 'Advanced software development, algorithms, system architecture, and modern computing frameworks and architectures.',
      icon: Database,
      stats: { branches: 2, subjects: 80, students: '12K+' }
    },
    {
      id: 'bsc',
      abbr: 'B.Sc',
      title: 'Bachelor of Science',
      desc: 'Core fundamental science covering Physics, Chemistry, Mathematics, IT, and foundational research methodologies.',
      icon: Microscope,
      stats: { branches: 8, subjects: 210, students: '22K+' }
    },
    {
      id: 'msc',
      abbr: 'M.Sc',
      title: 'Master of Science',
      desc: 'Specialized postgraduate scientific research, advanced mathematical modeling, and specialized computational science.',
      icon: FlaskConical,
      stats: { branches: 6, subjects: 140, students: '8K+' }
    },
    {
      id: 'bba',
      abbr: 'BBA',
      title: 'Bachelor of Business Administration',
      desc: 'Management fundamentals, accounting, corporate finance, marketing strategies, and organizational behavior.',
      icon: Briefcase,
      stats: { branches: 4, subjects: 110, students: '15K+' }
    },
    {
      id: 'mba',
      abbr: 'MBA',
      title: 'Master of Business Administration',
      desc: 'Advanced strategic management, operations, global economics, financial modeling, and leadership development.',
      icon: TrendingUp,
      stats: { branches: 5, subjects: 130, students: '10K+' }
    },
    {
      id: 'mtech',
      abbr: 'M.Tech',
      title: 'Master of Technology',
      desc: 'Postgraduate engineering specialization in AI, VLSI, Structural, Thermal, and advanced technical research domains.',
      icon: Cpu,
      stats: { branches: 8, subjects: 160, students: '5K+' }
    }
  ];

  const filteredDegrees = activeTab === 'All Degrees' ? degrees : degrees.filter(d => d.abbr === activeTab);

  return (
    <div className="flex flex-col pb-20 pt-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Explore Courses</h1>
        <p className="text-body-lg text-muted-foreground">Choose your degree to continue classes</p>
        
        <div className="mt-6 w-full max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            className="w-full p-3 pl-12 text-base border-2 border-border rounded-lg bg-surface-container-lowest focus:ring-2 focus:ring-surface-variant focus:border-primary outline-none transition-all shadow-sm"
            placeholder="Search courses, specializations or degrees..."
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border mb-8 hide-scrollbar">
        <div className="flex space-x-1 p-1 bg-surface-container-low rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-md transition-colors ${
                activeTab === tab 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-container'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {filteredDegrees.map((degree) => (
          <div key={degree.id} className="bg-surface-container-lowest border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all flex flex-col group h-full">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-surface-container flex items-center justify-center rounded-lg text-primary">
                  <degree.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2 py-1 bg-surface-container-low border border-border rounded text-muted-foreground">
                  {degree.abbr}
                </span>
              </div>
              <h2 className="text-title-md font-bold text-primary mb-2 line-clamp-1 group-hover:underline">{degree.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                {degree.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 mt-auto">
                <div>
                  <div className="text-[10px] uppercase font-bold text-outline-variant tracking-wider mb-1">Branches</div>
                  <div className="text-sm font-semibold text-primary">{degree.stats.branches} Specializations</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-outline-variant tracking-wider mb-1">Subjects</div>
                  <div className="text-sm font-semibold text-primary">{degree.stats.subjects}+ Total</div>
                </div>
              </div>
            </div>
            
            <Link to={`/branch/${degree.id}`} className="bg-surface-container-low hover:bg-surface-container border-t border-border p-4 flex justify-between items-center transition-colors rounded-b-xl text-sm font-medium text-primary">
              Explore Branches
              <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-surface-container-low border border-border rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold text-outline-variant tracking-wider uppercase mb-1">Not sure where to start?</div>
          <h3 className="text-title-lg font-bold text-primary mb-2">Can't find your syllabus or specific curriculum?</h3>
          <p className="text-sm text-muted-foreground max-w-2xl">
            We are constantly adding new university curriculums and subjects. Let us know what you need and our academic team will prioritize your university's content.
          </p>
        </div>
        <button className="whitespace-nowrap px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors flex items-center shadow-sm">
          <HelpCircle className="w-4 h-4 mr-2" /> Request Course Material
        </button>
      </div>

    </div>
  );
};
