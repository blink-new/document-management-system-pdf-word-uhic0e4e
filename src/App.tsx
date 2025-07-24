import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { FileText, Upload, Search, FolderOpen, Settings, User, LogOut } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading DocuManager...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">DocuManager</CardTitle>
            <CardDescription>Professional Document Management System</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">Please sign in to access your documents</p>
            <Button onClick={() => blink.auth.login()} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">DocuManager</h1>
            <p className="text-sm text-muted-foreground">Document Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={currentView === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('dashboard')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={currentView === 'library' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('library')}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Document Library
            </Button>
            <Button
              variant={currentView === 'upload' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('upload')}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
            <Button
              variant={currentView === 'search' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentView('search')}
            >
              <Search className="mr-2 h-4 w-4" />
              Search & Filter
            </Button>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground">User</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => blink.auth.logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'library' && <LibraryView />}
        {currentView === 'upload' && <UploadView />}
        {currentView === 'search' && <SearchView />}
      </div>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your document management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No documents yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 MB</div>
            <p className="text-xs text-muted-foreground">of unlimited storage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No categories created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">actions today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Start managing your documents efficiently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Upload className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-medium">Upload your first document</h4>
              <p className="text-sm text-muted-foreground">Start by uploading PDF or Word documents</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <FolderOpen className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-medium">Organize with categories</h4>
              <p className="text-sm text-muted-foreground">Create categories to keep your documents organized</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Search className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <h4 className="font-medium">Search and find quickly</h4>
              <p className="text-sm text-muted-foreground">Use powerful search to find documents instantly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LibraryView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Document Library</h2>
        <p className="text-muted-foreground">Browse and manage your documents</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No documents yet</h3>
          <p className="text-muted-foreground mb-4">Upload your first document to get started</p>
          <Button>Upload Document</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function UploadView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Documents</h2>
        <p className="text-muted-foreground">Add new PDF and Word documents to your library</p>
      </div>
      <Card>
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <Button>Choose Files</Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supports PDF, DOC, DOCX files up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SearchView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Search & Filter</h2>
        <p className="text-muted-foreground">Find documents quickly with advanced search</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Search your documents</h3>
          <p className="text-muted-foreground mb-4">Use the search bar to find documents by name, content, or category</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default App