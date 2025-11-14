"use client";

import React from "react";

interface Props {
  data: any;
  updateData: (data: any) => void;
}

const INTEGRATION_OPTIONS = [
  { value: "google_sheets", label: "Google Sheets", icon: "📊" },
  { value: "line", label: "LINE", icon: "💬" },
  { value: "facebook", label: "Facebook", icon: "📘" },
  { value: "instagram", label: "Instagram", icon: "📷" },
  { value: "payment", label: "金流（信用卡/行動支付）", icon: "💳" },
  { value: "crm", label: "CRM 系統", icon: "👥" },
  { value: "email", label: "Email 系統", icon: "📧" },
  { value: "none", label: "不需要串接", icon: "✕" },
  { value: "other", label: "其他", icon: "🔗" },
];

export const Step7Integrations: React.FC<Props> = ({ data, updateData }) => {
  const handleIntegrationToggle = (value: string) => {
    const integrations = data.integrations || [];
    
    if (value === "none") {
      updateData({ integrations: ["none"] });
      return;
    }
    
    const filteredIntegrations = integrations.filter((i: string) => i !== "none");
    
    if (filteredIntegrations.includes(value)) {
      updateData({ integrations: filteredIntegrations.filter((i: string) => i !== value) });
    } else {
      updateData({ integrations: [...filteredIntegrations, value] });
    }
  };

  const isIntegrationSelected = (value: string) => {
    return (data.integrations || []).includes(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#20263e] mb-3">
          需要跟其他工具連動嗎？
        </h2>
        <p className="text-[#c5ae8c]">
          選擇需要串接或整合的外部服務（可複選）
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INTEGRATION_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleIntegrationToggle(option.value)}
            className={`p-5 rounded-xl border-2 transition-all text-left hover:shadow-md ${
              isIntegrationSelected(option.value)
                ? "border-[#20263e] bg-[#20263e] bg-opacity-5"
                : "border-[#c5ae8c] hover:border-[#20263e]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg font-semibold text-[#20263e]">
                  {option.label}
                </span>
              </div>
              {isIntegrationSelected(option.value) && (
                <span className="text-[#20263e] text-xl">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 其他整合說明 */}
      {isIntegrationSelected("other") && (
        <div className="mt-6 p-6 bg-[#f5f3ed] rounded-lg">
          <label className="block text-sm font-semibold text-[#20263e] mb-2">
            請說明需要整合的工具：
          </label>
          <textarea
            value={data.integrationsOther || ""}
            onChange={(e) => updateData({ integrationsOther: e.target.value })}
            placeholder="例如：需要串接公司內部的庫存系統..."
            className="w-full px-4 py-3 rounded-lg border border-[#c5ae8c] focus:border-[#20263e] focus:outline-none focus:ring-2 focus:ring-[#20263e] focus:ring-opacity-20"
            rows={3}
          />
        </div>
      )}

      {/* 小提示 */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 小提示：</strong> 如果不確定需要什麼，可以選「不需要串接」，接案者會在討論時給予建議。
        </p>
      </div>
    </div>
  );
};

