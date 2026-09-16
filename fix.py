import json
import re

problems = [
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminLayout.tsx","message":"'PenTool' is declared but its value is never read.","severity":"warning","startLine":7,"endLine":7},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminUI.tsx","message":"'Filter' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminUI.tsx","message":"'ChevronDown' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminUI.tsx","message":"'Edit' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminUI.tsx","message":"'Eye' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminUI.tsx","message":"'Trash2' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\components\\AdminUI.tsx","message":"'Archive' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\AdminLoginPage.tsx","message":"'Lock' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\BranchesPage.tsx","message":"'Archive' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\ChaptersPage.tsx","message":"'t' is declared but its value is never read.","severity":"warning","startLine":64,"endLine":64},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\ContentPages.tsx","message":"'t' is declared but its value is never read.","severity":"warning","startLine":62,"endLine":62},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\NotesPage.tsx","message":"'Download' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\NotesPage.tsx","message":"'t' is declared but its value is never read.","severity":"warning","startLine":71,"endLine":71},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\SemestersPage.tsx","message":"'Eye' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\admin\\src\\pages\\VideosPage.tsx","message":"'t' is declared but its value is never read.","severity":"warning","startLine":110,"endLine":110},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\student\\src\\pages\\ForgotPasswordPage.tsx","message":"'ArrowRight' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\student\\src\\pages\\NotesReader.tsx","message":"'Share2' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\student\\src\\pages\\PYQPage.tsx","message":"'CheckCircle' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\student\\src\\pages\\RegisterPage.tsx","message":"'ShieldCheck' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\student\\src\\pages\\ResetPasswordPage.tsx","message":"'BookOpen' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3},
{"path":"c:\\Users\\panch\\OneDrive\\Desktop\\mobile-learnign website\\webiste\\frontend\\student\\src\\pages\\VideoLectures.tsx","message":"'MessageSquare' is declared but its value is never read.","severity":"warning","startLine":3,"endLine":3}
]

for p in problems:
    path = p["path"]
    line_idx = p["startLine"] - 1
    msg = p["message"]
    match = re.search(r"'([^']+)' is declared but its value is never read", msg)
    if not match:
        continue
    var_name = match.group(1)
    
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    line = lines[line_idx]
    
    # Try to remove the var_name from the import list or variable declaration
    # e.g., 'BookOpen,' -> '', ', BookOpen' -> '', '{ BookOpen }' -> ''
    
    if "import" in line:
        line = re.sub(r',\s*' + var_name + r'\b', '', line)
        line = re.sub(r'\b' + var_name + r'\s*,', '', line)
        line = re.sub(r'\{\s*' + var_name + r'\s*\}', '', line)
        line = re.sub(r'\b' + var_name + r'\b', '', line)
    else:
        # It's probably a catch clause or parameter: e.g., `catch (t)` or something? 
        # For 't' it might be `catch (t)` or similar. If it's a catch we can just remove `(t)` or change to `()` but since we don't know if the syntax requires something we can prefix it with `_` or just ignore.
        # "t" is likely a catch block variable `catch (t)` or mapped variable `(t) => ...`
        pass
    
    # Clean up empty imports
    line = re.sub(r'import\s*\{\s*\}\s*from.*', '', line)
    
    lines[line_idx] = line
    
    with open(path, "w", encoding="utf-8") as f:
        f.writelines(lines)

print("done")
