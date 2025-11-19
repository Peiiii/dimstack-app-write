import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GitaryBrand } from "@/components/gitary-brand";
import xbook from "xbook";
import { EventKeys } from "@/constants/eventKeys";
import { useTranslation } from "react-i18next";

export const IntroductionPage = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <GitaryBrand showLogo={true} showName={true} size="lg" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{t("introduction.welcome")}</h1>
          <p className="text-xl text-muted-foreground">
            {t("introduction.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon="🔄"
            title={t("introduction.gitIntegration")}
            description={t("introduction.gitIntegrationDesc")}
          />
          <FeatureCard
            icon="✍️"
            title={t("introduction.markdownEditor")}
            description={t("introduction.markdownEditorDesc")}
          />
          <FeatureCard
            icon="📱"
            title={t("introduction.convenientAccess")}
            description={t("introduction.convenientAccessDesc")}
          />
          <FeatureCard
            icon="🔐"
            title={t("introduction.secure")}
            description={t("introduction.secureDesc")}
          />
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="px-8"
            onClick={() => xbook.eventBus.emit(EventKeys.ActivityBar.ActivityClicked("addGiteeRepo"))}
          >
            {t("introduction.getStarted")}
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-muted-foreground text-lg">{description}</p>
    </CardContent>
  </Card>
);
