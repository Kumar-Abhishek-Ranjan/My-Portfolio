import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Project, Achievement, Skill, insertAchievementSchema, insertSkillSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("achievements");
  const { toast } = useToast();

  const { data: achievements, isLoading: isLoadingAchievements } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: skills, isLoading: isLoadingSkills } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  // Achievement mutations
  const createAchievementMutation = useMutation({
    mutationFn: async (data: Achievement) => {
      const res = await apiRequest("POST", "/api/admin/achievements", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement created successfully" });
    },
  });

  const deleteAchievementMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/achievements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement deleted successfully" });
    },
  });

  // Skill mutations
  const createSkillMutation = useMutation({
    mutationFn: async (data: Skill) => {
      const res = await apiRequest("POST", "/api/admin/skills", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill created successfully" });
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/skills/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill deleted successfully" });
    },
  });

  // Achievement form
  const achievementForm = useForm({
    resolver: zodResolver(insertAchievementSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      order: 0,
    },
  });

  // Skill form
  const skillForm = useForm({
    resolver: zodResolver(insertSkillSchema),
    defaultValues: {
      name: "",
      level: 0,
      category: "",
      order: 0,
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Achievements</CardTitle>
                      <CardDescription>
                        Manage your achievements and recognitions
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Achievement
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Achievement</DialogTitle>
                          <DialogDescription>
                            Create a new achievement to showcase your accomplishments
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...achievementForm}>
                          <form
                            onSubmit={achievementForm.handleSubmit((data) =>
                              createAchievementMutation.mutate(data as Achievement)
                            )}
                            className="space-y-4"
                          >
                            <FormField
                              control={achievementForm.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={achievementForm.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={achievementForm.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="submit"
                              disabled={createAchievementMutation.isPending}
                            >
                              {createAchievementMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Creating...
                                </>
                              ) : (
                                "Create Achievement"
                              )}
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingAchievements ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : achievements?.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">
                      No achievements yet. Add your first one!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {achievements?.map((achievement) => (
                        <Card key={achievement.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.date}
                                </p>
                                <p className="mt-2">{achievement.description}</p>
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                  deleteAchievementMutation.mutate(achievement.id)
                                }
                                disabled={deleteAchievementMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Skills</CardTitle>
                      <CardDescription>
                        Manage your technical skills
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Skill</DialogTitle>
                          <DialogDescription>
                            Add a new technical skill to your portfolio
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...skillForm}>
                          <form
                            onSubmit={skillForm.handleSubmit((data) =>
                              createSkillMutation.mutate(data as Skill)
                            )}
                            className="space-y-4"
                          >
                            <FormField
                              control={skillForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={skillForm.control}
                              name="level"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Level (0-100)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(parseInt(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={skillForm.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="submit"
                              disabled={createSkillMutation.isPending}
                            >
                              {createSkillMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Creating...
                                </>
                              ) : (
                                "Create Skill"
                              )}
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingSkills ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : skills?.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">
                      No skills yet. Add your first one!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {skills?.map((skill) => (
                        <Card key={skill.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{skill.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {skill.category}
                                </p>
                                <div className="mt-2 w-full bg-secondary h-2 rounded-full">
                                  <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => deleteSkillMutation.mutate(skill.id)}
                                disabled={deleteSkillMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}