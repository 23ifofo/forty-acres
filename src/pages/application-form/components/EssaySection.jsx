import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EssaySection = ({ formData, errors, handleInputChange }) => {
  const [essay1WordCount, setEssay1WordCount] = useState(0);
  const [essay2WordCount, setEssay2WordCount] = useState(0);

  const MAX_WORDS = 100;

  const countWords = (text) => {
    if (!text) return 0;
    return text?.trim()?.split(/\s+/)?.filter(word => word?.length > 0)?.length;
  };

  useEffect(() => {
    setEssay1WordCount(countWords(formData?.essay1));
  }, [formData?.essay1]);

  useEffect(() => {
    setEssay2WordCount(countWords(formData?.essay2));
  }, [formData?.essay2]);

  const getWordCountColor = (count) => {
    if (count === 0) return 'text-muted-foreground';
    if (count > MAX_WORDS) return 'text-error';
    return 'text-success';
  };

  const getWordCountStatus = (count) => {
    if (count === 0) return 'No words yet';
    if (count > MAX_WORDS) return `${count - MAX_WORDS} words over limit`;
    return `${MAX_WORDS - count} words remaining`;
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Essay Questions
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          Please respond thoughtfully to the following essay prompts. Each essay should be under {MAX_WORDS} words.
        </p>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-medium text-foreground mb-2">
              Writing Tips
            </p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Be authentic and share your personal story</li>
              <li>Use specific examples and details</li>
              <li>Proofread carefully for grammar and spelling</li>
              <li>Stay under the word count limit</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <div className="mb-4 md:mb-6">
          <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
            Essay 1: Academic Goals & Aspirations
          </h4>
          <p className="text-sm md:text-base text-muted-foreground">
            Describe your academic and career goals. How will this scholarship help you achieve them? What impact do you hope to make in your field of study?
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <textarea
              name="essay1"
              value={formData?.essay1}
              onChange={handleInputChange}
              placeholder="Begin writing your response here..."
              className="w-full min-h-[300px] md:min-h-[400px] p-4 md:p-6 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y text-sm md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div className="flex items-center justify-between bg-muted rounded-lg p-3 md:p-4">
            <div className="flex items-center gap-2">
              <Icon 
                name={essay1WordCount > 0 && essay1WordCount <= MAX_WORDS ? 'CheckCircle' : 'AlertCircle'} 
                size={18} 
                color={essay1WordCount > 0 && essay1WordCount <= MAX_WORDS ? 'var(--color-success)' : (essay1WordCount > MAX_WORDS ? 'var(--color-error)' : 'var(--color-warning)')} 
              />
              <span className={`text-sm md:text-base font-medium ${getWordCountColor(essay1WordCount)}`}>
                {essay1WordCount} words
              </span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              {getWordCountStatus(essay1WordCount)}
            </span>
          </div>

          {errors?.essay1 && (
            <p className="text-sm text-error flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {errors?.essay1}
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-border pt-6 md:pt-8">
        <div className="mb-4 md:mb-6">
          <h4 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
            Essay 2: Community Impact & Leadership
          </h4>
          <p className="text-sm md:text-base text-muted-foreground">
            Discuss a time when you demonstrated leadership or made a positive impact in your community. What did you learn from this experience, and how has it shaped your values?
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <textarea
              name="essay2"
              value={formData?.essay2}
              onChange={handleInputChange}
              placeholder="Begin writing your response here..."
              className="w-full min-h-[300px] md:min-h-[400px] p-4 md:p-6 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y text-sm md:text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div className="flex items-center justify-between bg-muted rounded-lg p-3 md:p-4">
            <div className="flex items-center gap-2">
              <Icon 
                name={essay2WordCount > 0 && essay2WordCount <= MAX_WORDS ? 'CheckCircle' : 'AlertCircle'} 
                size={18} 
                color={essay2WordCount > 0 && essay2WordCount <= MAX_WORDS ? 'var(--color-success)' : (essay2WordCount > MAX_WORDS ? 'var(--color-error)' : 'var(--color-warning)')} 
              />
              <span className={`text-sm md:text-base font-medium ${getWordCountColor(essay2WordCount)}`}>
                {essay2WordCount} words
              </span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              {getWordCountStatus(essay2WordCount)}
            </span>
          </div>

          {errors?.essay2 && (
            <p className="text-sm text-error flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {errors?.essay2}
            </p>
          )}
        </div>
      </div>
      <div className="bg-accent/10 border border-accent rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Star" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
          <div>
              <p className="text-sm md:text-base font-medium text-foreground mb-1">
              Essay Review Checklist
            </p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
              <li>✓ Both essays are under {MAX_WORDS} words</li>
              <li>✓ Essays directly address the prompts</li>
              <li>✓ Writing is clear and well-organized</li>
              <li>✓ Grammar and spelling have been checked</li>
              <li>✓ Personal examples are included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssaySection;