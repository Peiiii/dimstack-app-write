"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Heart, Share2, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

interface CommunityPersistedData {
  posts: Post[];
}

interface CommunityProps {
  saveData?: (data: CommunityPersistedData) => Promise<void>;
  loadData?: () => Promise<CommunityPersistedData | null>;
}

export function Community({ saveData, loadData }: CommunityProps) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await loadData?.();
        if (savedData?.posts) {
          setPosts(savedData.posts);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: t("community.loadFailed"),
          description: t("community.loadFailedDesc"),
          variant: "destructive",
        });
      }
    };
    loadSavedData();
  }, [loadData, t, toast]);

  // 自动保存
  useEffect(() => {
    const autoSave = async () => {
      try {
        await saveData?.({ posts });
      } catch (error) {
        console.error("Auto save failed:", error);
      }
    };

    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [posts, saveData]);

  const createPost = async () => {
    if (!newPost.trim()) {
      toast({
        title: t("community.error"),
        description: t("community.enterContent"),
        variant: "destructive",
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: {
        name: t("community.user") + Math.floor(Math.random() * 1000),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      },
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    
    toast({
      title: t("community.publishSuccess"),
      description: t("community.publishSuccessDesc"),
    });
  };

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto p-4">
        <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">{t("community.publishNewPost")}</CardTitle>
            <CardDescription className="dark:text-gray-400">{t("community.shareYourThoughts")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t("community.writeSomething")}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={createPost} className="dark:bg-blue-600 dark:hover:bg-blue-700">
              {t("community.publish")}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="dark:bg-gray-700 dark:text-gray-100">
                    {post.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base dark:text-gray-100">
                    {post.author.name}
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="dark:hover:bg-gray-700">
                  <MoreVertical className="h-4 w-4 dark:text-gray-400" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 dark:hover:bg-gray-700"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 dark:hover:bg-gray-700">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="dark:hover:bg-gray-700">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
