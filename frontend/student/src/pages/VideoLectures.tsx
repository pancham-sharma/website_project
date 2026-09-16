import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, PlaySquare, Clock, ThumbsUp, Share2, BookmarkPlus } from 'lucide-react';

export const VideoLectures: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videos = [
    { id: 1, title: 'Lecture 1: Introduction to DBMS Architecture', duration: '45:20', active: true, tag: 'Chapter 1' },
    { id: 2, title: 'Lecture 2: ER Model & Design Constraints', duration: '52:10', active: false, tag: 'Chapter 2' },
    { id: 3, title: 'Lecture 3: Relational Algebra Operators', duration: '38:15', active: false, tag: 'Chapter 3' },
    { id: 4, title: 'Lecture 4: Advanced SQL Queries (Joins & Subqueries)', duration: '1:12:00', active: false, tag: 'Chapter 4' },
    { id: 5, title: 'Lecture 5: Normal Forms (1NF to BCNF)', duration: '55:30', active: false, tag: 'Chapter 5' },
    { id: 6, title: 'Lecture 6: ACID Properties & Transactions', duration: '48:40', active: false, tag: 'Chapter 6' },
  ];

  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to={`/subject/${subjectId}`} className="hover:text-foreground">DBMS Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Video Lectures</span>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Main Player Area */}
        <div className="flex-1">
          {/* Video Player Placeholder / Wrapper */}
          <div className="w-full bg-black aspect-video rounded-xl overflow-hidden relative border border-border shadow-md mb-6">
            {!isVideoLoaded ? (
              <div 
                className="absolute inset-0 bg-surface-container flex flex-col items-center justify-center cursor-pointer group"
                onClick={() => setIsVideoLoaded(true)}
              >
                {/* Mock Thumbnail Image Background would go here */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlaySquare className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
                <span className="text-primary font-bold">Play Lecture 1: DBMS Architecture</span>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="animate-pulse">Loading YouTube Player...</span>
                {/* Real implementation would render iframe here */}
                {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" frameBorder="0" allowFullScreen></iframe> */}
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 border-b border-border pb-4">
              <div>
                <h1 className="text-2xl font-bold text-primary mb-2">Lecture 1: Introduction to DBMS Architecture</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 45:20 mins</span>
                  <span>•</span>
                  <span>Chapter 1: Overview</span>
                  <span>•</span>
                  <span>By Prof. Neso Academy</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="p-2 border border-border rounded bg-surface-container-lowest hover:bg-surface-container text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="flex items-center px-4 py-2 border border-border rounded bg-surface-container-lowest hover:bg-surface-container text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                  <BookmarkPlus className="w-4 h-4 mr-2" /> Save
                </button>
                <button className="flex items-center px-4 py-2 border border-border rounded bg-surface-container-lowest hover:bg-surface-container text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border p-5 rounded-xl text-sm">
              <p className="text-muted-foreground mb-4">
                In this introductory lecture, we cover the basics of Database Management Systems (DBMS). We discuss the difference between file systems and databases, the three-schema architecture, and the concept of data independence.
              </p>
              <h4 className="font-bold mb-2">Topics Covered:</h4>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>What is a Database?</li>
                <li>Drawbacks of File Systems</li>
                <li>DBMS Architecture (1-tier, 2-tier, 3-tier)</li>
                <li>Physical & Logical Data Independence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col h-[600px] border border-border bg-surface-container-lowest rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-primary">Course Lectures</h3>
            <p className="text-xs text-muted-foreground">6 Videos • 2h 45m total</p>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {videos.map((vid) => (
              <div 
                key={vid.id} 
                className={`flex gap-3 p-2.5 rounded-lg mb-1 cursor-pointer transition-colors ${vid.active ? 'bg-surface-container-low border border-primary/20' : 'hover:bg-surface-container-low'}`}
              >
                <div className="w-32 h-20 bg-surface-container rounded shrink-0 relative flex items-center justify-center group overflow-hidden">
                  <PlaySquare className={`w-6 h-6 ${vid.active ? 'text-primary' : 'text-outline-variant group-hover:text-primary'} transition-colors`} />
                  <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="flex flex-col justify-between py-0.5">
                  <h4 className={`text-sm font-bold leading-tight line-clamp-2 ${vid.active ? 'text-primary' : 'text-foreground'}`}>
                    {vid.title}
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-outline-variant tracking-wider">{vid.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
