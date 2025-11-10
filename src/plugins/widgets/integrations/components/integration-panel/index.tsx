import { authService } from "@/services/auth.service";
import React, { useMemo } from "react";
import { AiOutlineLink } from "react-icons/ai";

interface Integration {
  id: string;
  name: string;
  platform: string;
  username: string;
  token?: string;
}

interface IntegrationOption {
  id: string;
  name: string;
  buttonLabel: string;
  link: string;
  willRedirect?: boolean;
}

interface IntegrationPanelProps {
  integrations: Integration[];
  integrationOptions: IntegrationOption[];
  onAddIntegration: (type: string) => void;
  onRemoveIntegration: (id: string) => void;
}

const IntegrationList: React.FC<IntegrationPanelProps> = ({
  integrations,
  integrationOptions,
  onAddIntegration,
  onRemoveIntegration,
}) => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">授权 Gitee 或 GitHub 账号</h1>
      <div className="mb-6">
        {integrationOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              onAddIntegration(option.id);
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mb-3 flex justify-center items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            {option.buttonLabel}
            {option.willRedirect && <AiOutlineLink />}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {integrations.map((integration) => (
          <li
            key={integration.id}
            className="flex justify-between items-center border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="font-semibold text-gray-700">{integration.name}</h2>
              <p className="text-gray-500">{integration.username}</p>
            </div>
            <button
              onClick={() => onRemoveIntegration(integration.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const IntegrationPanel: React.FC = () => {
  // Use singleton authService directly
  const authRecords = authService.useAuthRecords();

  const integrations: Integration[] = useMemo(
    () =>
      authRecords
        .map((authInfo) => ({
          id: authInfo.id,
          name: authInfo.platform,
          platform: authInfo.platform,
          username: authInfo.username,
          token: authInfo.accessToken,
        }))
        .reduce((acc, cur) => {
          if (
            acc.some(
              (i) => i.platform === cur.platform && i.username === cur.username
            )
          ) {
            return acc;
          }
          return [...acc, cur];
        }, [] as Integration[]),
    [authRecords]
  );

  const { authProviders } = authService.useAuthProviders();

  return (
    <div>
      <IntegrationList
        integrations={integrations}
        integrationOptions={authProviders.map((provider) => ({
          id: provider.id,
          name: provider.name || provider.platform,
          buttonLabel: `授权 ${provider.name || provider.platform}`,
          link: "",
          willRedirect: true,
        }))}
        onAddIntegration={(id) => {
          authService.authenticate({
            platform: id,
            needConfirm: true,
          });
        }}
        onRemoveIntegration={(id) => {
          authService.removeAuthRecord(id);
        }}
      />
    </div>
  );
};

export default IntegrationPanel;
