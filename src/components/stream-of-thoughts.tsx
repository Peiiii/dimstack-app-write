import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

type Thought = {
  id: number;
  content: string;
  timestamp: number;
  mood: string;
};

interface StreamOfThoughtsProps {
  saveData?: (data: Thought[]) => Promise<void>;
  loadData?: () => Promise<Thought[]>;
}

const MOODS = ["😊", "😐", "😢", "😡", "🤔"];

export function StreamOfThoughtsComponent({
  saveData,
  loadData,
}: StreamOfThoughtsProps) {
  const { t } = useTranslation();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [newThought, setNewThought] = useState("");
  const [selectedMood, setSelectedMood] = useState("😊");
  const [_editingThought, _setEditingThought] = useState<number | null>(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  useEffect(() => {
    const initializeThoughts = async () => {
      try {
        if (loadData) {
          const loadedThoughts = await loadData();
          setThoughts(loadedThoughts);
        } else {
          const savedThoughts = localStorage.getItem("thoughts");
          if (savedThoughts) {
            setThoughts(JSON.parse(savedThoughts));
          }
        }
      } catch (error) {
        console.error("Failed to load thoughts:", error);
      }
    };

    initializeThoughts();
  }, [loadData]);

  useEffect(() => {
    const persistThoughts = async () => {
      try {
        if (saveData) {
          await saveData(thoughts);
        } else {
          localStorage.setItem("thoughts", JSON.stringify(thoughts));
        }
      } catch (error) {
        console.error("Failed to save thoughts:", error);
      }
    };

    persistThoughts();
  }, [thoughts, saveData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMoodPicker && !(event.target as Element).closest('.mood-picker')) {
        setShowMoodPicker(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMoodPicker]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addThought();
    }
  };

  const addThought = () => {
    if (newThought.trim()) {
      const thought: Thought = {
        id: Date.now(),
        content: newThought,
        timestamp: Date.now(),
        mood: selectedMood,
      };
      setThoughts((prevThoughts) => [thought, ...prevThoughts]);
      setNewThought("");
    }
  };

  const deleteThought = (id: number) => {
    setThoughts((prevThoughts) => prevThoughts.filter(thought => thought.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="sticky top-4 z-10 mb-8">
          <div className="flex space-x-2">
            <div className="flex-grow flex space-x-2 items-center border rounded-xl px-4 py-3 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 focus-within:shadow-xl focus-within:ring-1 focus-within:ring-blue-100">
              <div className="relative mood-picker">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xl p-1.5 h-auto hover:bg-gray-50 rounded-full transition-colors"
                  onClick={() => setShowMoodPicker(!showMoodPicker)}
                >
                  {selectedMood}
                </Button>
                {showMoodPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-2 z-20 border border-gray-100">
                    <div className="flex gap-1.5">
                      {MOODS.map((mood) => (
                        <Button
                          key={mood}
                          variant="ghost"
                          size="sm"
                          className="text-xl p-2 h-auto hover:bg-gray-50 rounded-full transition-colors"
                          onClick={() => {
                            setSelectedMood(mood);
                            setShowMoodPicker(false);
                          }}
                        >
                          {mood}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Input
                type="text"
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("thoughts.placeholder")}
                className="flex-grow border-0 focus:ring-0 focus-visible:ring-0 focus:outline-none px-0 placeholder-gray-400 text-base"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pb-6">
          {thoughts.map((thought) => (
            <Card 
              key={thought.id}
              className="group bg-white border-transparent hover:border-gray-200 shadow-sm hover:shadow transition-all duration-200"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                      {thought.content}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <span className="text-lg">{thought.mood}</span>
                      <span className="text-gray-300">•</span>
                      <time dateTime={new Date(thought.timestamp).toISOString()}>
                        {new Date(thought.timestamp).toLocaleString()}
                      </time>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-gray-600 -mr-2"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-700 focus:bg-red-50"
                        onClick={() => {
                          if (window.confirm(t("thoughts.confirmDelete"))) {
                            deleteThought(thought.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t("thoughts.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}

          {thoughts.length === 0 && (
            <div className="text-center text-gray-400 py-16 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-lg">{t("thoughts.noRecords")}</p>
              <p className="text-sm mt-1">{t("thoughts.startWriting")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
