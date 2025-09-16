import React, { useState, useEffect } from 'react';
import { Modal } from './';
import { useApp } from '../hooks';
import { initializeSkillsChecked, getSkillProgress } from '../utils/helpers';
import type { RoadmapStep } from '../types';

interface RoadmapDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: RoadmapStep | null;
  roadmapType: 'devops' | 'cpp';
}

const RoadmapDetailModal: React.FC<RoadmapDetailModalProps> = ({
  isOpen,
  onClose,
  step,
  roadmapType
}) => {
  const { updateSkillChecked, updateRoadmapStep, showToast } = useApp();
  const [localStep, setLocalStep] = useState<RoadmapStep | null>(null);

  useEffect(() => {
    if (step) {
      const initializedStep = initializeSkillsChecked(step);
      setLocalStep(initializedStep);
    }
  }, [step]);

  if (!localStep) return null;

  const progress = getSkillProgress(localStep);

  const handleSkillCheck = (skill: string, checked: boolean) => {
    updateSkillChecked(roadmapType, localStep.id, skill, checked);
    
    setLocalStep(prev => {
      if (!prev) return null;
      return {
        ...prev,
        skillsChecked: {
          ...prev.skillsChecked,
          [skill]: checked
        }
      };
    });

    // Auto-complete step when all skills are checked
    const newSkillsChecked = {
      ...localStep.skillsChecked,
      [skill]: checked
    };
    
    const completedSkills = Object.values(newSkillsChecked).filter(c => c).length;
    const totalSkills = Object.keys(localStep.details).length;
    
    if (completedSkills === totalSkills && localStep.status !== 'completed') {
      updateRoadmapStep(roadmapType, localStep.id, 'completed');
      showToast('🎉 Step automatically completed! Excellent work!', 'success');
    } else if (completedSkills > 0 && localStep.status === 'not-started') {
      updateRoadmapStep(roadmapType, localStep.id, 'in-progress');
      showToast('📚 Step started! Keep learning!', 'success');
    }
  };

  const handleSave = () => {
    const completedSkills = Object.values(localStep.skillsChecked || {}).filter(checked => checked).length;
    const totalSkills = Object.keys(localStep.details).length;
    
    if (completedSkills === totalSkills && localStep.status !== 'completed') {
      updateRoadmapStep(roadmapType, localStep.id, 'completed');
      showToast('🎉 Step completed! Excellent work!', 'success');
    } else if (completedSkills > 0 && localStep.status === 'not-started') {
      updateRoadmapStep(roadmapType, localStep.id, 'in-progress');
      showToast('📚 Step started! Keep learning!', 'success');
    } else if (localStep.status !== 'completed') {
      showToast('💾 Progress saved!', 'success');
    }
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={localStep.title}
    >
      <div className="step-details">
        <p><strong>Description:</strong> {localStep.description}</p>
        <p>
          <strong>Current Status:</strong> 
          <span className={`status-badge ${localStep.status}`}>
            {localStep.status.replace('-', ' ')}
          </span>
        </p>
        <h4>Skills to Learn:</h4>
        <div className="skills-checklist">
          {Object.entries(localStep.details).map(([skill, description]) => (
            <div key={skill} className="skill-item">
              <label className="skill-checkbox-label">
                <input
                  type="checkbox"
                  className="skill-checkbox"
                  checked={localStep.skillsChecked?.[skill] || false}
                  onChange={(e) => handleSkillCheck(skill, e.target.checked)}
                />
                <span className="skill-title">{skill}</span>
              </label>
              <p className="skill-description">{description}</p>
            </div>
          ))}
        </div>
        <div className="progress-summary">
          <span>
            {progress.completed} of {progress.total} skills completed ({progress.percentage}%)
          </span>
        </div>
        <div className="modal-actions" style={{ marginTop: '20px' }}>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className={`btn-primary ${progress.completed === progress.total ? 'completed' : ''}`}
            onClick={handleSave}
            disabled={localStep.status === 'completed'}
          >
            {progress.completed === progress.total && localStep.status !== 'completed'
              ? 'Mark as Complete'
              : localStep.status === 'completed'
              ? 'Completed ✓'
              : 'Save Progress'
            }
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RoadmapDetailModal;