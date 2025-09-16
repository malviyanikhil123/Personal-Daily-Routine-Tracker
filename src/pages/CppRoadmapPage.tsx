import React, { useState } from 'react';
import { ProgressBar, RoadmapStep, RoadmapDetailModal } from '../components';
import { useApp } from '../hooks';
import { calculateRoadmapProgress } from '../utils';

const CppRoadmapPage: React.FC = () => {
  const { state, updateRoadmapStep } = useApp();
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progress = calculateRoadmapProgress(state.cppDsaRoadmap);

  const handleStatusUpdate = (stepId: number, status: 'not-started' | 'in-progress' | 'completed') => {
    updateRoadmapStep('cpp', stepId, status);
  };

  const handleShowDetails = (stepId: number) => {
    setSelectedStep(stepId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStep(null);
  };

  const selectedStepData = selectedStep 
    ? state.cppDsaRoadmap.find(s => s.id === selectedStep) || null
    : null;

  return (
    <section className="tab-content active">
      <div className="section-header">
        <h2>
          <i className="fas fa-code"></i>
          C++ & DSA Learning Roadmap
        </h2>
        <ProgressBar progress={progress} />
      </div>
      
      <div className="roadmap-container">
        {state.cppDsaRoadmap.map((step) => (
          <RoadmapStep
            key={step.id}
            step={step}
            roadmapType="cpp"
            onStatusUpdate={handleStatusUpdate}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>

      <RoadmapDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        step={selectedStepData}
        roadmapType="cpp"
      />
    </section>
  );
};

export default CppRoadmapPage;