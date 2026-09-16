import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Circle, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';

export const PracticeQuestions: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock Question
  const question = {
    id: 12,
    topic: 'Normalization',
    difficulty: 'Medium',
    text: 'Consider the relation R(A, B, C, D, E) with the set of functional dependencies F = {A -> B, BC -> E, ED -> A}. Which of the following is TRUE regarding the highest normal form of R?',
    options: [
      { id: 'A', text: 'Relation R is in BCNF because all LHS of functional dependencies are superkeys.' },
      { id: 'B', text: 'Relation R is in 3NF but not BCNF because ED -> A has a prime attribute on RHS but ED is not a superkey.', correct: true },
      { id: 'C', text: 'Relation R is in 2NF but not 3NF because there is a transitive dependency.' },
      { id: 'D', text: 'Relation R is not even in 2NF because of partial dependencies.' }
    ],
    explanation: `Step-by-step analysis:
1. Find Candidate Keys:
   Closure of {C, D}: (CD)+ = CD
   Closure of {A, C, D}: (ACD)+ = ACDBE (Valid Key)
   Closure of {B, C, D}: (BCD)+ = BCDE -> BCDEA (Valid Key)
   Closure of {E, C, D}: (ECD)+ = ECDA -> ECDAB (Valid Key)
   So, candidate keys are {ACD}, {BCD}, and {ECD}.

2. Prime Attributes: A, B, C, D, E (All are prime attributes)

3. Check Normal Forms:
   - Since all attributes are prime, there can be no partial dependency (violating 2NF) or transitive dependency to a non-prime attribute (violating 3NF). Thus, it is automatically in 3NF.
   - Check BCNF: In A -> B, A is not a superkey. Therefore, it is NOT in BCNF.
   
Conclusion: The relation is in 3NF but not BCNF.`
  };

  const handleOptionSelect = (id: string) => {
    if (!showExplanation) {
      setSelectedOption(id);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setShowExplanation(true);
    }
  };

  return (
    <div className="flex flex-col pb-20 pt-8 flex-1">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to={`/subject/${subjectId}`} className="hover:text-foreground">DBMS Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Practice Questions</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-display-sm font-bold tracking-tight text-primary mb-2">Practice Questions</h1>
          <p className="text-body-lg text-muted-foreground">Test your knowledge with chapter-wise MCQs and automatically tracked performance.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-border rounded-xl shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="p-4 border-b border-border bg-surface-container-low flex justify-between items-center text-sm font-bold">
              <span className="text-primary flex items-center">
                <span className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center mr-2 text-xs">Q{question.id}</span>
                Topic: {question.topic}
              </span>
              <span className="px-2 py-1 bg-surface-container rounded text-outline-variant uppercase tracking-wider text-[10px]">
                {question.difficulty}
              </span>
            </div>
            
            {/* Question Text */}
            <div className="p-6 md:p-8">
              <p className="text-lg text-foreground font-medium leading-relaxed mb-8">
                {question.text}
              </p>
              
              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`p-4 border rounded-lg flex items-start gap-4 cursor-pointer transition-colors ${
                      showExplanation
                        ? opt.correct
                          ? 'bg-surface-container-low border-primary' // Correct option
                          : selectedOption === opt.id
                            ? 'bg-error/10 border-error' // Selected wrong option
                            : 'bg-surface-container-lowest border-border opacity-50' // Unselected wrong option
                        : selectedOption === opt.id
                          ? 'bg-surface-container border-primary' // Selected state (pre-submit)
                          : 'bg-surface-container-lowest border-border hover:border-primary/50' // Normal state
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {showExplanation ? (
                        opt.correct ? <CheckCircle2 className="w-5 h-5 text-primary" /> : selectedOption === opt.id ? <AlertCircle className="w-5 h-5 text-error" /> : <Circle className="w-5 h-5 text-outline-variant" />
                      ) : (
                        selectedOption === opt.id ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5 text-outline-variant" />
                      )}
                    </div>
                    <span className={`text-sm ${showExplanation && opt.correct ? 'font-bold text-primary' : 'font-medium text-foreground'}`}>
                      {opt.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex justify-between items-center border-t border-border pt-6">
                <button className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" /> Report Issue
                </button>
                <div className="flex gap-4">
                  {!showExplanation ? (
                    <button 
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className={`px-6 py-2 rounded text-sm font-bold transition-colors ${
                        selectedOption ? 'bg-primary text-primary-foreground hover:bg-accent' : 'bg-surface-container text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded text-sm font-bold flex items-center hover:bg-accent transition-colors">
                      Next Question <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Explanation Section */}
            {showExplanation && (
              <div className="bg-surface-container-low border-t border-border p-6 md:p-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Detailed Explanation:</h4>
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                  {question.explanation}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Analytics */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          
          <div className="bg-surface-container-lowest border border-border rounded-xl p-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" /> Session Analytics
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center mb-6">
              <div className="bg-surface-container-low p-2 rounded">
                <div className="text-lg font-bold text-primary">24</div>
                <div className="text-[10px] text-muted-foreground uppercase">Answered</div>
              </div>
              <div className="bg-surface-container-low p-2 rounded">
                <div className="text-lg font-bold text-primary">18</div>
                <div className="text-[10px] text-muted-foreground uppercase">Correct</div>
              </div>
              <div className="bg-surface-container-low p-2 rounded">
                <div className="text-lg font-bold text-primary">75%</div>
                <div className="text-[10px] text-muted-foreground uppercase">Accuracy</div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-border rounded-xl p-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-outline-variant mb-4">
              Activity Heatmap
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Your practice consistency over the last 30 days.</p>
            
            {/* Mock GitHub-style Heatmap */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(28)].map((_, i) => {
                const activityLevel = Math.floor(Math.random() * 4); // 0-3
                return (
                  <div 
                    key={i} 
                    className={`w-full aspect-square rounded-sm ${
                      activityLevel === 0 ? 'bg-surface-container' :
                      activityLevel === 1 ? 'bg-primary/30' :
                      activityLevel === 2 ? 'bg-primary/60' :
                      'bg-primary'
                    }`}
                    title={`${Math.floor(Math.random() * 20)} questions solved`}
                  ></div>
                )
              })}
            </div>
            <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-surface-container rounded-sm"></div>
                <div className="w-2 h-2 bg-primary/30 rounded-sm"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-sm"></div>
                <div className="w-2 h-2 bg-primary rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          <button className="w-full py-3 border border-border bg-surface-container-lowest rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-surface-container-low transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" /> Reset Topic Progress
          </button>
        </div>
      </div>
    </div>
  );
};
