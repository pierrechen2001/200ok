"use client";

import React from "react";

interface Props {
  data: any;
  updateData: (data: any) => void;
}

const EXAMPLE_SCENARIOS = [
  "客人打開手機 → 預約剪頭髮 → 收到提醒",
  "員工登入 → 填報表 → 自動算薪水",
  "老師輸入學生資料 → 自動產生成績圖表",
  "顧客瀏覽商品 → 加入購物車 → 線上付款",
  "客服收到訊息 → Bot 自動回覆 → 解決問題",
];

export const Step2UsageScenario: React.FC<Props> = ({ data, updateData }) => {
  const handleExampleSelect = (example: string) => {
    updateData({ usageScenario: example });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#20263e] mb-3">
          你想像這個軟體會被怎麼使用？
        </h2>
        <p className="text-[#c5ae8c]">
          描述一下使用者會如何操作這個軟體
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-[#20263e] mb-2">
          使用情境描述
        </label>
        <textarea
          value={data.usageScenario || ""}
          onChange={(e) => updateData({ usageScenario: e.target.value })}
          placeholder="例如：客人打開手機 → 選擇服務項目 → 選擇時間 → 預約完成 → 收到確認通知"
          className="w-full px-4 py-3 rounded-lg border border-[#c5ae8c] focus:border-[#20263e] focus:outline-none focus:ring-2 focus:ring-[#20263e] focus:ring-opacity-20"
          rows={5}
        />
      </div>

      {/* 範例參考 */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-[#20263e] mb-3">
          參考範例（點擊套用）：
        </p>
        <div className="space-y-2">
          {EXAMPLE_SCENARIOS.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleSelect(example)}
              className="w-full text-left p-3 rounded-lg border border-[#c5ae8c] hover:border-[#20263e] hover:bg-[#f5f3ed] transition-all"
            >
              <span className="text-sm text-[#20263e]">{example}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 小提示 */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 小提示：</strong> 用「→」符號來表示步驟流程，讓接案者更容易理解使用情境。
        </p>
      </div>
    </div>
  );
};

