import { useState, useEffect } from 'react'
import { Moon, Sun, Plus, History } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Note = {
  id: string;
  content: string;
  createdAt: string;
}

interface ZenNotesProps {
  saveData?: (data: Note[]) => Promise<void>;
  loadData?: () => Promise<Note[]>;
}

export function ZenNotes({ saveData, loadData }: ZenNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const initializeNotes = async () => {
      try {
        let savedNotes;
        if (loadData) {
          savedNotes = await loadData();
        } else {
          const localNotes = localStorage.getItem('zenNotes');
          savedNotes = localNotes ? JSON.parse(localNotes) : [];
        }
        setNotes(savedNotes);
        
        if (savedNotes.length === 0) {
          const firstNote = {
            id: Date.now().toString(),
            content: '',
            createdAt: new Date().toISOString()
          };
          setCurrentNote(firstNote);
          saveNote(firstNote);
        } else {
          setCurrentNote(savedNotes[0]);
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };

    initializeNotes();
  }, [loadData]);

  const saveNote = async (noteToSave: Note) => {
    const updatedNotes = currentNote 
      ? notes.map(note => note.id === noteToSave.id ? noteToSave : note)
      : [noteToSave, ...notes]
    setNotes(updatedNotes)
    
    try {
      if (saveData) {
        await saveData(updatedNotes);
      } else {
        localStorage.setItem('zenNotes', JSON.stringify(updatedNotes));
      }
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentNote) {
      const updatedNote = { ...currentNote, content: e.target.value }
      setCurrentNote(updatedNote)
      saveNote(updatedNote)
    }
  }

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      content: '',
      createdAt: new Date().toISOString()
    }
    setCurrentNote(newNote)
    saveNote(newNote)
  }

  const selectNote = (note: Note) => {
    setCurrentNote(note)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
    }`}>
      <nav className={`p-4 flex justify-between items-center border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h1 className="text-2xl font-semibold">Zen Notes</h1>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className={`${
                  isDarkMode 
                    ? 'border-gray-700 hover:bg-gray-800 hover:text-gray-100' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className={`${
              isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white'
            }`}>
              <DialogHeader>
                <DialogTitle>创建新笔记</DialogTitle>
              </DialogHeader>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                确定要创建新笔记吗？当前笔记将被保存。
              </p>
              <Button 
                onClick={createNewNote}
                className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                确定
              </Button>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className={`${
                  isDarkMode 
                    ? 'border-gray-700 hover:bg-gray-800 hover:text-gray-100' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <History className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className={`${
              isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white'
            }`}>
              <DialogHeader>
                <DialogTitle>历史笔记</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                {notes.map(note => (
                  <div 
                    key={note.id} 
                    className={`p-2 cursor-pointer ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => selectNote(note)}
                  >
                    <p className="font-semibold">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <p className={`truncate ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-100' 
                : 'hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Textarea
            value={currentNote?.content || ''}
            onChange={handleNoteChange}
            placeholder="记录你的内心感受..."
            className={`w-full h-64 p-4 rounded-lg resize-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-100 focus:ring-blue-500 border-gray-700 placeholder-gray-500'
                : 'bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-400'
            }`}
          />
          <p className={`mt-2 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            字数: {currentNote?.content.length || 0}
          </p>
        </div>
      </main>
    </div>
  )
}