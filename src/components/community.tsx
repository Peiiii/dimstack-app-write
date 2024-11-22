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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Heart, Share2, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

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

interface CommunityProps {
  saveData?: (data: any) => Promise<void>;
  loadData?: () => Promise<any>;
}

export function Community({ saveData, loadData }: CommunityProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

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
          title: "加载失败",
          description: "无法加载社区数据",
          variant: "destructive",
        });
      }
    };
    loadSavedData();
  }, []);

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
        title: "错误",
        description: "请输入内容",
        variant: "destructive",
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: {
        name: "用户" + Math.floor(Math.random() * 1000),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      },
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    
    toast({
      title: "发布成功",
      description: "帖子已发布到社区",
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
            <CardTitle className="dark:text-gray-100">发布新帖子</CardTitle>
            <CardDescription className="dark:text-gray-400">分享你的想法...</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="写点什么..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={createPost} className="dark:bg-blue-600 dark:hover:bg-blue-700">
              发布
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