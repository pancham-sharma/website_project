import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, BookOpen, Monitor, Clock, GraduationCap, ChevronRight } from 'lucide-react';

export const DistancePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <Wifi className="w-8 h-8 text-primary-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">Distance Learning</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Access your B.Tech coursework and study materials from anywhere — EduCare's distance learning portal bridges the gap between campus and remote study.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { icon: BookOpen, title: 'Online Notes', desc: 'Access chapter-wise study notes for all subjects from any device, anytime.' },
          { icon: Monitor, title: 'Live Sessions', desc: 'Join instructor-led live sessions and record them to review at your own pace.' },
          { icon: Clock, title: 'Self-Paced Learning', desc: 'Set your own schedule. Progress through materials at a pace that works for you.' },
          { icon: GraduationCap, title: 'Certification Ready', desc: 'Prepare for university exams and technical certifications through structured paths.' },
          { icon: Wifi, title: 'Offline Access', desc: "Download materials and study even when you're offline or have limited connectivity." },
          { icon: BookOpen, title: 'PYQ Practice', desc: 'Solve previous year question papers with solutions while learning remotely.' },
        ].map((feature, i) => (
          <div key={i} className="bg-surface-container-lowest border border-border rounded-xl p-6">
            <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-base mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
        <h2 className="font-bold text-lg text-primary mb-2">Full Distance Portal Coming Soon</h2>
        <p className="text-sm text-muted-foreground mb-5">
          We're building the complete distance learning experience. In the meantime, explore all the study materials available for your subject.
        </p>
        <Link
          to="/courses"
          className="inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
        >
          Browse Subjects <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
