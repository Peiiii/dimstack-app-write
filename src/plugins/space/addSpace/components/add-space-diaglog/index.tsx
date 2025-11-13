import { Button } from "@/components/ui/button";
import { AddSpaceBySelect } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-by-select";
import { AddSpaceQuickStart } from "@/plugins/space/addSpace/components/add-space-diaglog/components/add-space-quick-start";
import { Github, GitBranch, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import xbook from "xbook";
import { EventKeys } from "@/constants/eventKeys";

type Step = "platform" | "auth" | "select";

interface AddSpaceDialogProps {
  defaultPlatform?: "github" | "gitee";
  defaultMode?: "local";
}

export const AddSpaceDialog = ({ defaultPlatform, defaultMode }: AddSpaceDialogProps = {}) => {
  const getInitialStep = (): Step => {
    if (defaultPlatform) {
      const hasAuth = !!authService.getAnyAuthInfo(defaultPlatform)?.accessToken;
      return hasAuth ? "select" : "auth";
    }
    return defaultMode === "local" ? "platform" : "platform";
  };
  
  const [step, setStep] = useState<Step>(getInitialStep());
  const [selectedPlatform, setSelectedPlatform] = useState<"github" | "gitee" | null>(defaultPlatform || null);
  const [showLocalOption, setShowLocalOption] = useState(defaultMode === "local");

  const authRecords = authService.useAuthRecords();
  
  const isAuthorized = selectedPlatform
    ? !!authService.getAnyAuthInfo(selectedPlatform)?.accessToken
    : false;

  useEffect(() => {
    if (step === "auth" && selectedPlatform && isAuthorized) {
      setStep("select");
    }
  }, [authRecords, step, selectedPlatform, isAuthorized]);

  const handlePlatformSelect = (platform: "github" | "gitee") => {
    setSelectedPlatform(platform);
    const hasAuth = !!authService.getAnyAuthInfo(platform)?.accessToken;
    if (hasAuth) {
      setStep("select");
    } else {
      setStep("auth");
    }
  };

  const handleBack = () => {
    if (step === "select") {
      if (isAuthorized) {
        setStep("platform");
      } else {
        setStep("auth");
      }
    } else if (step === "auth") {
      setStep("platform");
    }
  };

  if (showLocalOption) {
    return (
      <div className="py-2">
        <AddSpaceQuickStart />
        <div className="mt-6 pt-4 border-t">
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={() => setShowLocalOption(false)}
          >
            返回
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-1">
      {step === "platform" && (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">连接你的仓库</h2>
            <p className="text-sm text-muted-foreground">选择代码托管平台开始使用</p>
          </div>

          <div className="flex flex-col gap-2 max-w-[280px] mx-auto">
            <PlatformButton
              name="GitHub"
              icon={Github}
              onClick={() => handlePlatformSelect("github")}
            />
            <PlatformButton
              name="Gitee"
              icon={GitBranch}
              onClick={() => handlePlatformSelect("gitee")}
            />
          </div>

          <div className="pt-6 border-t">
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground font-normal"
              onClick={() => setShowLocalOption(true)}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              先在本地开始
            </Button>
          </div>
        </div>
      )}

      {step === "auth" && selectedPlatform && (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">授权 {selectedPlatform === "github" ? "GitHub" : "Gitee"}</h2>
            <p className="text-sm text-muted-foreground">需要访问你的仓库列表</p>
          </div>

          <div className="space-y-3 max-w-[280px] mx-auto">
            <Button
              className="w-full h-11 font-medium"
              onClick={() => {
                xbook.eventBus.emit(EventKeys.RequestAuthManage);
              }}
            >
              继续授权
            </Button>
            <Button 
              variant="ghost" 
              className="w-full font-normal" 
              onClick={handleBack}
            >
              返回
            </Button>
          </div>
        </div>
      )}

      {step === "select" && selectedPlatform && (
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">选择仓库</h2>
            <p className="text-sm text-muted-foreground">从你的仓库中选择一个</p>
          </div>

          <AddSpaceBySelect defaultPlatform={selectedPlatform} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

const PlatformButton = ({
  name,
  icon: Icon,
  onClick,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full px-4 py-3.5 rounded-lg border bg-background hover:bg-accent/50 transition-all duration-200 text-left active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted/50 group-hover:bg-muted flex items-center justify-center transition-colors">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{name}</div>
        </div>
      </div>
    </button>
  );
};
