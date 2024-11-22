import { Resume } from "@/types/resume";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ResumeViewProps {
  resume: Resume;
}

export function ResumeView({ resume }: ResumeViewProps) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resume.basics.name}_简历`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
        
        /* 强制分页设置 */
        .page-break-after {
          page-break-after: always;
        }
        
        /* 避免元素内部分页 */
        .no-break-inside {
          break-inside: avoid;
        }
        
        /* 确保新章节从新页开始 */
        .break-before {
          break-before: page;
        }

        /* 防止孤行 */
        p, h2, h3, h4 {
          orphans: 3;
          widows: 3;
        }
      }
    `
  });

  return (
    <div className="relative">
      <button
        onClick={() => handlePrint()}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group z-50"
        title="导出PDF"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span className="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          导出PDF
        </span>
      </button>

      <div 
        ref={componentRef} 
        className="space-y-8 px-6 mt-8 print:mt-8 print:px-8"
      >
        <div className="text-center border-b pb-6 print:pb-4 no-break-inside">
          <h2 className="text-2xl font-bold">{resume.basics.name}</h2>
          <p className="text-xl text-gray-600 mt-2">{resume.basics.title}</p>
          <p className="text-sm text-gray-500 mt-2">
            工作经验：{resume.basics.experience}
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            {resume.basics.summary}
          </p>
        </div>

        <div className="no-break-inside">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            专业技能
          </h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="break-before">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            工作经历
          </h3>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:w-[2px] before:h-full before:bg-gray-200 no-break-inside"
              >
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-800">{exp.company}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {exp.position} | {exp.duration}
                </p>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-600 text-sm">
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="break-before">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </span>
            项目经历
          </h3>
          <div className="space-y-6">
            {resume.projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-4 no-break-inside"
              >
                <h4 className="font-semibold text-gray-800">{project.name}</h4>
                <p className="text-gray-600 mt-2 text-sm">
                  {project.description}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700">
                    主要成就：
                  </p>
                  <ul className="mt-1 space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-600 text-sm">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white text-gray-600 rounded text-xs border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
