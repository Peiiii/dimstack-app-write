import { aiGateway } from "@/services/ai/gateway";
import type { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";

type ExcalidrawElement = NonNullable<
  ExcalidrawInitialDataState["elements"]
>[number];

export class ExcalidrawAIService {
  async generateDiagram(prompt: string): Promise<ExcalidrawElement[]> {
    const systemPrompt = `你是一个专业的图表生成助手。根据用户的描述，生成 Excalidraw 格式的图表元素。

要求：
1. 理解用户的描述，生成相应的图表（流程图、架构图、系统图等）
2. 返回的 JSON 必须是一个数组，包含 Excalidraw 元素对象
3. 每个元素必须包含以下必需字段：
   - type: 元素类型（"rectangle", "ellipse", "diamond", "arrow", "text", "line" 等）
   - id: 唯一标识符（使用简短描述，如 "box1", "text1"）
   - x, y: 位置坐标（数字）
   - width, height: 尺寸（数字）
   - strokeColor: 边框颜色（如 "#1e1e1e"）
   - backgroundColor: 背景颜色（如 "#ffffff" 或 "transparent"）
   - fillStyle: 填充样式（"solid" 或 "hachure"）
   - strokeWidth: 边框宽度（数字，如 2）
   - strokeStyle: 边框样式（"solid"）
   - roughness: 粗糙度（数字，如 1）
   - opacity: 透明度（100）
   - angle: 角度（0）
   - seed: 随机种子（数字）
   - version: 版本号（141）
   - versionNonce: 版本随机数（数字）
   - isDeleted: false
   - groupIds: []
   - frameId: null
   - roundness: null 或 { type: 3 }
   - boundElements: []
   - updated: 时间戳（数字）
   - link: null
   - locked: false

4. 对于文本元素，还需要：
   - text: 文本内容
   - fontSize: 字体大小（数字）
   - fontFamily: 字体族（1-4，1=normal, 2=code, 3=hand, 4=hand-drawn）
   - textAlign: 对齐方式（"left", "center", "right"）
   - verticalAlign: 垂直对齐（"top", "middle", "bottom"）
   - originalText: 原始文本（与 text 相同）
   - lineHeight: 行高（数字，如 1.25）
   - baseline: 基线（数字）

5. 对于箭头元素，还需要：
   - points: 点数组，如 [[0, 0], [100, 100]]
   - lastCommittedPoint: 最后一个点，如 [100, 100]
   - startArrowhead: null 或 "arrow"
   - endArrowhead: "arrow"
   - startBinding: null
   - endBinding: null

6. 元素布局要合理，避免重叠
7. 使用合适的颜色和样式，让图表清晰美观
8. 只返回 JSON 数组，不要包含其他文字说明

示例格式：
[
  {
    "type": "rectangle",
    "version": 141,
    "versionNonce": 1001,
    "isDeleted": false,
    "id": "box1",
    "fillStyle": "solid",
    "strokeWidth": 2,
    "strokeStyle": "solid",
    "roughness": 1,
    "opacity": 100,
    "angle": 0,
    "x": 100,
    "y": 100,
    "strokeColor": "#1e1e1e",
    "backgroundColor": "#4f46e5",
    "width": 200,
    "height": 80,
    "seed": 1001,
    "groupIds": [],
    "frameId": null,
    "roundness": { "type": 3 },
    "boundElements": [],
    "updated": 1001,
    "link": null,
    "locked": false
  },
  {
    "type": "text",
    "version": 141,
    "versionNonce": 1002,
    "isDeleted": false,
    "id": "text1",
    "fillStyle": "solid",
    "strokeWidth": 2,
    "strokeStyle": "solid",
    "roughness": 1,
    "opacity": 100,
    "angle": 0,
    "x": 150,
    "y": 125,
    "strokeColor": "#ffffff",
    "backgroundColor": "transparent",
    "width": 100,
    "height": 30,
    "seed": 1002,
    "groupIds": [],
    "frameId": null,
    "roundness": null,
    "boundElements": null,
    "updated": 1002,
    "link": null,
    "locked": false,
    "fontSize": 20,
    "fontFamily": 1,
    "text": "前端",
    "textAlign": "center",
    "verticalAlign": "middle",
    "containerId": null,
    "originalText": "前端",
    "lineHeight": 1.25,
    "baseline": 20
  }
]`;

    const userPrompt = `请根据以下描述生成 Excalidraw 图表元素：${prompt}

请直接返回 JSON 数组，不要包含任何其他文字。`;

    try {
      const response = await aiGateway.chat({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      });

      const content = response.messages[0]?.content || "";
      
      let jsonStr = content.trim();
      
      if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.replace(/```json\n?/g, "").replace(/\n?```/g, "");
      } else if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.replace(/```\n?/g, "").replace(/\n?```/g, "");
      }

      const elements = JSON.parse(jsonStr) as ExcalidrawElement[];

      if (!Array.isArray(elements)) {
        throw new Error("AI 返回的不是数组格式");
      }

      const validatedElements = elements.map((element, index) => {
        const timestamp = Date.now() + index;
        return {
          ...element,
          id: element.id || `element-${timestamp}`,
          version: element.version || 141,
          versionNonce: element.versionNonce || timestamp,
          updated: element.updated || timestamp,
          seed: element.seed || timestamp,
          isDeleted: false,
          groupIds: element.groupIds || [],
          frameId: element.frameId || null,
          boundElements: element.boundElements || [],
          link: element.link || null,
          locked: element.locked || false,
          opacity: element.opacity ?? 100,
          angle: element.angle || 0,
          roughness: element.roughness ?? 1,
          strokeWidth: element.strokeWidth ?? 2,
          strokeStyle: element.strokeStyle || "solid",
          fillStyle: element.fillStyle || "solid",
          strokeColor: element.strokeColor || "#1e1e1e",
          backgroundColor: element.backgroundColor || "transparent",
        } as ExcalidrawElement;
      });

      return validatedElements;
    } catch (error) {
      console.error("Error generating diagram:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "生成图表时出错，请重试"
      );
    }
  }
}

export const excalidrawAIService = new ExcalidrawAIService();
