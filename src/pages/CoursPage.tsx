
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DownloadCloud, File, FileText, UploadCloud } from "lucide-react";
import { toast } from "sonner";

// Mock data for courses
const initialCourses = [
  { id: 1, title: "Introduction à la programmation", type: "pdf", size: "2.4 MB", author: "Prof. Martin" },
  { id: 2, title: "Mathématiques avancées", type: "docx", size: "1.8 MB", author: "Prof. Dubois" },
  { id: 3, title: "Histoire de l'art", type: "pptx", size: "4.2 MB", author: "Prof. Laurent" },
  { id: 4, title: "Physique quantique", type: "pdf", size: "3.5 MB", author: "Prof. Garcia" },
];

const CoursPage: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState(initialCourses);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !file) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // In a real app, you'd upload the file to a server here
    const newCourse = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      title,
      type: file.name.split('.').pop() || "",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      author: user?.name || "Unknown",
    };

    setCourses([...courses, newCourse]);
    setTitle("");
    setFile(null);
    toast.success("Cours ajouté avec succès");
  };

  const handleDownload = (courseId: number) => {
    // In a real app, this would download the actual file
    toast.success("Téléchargement démarré");
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <File className="text-red-500" />;
      case "docx":
        return <FileText className="text-blue-500" />;
      case "pptx":
        return <FileText className="text-orange-500" />;
      default:
        return <File />;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Cours en ligne</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ressources disponibles</CardTitle>
              <CardDescription>Téléchargez les cours disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 bg-muted p-4 font-medium">
                  <div className="col-span-5">Titre</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Taille</div>
                  <div className="col-span-2">Auteur</div>
                  <div className="col-span-1">Action</div>
                </div>
                {courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-12 p-4 items-center border-t">
                    <div className="col-span-5 flex items-center gap-2">
                      {getFileIcon(course.type)}
                      <span>{course.title}</span>
                    </div>
                    <div className="col-span-2 uppercase text-xs font-medium text-muted-foreground">
                      {course.type}
                    </div>
                    <div className="col-span-2 text-sm">{course.size}</div>
                    <div className="col-span-2 text-sm">{course.author}</div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(course.id)}
                        title="Télécharger"
                      >
                        <DownloadCloud size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {(user?.role === "teacher" || user?.role === "admin") && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un cours</CardTitle>
                <CardDescription>
                  {user?.role === "admin" 
                    ? "En tant qu'administrateur, ajoutez de nouveaux cours" 
                    : "Partagez vos supports de cours"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre du cours</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Entrez un titre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Fichier (PDF, DOCX, PPTX)</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.pptx"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formats supportés: PDF, DOCX, PPTX
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-eduBlue hover:bg-eduBlue-dark"
                  >
                    <UploadCloud size={16} className="mr-2" />
                    Téléverser
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursPage;
