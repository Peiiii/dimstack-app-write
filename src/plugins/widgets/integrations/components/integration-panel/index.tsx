import { Tokens } from "@/constants/tokens";
import React, { useMemo } from "react";
import xbook from "xbook/index";

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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">授权 Gitee 或 GitHub 账号</h1>
      <div className="mb-4">
        {integrationOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              onAddIntegration(option.id);
            }}
            className="bg-blue-500 text-white p-2 rounded w-full mb-2"
          >
            {option.buttonLabel}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {integrations.map((integration) => (
          <li
            key={integration.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <h2 className="font-bold">{integration.name}</h2>
              <p>{integration.username}</p>
            </div>
            <button
              onClick={() => onRemoveIntegration(integration.id)}
              className="bg-red-500 text-white p-2 rounded"
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
  const authService = xbook.serviceBus.createProxy(Tokens.AuthService);
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
        }))}
        onAddIntegration={(id) => {
          authService.authenticate(id);
        }}
        onRemoveIntegration={(id) => {
          authService.removeAuthRecord(id);
        }}
      />
    </div>
  );
};

export default IntegrationPanel;
