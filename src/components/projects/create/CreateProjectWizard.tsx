"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// 引入各步驟組件
import { Step1ProjectType } from "./steps/Step1ProjectType";
import { Step2UsageScenario } from "./steps/Step2UsageScenario";
import { Step3Goals } from "./steps/Step3Goals";
import { Step4Features } from "./steps/Step4Features";
import { Step5Outputs } from "./steps/Step5Outputs";
import { Step6Reference } from "./steps/Step6Reference";
import { Step7Integrations } from "./steps/Step7Integrations";
import { Step8BudgetSchedule } from "./steps/Step8BudgetSchedule";
import { Step9Deliverables } from "./steps/Step9Deliverables";
import { Step10Additional } from "./steps/Step10Additional";

interface FormData {
  // Step 1
  projectType: string;
  projectTypeOther?: string;
  
  // Step 2
  usageScenario: string;
  
  // Step 3
  goals: string;
  
  // Step 4
  features: string[];
  
  // Step 5
  outputs: string[];
  outputsOther?: string;
  
  // Step 6
  referenceLinks: string[];
  designStyle: string[];
  screenshots?: File[];
  
  // Step 7
  integrations: string[];
  integrationsOther?: string;
  
  // Step 8
  budgetMin: number;
  budgetMax: number;
  budgetEstimateOnly: boolean;
  startDate?: Date;
  deadline?: Date;
  deadlineFlexible: boolean;
  paymentMethod: string;
  paymentSchedule?: string;
  
  // Step 9
  deliverables: string[];
  communicationPreference: string[];
  
  // Step 10
  specialRequirements?: string;
  concerns: string[];
}

const TOTAL_STEPS = 10;

export const CreateProjectWizard: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({
    features: [],
    outputs: [],
    referenceLinks: [],
    designStyle: [],
    integrations: [],
    budgetMin: 40000,
    budgetMax: 80000,
    budgetEstimateOnly: false,
    deadlineFlexible: true,
    paymentMethod: "installment",
    deliverables: [],
    communicationPreference: [],
    concerns: [],
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `${formData.projectType}專案`,
          description: formData.usageScenario || "",
          project_type: formData.projectType,
          budget_min: formData.budgetMin,
          budget_max: formData.budgetMax,
          budget_estimate_only: formData.budgetEstimateOnly,
          start_date: formData.startDate,
          deadline: formData.deadline,
          deadline_flexible: formData.deadlineFlexible,
          required_skills: [],
          project_brief: {
            goals: formData.goals,
            features: formData.features,
            outputs: formData.outputs,
            usageScenario: formData.usageScenario,
          },
          reference_links: formData.referenceLinks,
          design_style: formData.designStyle?.join(", "),
          payment_method: formData.paymentMethod,
          payment_schedule: formData.paymentSchedule,
          deliverables: formData.deliverables,
          communication_preference: formData.communicationPreference,
          special_requirements: formData.specialRequirements,
          status: "draft",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/projects/${result.data.id}`);
      } else {
        const error = await response.json();
        alert(`發布失敗: ${error.error || "未知錯誤"}`);
      }
    } catch (error) {
      console.error("提交失敗:", error);
      alert("提交失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ProjectType data={formData} updateData={updateFormData} />;
      case 2:
        return <Step2UsageScenario data={formData} updateData={updateFormData} />;
      case 3:
        return <Step3Goals data={formData} updateData={updateFormData} />;
      case 4:
        return <Step4Features data={formData} updateData={updateFormData} />;
      case 5:
        return <Step5Outputs data={formData} updateData={updateFormData} />;
      case 6:
        return <Step6Reference data={formData} updateData={updateFormData} />;
      case 7:
        return <Step7Integrations data={formData} updateData={updateFormData} />;
      case 8:
        return <Step8BudgetSchedule data={formData} updateData={updateFormData} />;
      case 9:
        return <Step9Deliverables data={formData} updateData={updateFormData} />;
      case 10:
        return <Step10Additional data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 進度條 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#c5ae8c]">
            步驟 {currentStep} / {TOTAL_STEPS}
          </span>
          <span className="text-sm text-[#c5ae8c]">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}% 完成
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#20263e] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 當前步驟內容 */}
      <Card className="p-8">
        {renderStep()}
      </Card>

      {/* 導航按鈕 */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={currentStep === 1 ? "invisible" : ""}
        >
          ← 上一步
        </Button>

        <div className="flex gap-3">
          {currentStep < TOTAL_STEPS ? (
            <Button onClick={nextStep}>
              下一步 →
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={isSubmitting}>
              發布專案
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

