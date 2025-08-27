#!/usr/bin/env python3
"""
Lu Minous Website Test GUI
Een handige interface om je website te testen voordat je pusht naar GitHub
"""

import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import subprocess
import threading
import webbrowser
import os
import sys
from datetime import datetime

class WebsiteTestGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Lu Minous Website Tester")
        self.root.geometry("800x600")
        self.root.configure(bg='#f8fafc')
        
        # Styling
        style = ttk.Style()
        style.theme_use('clam')
        
        self.setup_ui()
        self.is_dev_server_running = False
        self.dev_process = None
        
    def setup_ui(self):
        # Header
        header_frame = tk.Frame(self.root, bg='#d946ef', height=60)
        header_frame.pack(fill='x', padx=10, pady=10)
        header_frame.pack_propagate(False)
        
        title_label = tk.Label(
            header_frame, 
            text="🌐 Lu Minous Website Tester", 
            font=('Arial', 16, 'bold'), 
            fg='white', 
            bg='#d946ef'
        )
        title_label.pack(pady=15)
        
        # Main content
        main_frame = tk.Frame(self.root, bg='#f8fafc')
        main_frame.pack(fill='both', expand=True, padx=20, pady=10)
        
        # Test buttons frame
        buttons_frame = tk.Frame(main_frame, bg='#f8fafc')
        buttons_frame.pack(fill='x', pady=(0, 20))
        
        # Row 1: Development server
        dev_frame = tk.Frame(buttons_frame, bg='#f8fafc')
        dev_frame.pack(fill='x', pady=5)
        
        self.dev_button = tk.Button(
            dev_frame,
            text="🚀 Start Development Server",
            command=self.toggle_dev_server,
            bg='#10b981',
            fg='black',
            font=('Arial', 12, 'bold'),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.dev_button.pack(side='left')
        
        self.open_browser_button = tk.Button(
            dev_frame,
            text="🌐 Open in Browser",
            command=self.open_browser,
            bg='#3b82f6',
            fg='black',
            font=('Arial', 12),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2',
            state='disabled'
        )
        self.open_browser_button.pack(side='left', padx=(10, 0))
        
        # Row 2: Code quality checks
        checks_frame = tk.Frame(buttons_frame, bg='#f8fafc')
        checks_frame.pack(fill='x', pady=5)
        
        self.type_check_button = tk.Button(
            checks_frame,
            text="🔍 Type Check (tsc)",
            command=self.run_type_check,
            bg='#f59e0b',
            fg='black',
            font=('Arial', 12),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.type_check_button.pack(side='left')
        
        self.lint_button = tk.Button(
            checks_frame,
            text="✨ Lint Code",
            command=self.run_lint,
            bg='#8b5cf6',
            fg='black',
            font=('Arial', 12),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.lint_button.pack(side='left', padx=(10, 0))
        
        self.build_button = tk.Button(
            checks_frame,
            text="🏗️ Build Test",
            command=self.run_build,
            bg='#ef4444',
            fg='black',
            font=('Arial', 12),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.build_button.pack(side='left', padx=(10, 0))
        
        # Row 3: Git operations
        git_frame = tk.Frame(buttons_frame, bg='#f8fafc')
        git_frame.pack(fill='x', pady=5)
        
        self.git_status_button = tk.Button(
            git_frame,
            text="📊 Git Status",
            command=self.show_git_status,
            bg='#6b7280',
            fg='black',
            font=('Arial', 12),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.git_status_button.pack(side='left')
        
        self.push_button = tk.Button(
            git_frame,
            text="🚀 Push to GitHub",
            command=self.push_to_github,
            bg='#059669',
            fg='black',
            font=('Arial', 12, 'bold'),
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.push_button.pack(side='left', padx=(10, 0))
        
        # Output area
        output_frame = tk.Frame(main_frame, bg='#f8fafc')
        output_frame.pack(fill='both', expand=True)
        
        output_label = tk.Label(
            output_frame, 
            text="📋 Test Output:", 
            font=('Arial', 12, 'bold'), 
            bg='#f8fafc',
            fg='black'
        )
        output_label.pack(anchor='w', pady=(0, 5))
        
        self.output_text = scrolledtext.ScrolledText(
            output_frame,
            height=15,
            font=('Consolas', 10),
            bg='#1f2937',
            fg='#f9fafb',
            insertbackground='white'
        )
        self.output_text.pack(fill='both', expand=True)
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("✅ Ready to test your website!")
        
        status_bar = tk.Label(
            self.root,
            textvariable=self.status_var,
            relief='sunken',
            anchor='w',
            bg='#e5e7eb',
            font=('Arial', 10),
            fg='black'
        )
        status_bar.pack(side='bottom', fill='x')
        
    def log(self, message, level="INFO"):
        timestamp = datetime.now().strftime("%H:%M:%S")
        color = {
            "INFO": "#10b981",
            "ERROR": "#ef4444",
            "WARNING": "#f59e0b",
            "SUCCESS": "#059669"
        }.get(level, "#6b7280")
        
        self.output_text.insert('end', f"[{timestamp}] {message}\n")
        self.output_text.see('end')
        
        # Update status
        self.status_var.set(f"📝 {message}")
        
    def toggle_dev_server(self):
        if not self.is_dev_server_running:
            self.start_dev_server()
        else:
            self.stop_dev_server()
    
    def start_dev_server(self):
        def run_server():
            try:
                self.log("🚀 Starting development server...")
                
                # Zorg dat we in de juiste directory zijn
                script_dir = os.path.dirname(os.path.abspath(__file__))
                os.chdir(script_dir)
                self.log(f"📁 Working directory: {script_dir}")
                
                # Controleer of package.json bestaat
                if not os.path.exists('package.json'):
                    self.log("❌ package.json niet gevonden! Zorg dat je in de juiste directory bent.", "ERROR")
                    return
                
                self.dev_process = subprocess.Popen(
                    ['npm', 'run', 'dev'],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    cwd=script_dir  # Expliciet de directory instellen
                )
                self.is_dev_server_running = True
                self.root.after(0, self.update_dev_button)
                self.root.after(0, lambda: self.log("✅ Development server started! Open http://localhost:3000", "SUCCESS"))
                self.root.after(0, lambda: self.open_browser_button.config(state='normal'))
                
                # Wait for server to be ready
                import time
                time.sleep(3)
                
            except Exception as e:
                self.root.after(0, lambda: self.log(f"❌ Error starting server: {e}", "ERROR"))
        
        thread = threading.Thread(target=run_server, daemon=True)
        thread.start()
    
    def stop_dev_server(self):
        if self.dev_process:
            self.dev_process.terminate()
            self.dev_process = None
        self.is_dev_server_running = False
        self.update_dev_button()
        self.open_browser_button.config(state='disabled')
        self.log("🛑 Development server stopped")
    
    def update_dev_button(self):
        if self.is_dev_server_running:
            self.dev_button.config(text="🛑 Stop Development Server", bg='#ef4444')
        else:
            self.dev_button.config(text="🚀 Start Development Server", bg='#10b981')
    
    def open_browser(self):
        try:
            webbrowser.open('http://localhost:3000')
            self.log("🌐 Opened website in browser")
        except Exception as e:
            self.log(f"❌ Error opening browser: {e}", "ERROR")
    
    def run_type_check(self):
        def run_check():
            try:
                self.log("🔍 Running TypeScript type check...")
                
                # Zorg dat we in de juiste directory zijn
                script_dir = os.path.dirname(os.path.abspath(__file__))
                
                # Gebruik npx tsc voor type checking (Next.js heeft geen type-check script)
                result = subprocess.run(
                    ['npx', 'tsc', '--noEmit'],
                    capture_output=True,
                    text=True,
                    timeout=30,
                    cwd=script_dir
                )
                
                if result.returncode == 0:
                    self.root.after(0, lambda: self.log("✅ TypeScript type check passed!", "SUCCESS"))
                else:
                    self.root.after(0, lambda: self.log(f"❌ TypeScript errors found:\n{result.stderr}", "ERROR"))
                    
            except subprocess.TimeoutExpired:
                self.root.after(0, lambda: self.log("⏰ Type check timed out", "WARNING"))
            except Exception as e:
                self.root.after(0, lambda: self.log(f"❌ Error running type check: {e}", "ERROR"))
        
        thread = threading.Thread(target=run_check, daemon=True)
        thread.start()
    
    def run_lint(self):
        def run_check():
            try:
                self.log("✨ Running ESLint...")
                
                # Zorg dat we in de juiste directory zijn
                script_dir = os.path.dirname(os.path.abspath(__file__))
                
                result = subprocess.run(
                    ['npm', 'run', 'lint'],
                    capture_output=True,
                    text=True,
                    timeout=30,
                    cwd=script_dir
                )
                
                if result.returncode == 0:
                    self.root.after(0, lambda: self.log("✅ ESLint passed! No code quality issues found.", "SUCCESS"))
                else:
                    self.root.after(0, lambda: self.log(f"⚠️ ESLint warnings/errors:\n{result.stdout}", "WARNING"))
                    
            except subprocess.TimeoutExpired:
                self.root.after(0, lambda: self.log("⏰ Lint check timed out", "WARNING"))
            except Exception as e:
                self.root.after(0, lambda: self.log(f"❌ Error running lint: {e}", "ERROR"))
        
        thread = threading.Thread(target=run_check, daemon=True)
        thread.start()
    
    def run_build(self):
        def run_check():
            try:
                self.log("🏗️ Running build test...")
                
                # Zorg dat we in de juiste directory zijn
                script_dir = os.path.dirname(os.path.abspath(__file__))
                
                result = subprocess.run(
                    ['npm', 'run', 'build'],
                    capture_output=True,
                    text=True,
                    timeout=60,
                    cwd=script_dir
                )
                
                if result.returncode == 0:
                    self.root.after(0, lambda: self.log("✅ Build successful! Website is ready to deploy.", "SUCCESS"))
                else:
                    self.root.after(0, lambda: self.log(f"❌ Build failed:\n{result.stderr}", "ERROR"))
                    
            except subprocess.TimeoutExpired:
                self.root.after(0, lambda: self.log("⏰ Build timed out", "WARNING"))
            except Exception as e:
                self.root.after(0, lambda: self.log(f"❌ Error running build: {e}", "ERROR"))
        
        thread = threading.Thread(target=run_check, daemon=True)
        thread.start()
    
    def show_git_status(self):
        def run_check():
            try:
                self.log("📊 Checking Git status...")
                
                # Zorg dat we in de juiste directory zijn
                script_dir = os.path.dirname(os.path.abspath(__file__))
                
                result = subprocess.run(
                    ['git', 'status'],
                    capture_output=True,
                    text=True,
                    timeout=10,
                    cwd=script_dir
                )
                
                if result.returncode == 0:
                    self.root.after(0, lambda: self.log(f"📊 Git Status:\n{result.stdout}", "INFO"))
                else:
                    self.root.after(0, lambda: self.log(f"❌ Git error: {result.stderr}", "ERROR"))
                    
            except Exception as e:
                self.root.after(0, lambda: self.log(f"❌ Error checking Git status: {e}", "ERROR"))
        
        thread = threading.Thread(target=run_check, daemon=True)
        thread.start()
    
    def push_to_github(self):
        def run_push():
            try:
                self.log("🚀 Pushing to GitHub...")
                
                # Zorg dat we in de juiste directory zijn
                script_dir = os.path.dirname(os.path.abspath(__file__))
                
                # Add all files
                add_result = subprocess.run(['git', 'add', '.'], capture_output=True, text=True, cwd=script_dir)
                if add_result.returncode != 0:
                    self.root.after(0, lambda: self.log(f"❌ Git add failed: {add_result.stderr}", "ERROR"))
                    return
                
                # Commit
                commit_result = subprocess.run(
                    ['git', 'commit', '-m', f'Update website - {datetime.now().strftime("%Y-%m-%d %H:%M")}'],
                    capture_output=True,
                    text=True,
                    cwd=script_dir
                )
                if commit_result.returncode != 0:
                    self.root.after(0, lambda: self.log(f"❌ Git commit failed: {commit_result.stderr}", "ERROR"))
                    return
                
                # Push
                push_result = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True, cwd=script_dir)
                if push_result.returncode == 0:
                    self.root.after(0, lambda: self.log("✅ Successfully pushed to GitHub! Vercel will auto-deploy.", "SUCCESS"))
                else:
                    self.root.after(0, lambda: self.log(f"❌ Git push failed: {push_result.stderr}", "ERROR"))
                    
            except Exception as e:
                self.root.after(0, lambda: self.log(f"❌ Error during push: {e}", "ERROR"))
        
        thread = threading.Thread(target=run_push, daemon=True)
        thread.start()

def main():
    root = tk.Tk()
    app = WebsiteTestGUI(root)
    
    # Center window
    root.update_idletasks()
    x = (root.winfo_screenwidth() // 2) - (root.winfo_width() // 2)
    y = (root.winfo_screenheight() // 2) - (root.winfo_height() // 2)
    root.geometry(f"+{x}+{y}")
    
    root.mainloop()

if __name__ == "__main__":
    main()
